import React from 'react'
import { connect } from 'react-redux'
import { withFormik, Form } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import { Redirect } from 'react-router-dom'
import * as Yup from 'yup'

import { CREATE_USER } from '../../graphql/tags/user'
import { createUserAction } from '../../redux/actions'
import { StyledForm, StyledInputBar, StyledButton } from '../syledComponents/auth'

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
        name: { type: 'name', placeholder: 'Name' },
        email: { type: 'email', placeholder: 'Email' },
        password: { type: 'password', placeholder: 'Password' },
        password2: { type: 'password2', placeholder: 'Password2' },
    }
    let inputBars = []
    Object.keys(inputTypes).forEach(key => {
        inputBars.push( createInputBar({ type: inputTypes[key].type, placeholder: inputTypes[key].placeholder, handleChange, values }) )
    })
    return inputBars
}

const Register = ({ values, errors, touched, isSubmitting, createUserAction, handleChange }) => {
    
    const [ createUser, { data, loading, error }] = useMutation(CREATE_USER)

    if(error) {
        console.log(error)
    }

    if(!loading && data) {
        console.log(data)
        createUserAction(data.createUser)
        return <Redirect to="/" />
    }

    return (
        <Form
            onSubmit={ async e => {
                e.preventDefault()

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