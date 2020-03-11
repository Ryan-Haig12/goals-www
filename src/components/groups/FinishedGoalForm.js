import React, { useState } from 'react'
import { withFormik, Form } from 'formik'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import * as Yup from 'yup'

import { ADD_FINISHED_GOAL } from '../../graphql/tags/finishedGoal'
import { clearGoalSelectedHandlerAction } from '../../redux/actions/index'

import { StyledForm, StyledButton } from '../syledComponents/auth'

const FinishedGoalForm = ({ groupData, isSubmitting, values, handleChange, selectedGoal, handleBlur, clearGoalSelectedHandlerAction }) => {
    const { userId, groupId } = groupData
    const [ CreateFinishedGoal, { error } ] = useMutation(ADD_FINISHED_GOAL)
    const [ successMessage, setSuccessMessage ] = useState()

    if(error) console.log(error)

    return (
        <Form 
            onSubmit={ async e => {
                e.preventDefault()

                // prevents sending graphql a null value for minutesLogged
                if(!values.minutesLogged) return

                const newFinishedGoal = await CreateFinishedGoal({ variables: {finishedGoalData: {
                    goalId: selectedGoal.id,
                    userId,
                    groupId,
                    timeCompleted: Date.now().toString(),
                    minutesLogged: parseInt(values.minutesLogged),
                    points: selectedGoal.points
                }}})

                if(newFinishedGoal) setSuccessMessage(`Goal Logged Successfully!`)
                await setTimeout(() => {
                    setSuccessMessage(null)
                }, 3000)
            }}
        >
            <StyledForm>
                Log Your Completed Goal!
                <p>Category: { selectedGoal.category }</p>
                <p>Title: { selectedGoal.title }</p>
                <p>Points: { selectedGoal.points }</p>
                <div>
                    <select
                        name="minutesLogged"
                        value={values.minutesLogged}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ display: 'block' }}
                    >
                        <option value="" label="Log Time Here" />
                        <option value="15" label="15 Minutes" />
                        <option value="30" label="30 Minutes" />
                        <option value="45" label="45 Minutes" />
                        <option value="60" label="60 Minutes" />
                    </select>
                </div>
                { successMessage && <p>{ successMessage }</p> }
                <StyledButton disabled={ isSubmitting } type="submit" >Submit</StyledButton>
                <br />
                <br />
                <br />
                <StyledButton onClick={ () => clearGoalSelectedHandlerAction() } type="button" >Close Form</StyledButton>
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
            minutesLogged: ''
        }
    },
    validationSchema: Yup.object().shape({
        minutesLogged: Yup.string().required('minutesLogged is Required')
    })
})(FinishedGoalForm)

export default connect(mapStateToProps, { clearGoalSelectedHandlerAction })(FormikEnhancer)
