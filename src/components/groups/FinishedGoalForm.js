import React, { useState } from 'react'
import { withFormik, Form } from 'formik'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import * as Yup from 'yup'

import { ADD_FINISHED_GOAL } from '../../graphql/tags/finishedGoal'
import { clearGoalSelectedHandlerAction } from '../../redux/actions/index'

import { StyledButton } from '../syledComponents/auth'
import { StyledFinishedGoalForm } from '../syledComponents/Group'

const mapDefaulyGoalList = ( allGoals ) => {
    return allGoals.defaultGoals.map(category => {
        return category.goals.map(goal => {
            const lab = `${ category.category }: ${ goal.title }`
            return (
                <option key={ goal.id } value={ goal.id } label={ lab } />
            )
        })
    })
}

const mapCustomGoalList = ( allGoals, groupId ) => {
    const group = allGoals.customGoalsAllGroups.filter(group => group.groupId === groupId)[0]
    const customGoals = group.customGoals
    
    if(!customGoals.length) return
    
    return customGoals.map(goal => {
        const lab = `${ goal.category }: ${ goal.title }`
        return (
            <option key={ goal.id } value={ goal.id } label={ lab } />
        )
    })
}

const FinishedGoalForm = ({ groupData, isSubmitting, values, handleChange, handleBlur, allGoals }) => {
    const { userId, groupId } = groupData
    const [ CreateFinishedGoal, { error } ] = useMutation(ADD_FINISHED_GOAL)
    const [ successMessage, setSuccessMessage ] = useState()

    if(error) console.log(error)

    return (
        <Form 
            onSubmit={ async e => {
                e.preventDefault()
                console.log(values)

                // prevents sending graphql a null value for minutesLogged
                if(!values.minutesLogged) return

                let points = 0
                allGoals.defaultGoals.map(category => {
                    category.goals.map(goal => {
                        if(goal.id === values.goalSelect) points = goal.points
                    })
                })

                if(!points) {
                    const groupId = groupData.groupId
                    const group = allGoals.customGoalsAllGroups.filter(group => group.groupId === groupId)[0]
                    const customGoals = group.customGoals
                    customGoals.map(goal => {
                        if(goal.id === values.goalSelect) points = goal.points
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

                if(newFinishedGoal) setSuccessMessage(`Goal Logged Successfully!`)
                await setTimeout(() => {
                    setSuccessMessage(null)
                }, 3000)
            }}
        >
            <StyledFinishedGoalForm>
                Log Your Completed Goal!
                <div>
                    <select
                        name="goalSelect"
                        value={ values.goalSelect }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                    >
                        <option disabled value="" label="Select Goal here" />
                        { mapDefaulyGoalList(allGoals) }
                        { mapCustomGoalList(allGoals, groupData.groupId) }
                    </select>

                    <select
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
                    </select>
                </div>
                { successMessage && <p>{ successMessage }</p> }
                <StyledButton disabled={ isSubmitting } type="submit" >Submit</StyledButton>
            </StyledFinishedGoalForm>
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
