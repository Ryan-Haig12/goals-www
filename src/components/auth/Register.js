import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withFormik, Form } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import { Redirect } from 'react-router-dom'
import * as Yup from 'yup'

import { CREATE_USER } from '../../graphql/tags/user'
import { createUserAction } from '../../redux/actions'
import { StyledForm, StyledInputBar, StyledButton, StyledErrorMessage } from '../syledComponents/auth'

const createInputBar = ({ type, placeholder, handleChange, values, pass }) => {
    return (
        <StyledInputBar 
            type={ pass ? 'password' : type.toString() }
            name={ type.toString() }
            placeholder={ placeholder.toString() }
            value={ values[type.toString()] }
            onChange={ handleChange }
            required=""
            key={ type.toString() }
        />
    )
}

const renderInputBars = ( handleChange, values ) => {
    const inputTypes = {
        name: { type: 'name', placeholder: 'Name' },
        email: { type: 'email', placeholder: 'Email' },
        password: { type: 'password', placeholder: 'Password' },
        password2: { type: 'password2', placeholder: 'Confirm Password', pass: true },
    }
    let inputBars = []
    Object.keys(inputTypes).forEach(key => {
        let pass = inputTypes[key].pass ? inputTypes[key].pass : false
        inputBars.push( createInputBar({ type: inputTypes[key].type, placeholder: inputTypes[key].placeholder, handleChange, values, pass }) )
    })
    return inputBars
}

const renderErrors = ( errors ) => {
    return errors.map(err => {
        return (
            <StyledErrorMessage key={ err } >{ err }</StyledErrorMessage>
        )
    })
}

const Register = ({ values, errors, touched, isSubmitting, createUserAction, handleChange }) => {
    
    const [ createUser, { data, error }] = useMutation(CREATE_USER)
    const [ graphQLErrors, setGraphQLErrors ] = useState([])
    const [ queryCanFire, setQueryCanFire ] = useState(true)

    if(error) {
        console.log(error)
    }

    // If the graphQL query has run, and there are no errors
    // load the user into redux and nav back to the homepage
    // if errors, show errors
    if(data !== undefined) {
        if(data.createUser.errors !== undefined && queryCanFire) {
            setGraphQLErrors(data.createUser.errors)
            setQueryCanFire(false)
        }

        if(data.createUser.errors === null) {
            createUserAction(data.createUser)
            return <Redirect to="/" />
        }
    }

    return (
        <Form
            onSubmit={ async e => {
                e.preventDefault()
                setGraphQLErrors([])
                setQueryCanFire(true)

                const { name, email, password, password2 } = values
                await createUser({ variables: { newUserData: { name, email, password, password2 } } })
            }}
        >
            <StyledForm>

                <h1>Register</h1>
                { renderInputBars(handleChange, values) }
                { touched.name && errors.name && <p>{ errors.name }</p> }
                { touched.email && errors.email && <p>{ errors.email }</p> }
                { touched.password && errors.password && <p>{ errors.password }</p> }
                { touched.password2 && errors.password2 && <p>{ errors.password2 }</p> }
                { graphQLErrors && renderErrors(graphQLErrors) }
                <StyledButton disabled={ isSubmitting } type="submit" >Submit</StyledButton>
            </StyledForm>   
        </Form>
    )
}

const FormkEnhancer = withFormik({
    mapPropsToValues: (props) => {
        return {
            name: '',
            email: '',
            password: '',
            password2: ''
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is Required'),
        email: Yup.string().email('Email is not valid').required('Email is required'),
        password: Yup.string().min(6, 'Password must be 6 characters or longer').required('Password is required')
    })
})(Register)

export default connect(null, { createUserAction })(FormkEnhancer)