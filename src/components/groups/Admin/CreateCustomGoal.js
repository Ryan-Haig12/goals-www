import React, { useState } from 'react'
import { withFormik, Form } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import { connect } from 'react-redux'
import * as Yup from 'yup'

import { createCustomGoalAction } from '../../../redux/actions/index'
import { CREATE_CUSTOM_GOAL } from '../../../graphql/tags/customGoal'
import { StyledForm, StyledInputBar, StyledButton, StyledErrorMessage } from '../../syledComponents/auth'

const renderErrors = ( errors ) => {
    return errors.map(err => {
        return (
            <StyledErrorMessage key={ err } >{ err }</StyledErrorMessage>
        )
    })
}

const CreateCustomGoal = ({ match, values, isSubmitting, handleChange, userId, createCustomGoalAction }) => {
    const [ CreateCustomGoalQuery, { data, error }] = useMutation(CREATE_CUSTOM_GOAL)
    const [ graphQLErrors, setGraphQLErrors ] = useState([])
    const [ successAddingCustomGoal, setSuccessAddingCustomGoal ] = useState(false)
    const [ queryCanFire, setQueryCanFire ] = useState(true)

    if(error) console.log(error)
    
    if(data !== undefined) {
        if(data.createCustomGoal.errors !== undefined && queryCanFire) {
            setGraphQLErrors(data.createCustomGoal.errors)
            setQueryCanFire(false)
        }

        if(data.createCustomGoal.errors === null && queryCanFire) {
            createCustomGoalAction(data.createCustomGoal)
            setSuccessAddingCustomGoal(true)
            setQueryCanFire(false)
        }
    }

    return (
        <Form 
            onSubmit={ async e => {
                e.preventDefault()
                setGraphQLErrors([])
                setQueryCanFire(true)
                setSuccessAddingCustomGoal(false)

                const { title, points, category } = values

                if(!title || !points || !category) {
                    setGraphQLErrors([ 'Must include title, points, and category' ])
                    return
                }

                await CreateCustomGoalQuery({ variables: {
                    customGoalData: { 
                        title,
                        points: parseInt(points),
                        category,
                        groupId: match.params.groupId,
                        customGoalCreator: userId
                    }
                }})
            }}
        >
            <StyledForm>
                Create new custom Goal
                <StyledInputBar 
                    type={ 'title' }
                    name={ 'title' }
                    placeholder={ 'Title' }
                    value={ values.title }
                    onChange={ handleChange }
                    key={ 'title' }
                />
                <StyledInputBar 
                    type={ 'points' }
                    name={ 'points' }
                    placeholder={ 'Points' }
                    value={ values.points }
                    onChange={ handleChange }
                    key={ 'points' }
                />
                <StyledInputBar 
                    type={ 'category' }
                    name={ 'category' }
                    placeholder={ 'Category' }
                    value={ values.category }
                    onChange={ handleChange }
                    key={ 'category' }
                />
                { graphQLErrors && renderErrors(graphQLErrors) }
                { successAddingCustomGoal && <p>Custom Goal Created!</p> }
                <StyledButton disabled={ isSubmitting } type="submit" >Submit</StyledButton>
            </StyledForm>
        </Form>
    )
}

const FormikEnhancer = withFormik({
    mapPropsToValues: (props) => {
        return {
            title: '',
            points: '',
            category: ''
        }
    },
    validationSchema: Yup.object().shape({
        title: Yup.string().required('title is Required'),
        points: Yup.string().required('points is Required'),
        category: Yup.string().required('category is Required')
    })
})(CreateCustomGoal)

export default connect(null, { createCustomGoalAction })(FormikEnhancer)
