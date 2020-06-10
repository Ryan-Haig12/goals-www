import React, { useState } from 'react'
import { withFormik, Form } from 'formik'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import * as Yup from 'yup'

import { ADD_FINISHED_GOAL } from '../../graphql/tags/finishedGoal'
import { clearGoalSelectedHandlerAction } from '../../redux/actions/index'

import { StyledForm, StyledSelectBar } from '../syledComponents/auth'
import Button from 'react-bootstrap/Button'

const FinishedGoalForm = ({ groupData, isSubmitting, values, handleChange, handleBlur, allGoals, setPlayerScoresShouldBeFetched }) => {
    const { userId, groupId } = groupData
    const [ CreateFinishedGoal, { error } ] = useMutation(ADD_FINISHED_GOAL)
    const [ successMessage, setSuccessMessage ] = useState()

    if(error) console.log(error)

    // merge custom goals and default goals together
    const mapGoals = () => {

        // strip all enabled customGoals
        const group = allGoals.customGoalsAllGroups.filter(group => group.groupId === groupId)[0]
        const customGoals = group.customGoals.filter(f => f.enabled)

        // merge custom goals and default goals
        let mergedGoals = allGoals.defaultGoals
        customGoals.map(c => {
            mergedGoals.map(mg => {
                if(c.category === mg.category && !mg.goals.includes(c)) mg.goals.push(c)
                return 0
            })
            return 0
        })

        const data = mergedGoals.map(category => {
            return category.goals.map(goal => {
                const lab = `${ category.category }: ${ goal.title }`
                return (
                    <option key={ goal.id } value={ goal.id } label={ lab } />
                )
            })
        })

        // default value
        data.unshift(<option key={'default'} disabled value="default" label="Select Goal here" />)
        return data
    }

    return (
        <Form 
            onSubmit={ async e => {
                e.preventDefault()

                // prevents sending graphql a null value for minutesLogged
                if(!values.minutesLogged) return

                let points = 0
                allGoals.defaultGoals.map(category => {
                    category.goals.map(goal => {
                        if(goal.id === values.goalSelect) points = goal.points
                        return 0 // remove warning from console
                    })
                    return 0 // remove warning from console
                })

                if(!points) {
                    const groupId = groupData.groupId
                    const group = allGoals.customGoalsAllGroups.filter(group => group.groupId === groupId)[0]
                    const customGoals = group.customGoals
                    customGoals.map(goal => {
                        if(goal.id === values.goalSelect) points = goal.points
                        return 0 // remove warning from console
                    })
                }

                const newFinishedGoal = await CreateFinishedGoal({ variables: { finishedGoalData: {
                    goalId: values.goalSelect,
                    userId,
                    groupId,
                    timeCompleted: Date.now().toString(),
                    minutesLogged: parseInt(values.minutesLogged),
                    points
                }}})

                // updated to trigger GroupMembers to update the player scores
                if(newFinishedGoal) {
                    setSuccessMessage(`Goal Logged Successfully!`)
                    setPlayerScoresShouldBeFetched(true)
                }
                await setTimeout(() => {
                    setSuccessMessage(null)
                    setPlayerScoresShouldBeFetched(false)
                }, 3000)
            }}
        >
            <StyledForm>
                <h2>Log Your Completed Goal!</h2>
                <div style={{ display: 'block' }} >
                    <StyledSelectBar
                        name="goalSelect"
                        value={ values.goalSelect }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        defaultValue={ 'default' }
                    >
                        { mapGoals() }
                    </StyledSelectBar>

                    <StyledSelectBar
                        name="minutesLogged"
                        value={values.minutesLogged}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        <option disabled value="" label="Log Time Here" />
                        <option value="15" label="15 Minutes" />
                        <option value="30" label="30 Minutes" />
                        <option value="45" label="45 Minutes" />
                        <option value="60" label="60 Minutes" />
                    </StyledSelectBar>
                </div>
                { successMessage && <p>{ successMessage }</p> }
                <Button 
                    id="finishGoal"
                    size="lg"
                    style={{ margin: '10px' }}
                    variant="warning"
                    disabled={ isSubmitting }
                    type="submit"
                >Submit</Button>
            </StyledForm>
        </Form>
    )
}

FinishedGoalForm.propTypes = {
    goalData: PropTypes.object
}

const mapStateToProps = state => {
    return {
        selectedGoal: state.FinishedGoals.currentGoalData
    }
}

const FormikEnhancer = withFormik({
    mapPropsToValues: (props) => {
        return {
            minutesLogged: '',
            goalId: ''
        }
    },
    validationSchema: Yup.object().shape({
        minutesLogged: Yup.string().required('minutesLogged is Required')
    })
})(FinishedGoalForm)

export default connect(mapStateToProps, { clearGoalSelectedHandlerAction })(FormikEnhancer)