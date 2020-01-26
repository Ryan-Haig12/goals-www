import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withFormik, Form } from 'formik'
import { useLazyQuery } from '@apollo/react-hooks'
import { Redirect } from 'react-router-dom'
import * as Yup from 'yup'

import { LOGIN_USER } from '../../graphql/tags/user'
import { loginUserAction } from '../../redux/actions'
import { StyledForm, StyledInputBar, StyledButton, StyledErrorMessage } from '../syledComponents/auth'

const createInputBar = ({ type, placeholder, handleChange, values }) => {
    return (
        <StyledInputBar 
            type={ type.toString() }
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
        email: { type: 'email', placeholder: 'Email' },
        password: { type: 'password', placeholder: 'Password' },
    }
    let inputBars = []
    Object.keys(inputTypes).forEach(key => {
        inputBars.push( createInputBar({ type: inputTypes[key].type, placeholder: inputTypes[key].placeholder, handleChange, values }) )
    })
    return inputBars
}

const renderErrors = ( errors ) => {
    return errors.map(err => {
        return (
            <StyledErrorMessage>{ err }</StyledErrorMessage>
        )
    })
}

const Login = ({ values, errors, touched, loginUserAction, isSubmitting, handleChange }) => {
    const [ loginUser, { data }] = useLazyQuery(LOGIN_USER)
    const [ graphQLErrors, setGraphQLErrors ] = useState([])
    const [ queryCanFire, setQueryCanFire ] = useState(true)

    // If the graphQL query has run, and there are no errors
    // load the user into redux and nav back to the homepage
    // if errors, show errors
    if(data !== undefined) {
        if(data.loginUser.errors !== undefined && queryCanFire) {
            setGraphQLErrors(data.loginUser.errors)
            setQueryCanFire(false)
        }

        if(data.loginUser.errors === null) {
            loginUserAction(data.loginUser)
            return <Redirect to="/" />
        }
    }

    return (
        <Form
            onSubmit={ async e => {
                e.preventDefault()
                setGraphQLErrors([])
                setQueryCanFire(true)

                const { email, password } = values
                await loginUser({ variables: { email, password }})
            }}
        >
            <StyledForm>

                <h1>Login</h1>
                { renderInputBars(handleChange, values) }
                { touched.email && errors.email && <p>{ errors.email }</p> }
                { touched.password && errors.password && <p>{ errors.password }</p> }
                { graphQLErrors && renderErrors(graphQLErrors) }
                <StyledButton disabled={ isSubmitting } type="submit" >Submit</StyledButton>
            </StyledForm>   
        </Form>
    )
}

const FormkEnhancer = withFormik({
    mapPropsToValues: (props) => {
        return {
            email: '',
            password: '',
        }
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().email('Email is not valid').required('Email is required'),
        password: Yup.string().required('Password is required'),
    })
})(Login)

export default connect(null, { loginUserAction })(FormkEnhancer)