import React from 'react'
import { connect } from 'react-redux'
import { withFormik, Form, Field } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import * as Yup from 'yup'

import { CREATE_USER } from '../../graphql/tags/user'

import { createUserAction } from '../../redux/actions'

const StyledForm = styled.div`
    position: relative;
    margin: 5% auto;
    width: 600px;
    height: 75%;
    background-image: linear-gradient(
        to top, 
        #a3b591, #e4ffc9
    );
    border-radius: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    color: #111;
    text-align: center;
`

const StyledInputBar = styled.input`
    display: block;
    box-sizing: border-box;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    padding: 4px;
    width: 220px;
    height: 32px;
    border: none;
    border-bottom: 1px solid #AAA;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 15px;
    transition: 0.2s ease;
    color: #444;
    font-size: 1.5em;
    outline: none; 
    box-shadow: none; 
    -webkit-appearance: none; 
    border-radius: 0;
    border-top: none;
    border-bottom: solid 1px;
    border-color: #bbb;
    background: transparent;
    display: flex;
    height: 2em;
    width: 12em;
    margin-bottom: 5%;
    padding: 0 3%;
    z-index: 0;
    -webkit-transition: border .25s;
    -moz-transition: border .25s;
    -o-transition: border .25s;
    transition: border .25s;
`

const StyledButton = styled.button`
    outline: none;
    -webkit-appearance: none;
    border: none;
    background: transparent;
    color: #000000;
    font-size: 2.05em;
    cursor: pointer;
    bottom: 0%;
`

const createInputBar = ({ type, placeholder, handleChange, values }) => {
    return (
        <StyledInputBar 
            type={ type.toString() }
            name={ type.toString() }
            placeholder={ placeholder.toString() }
            value={ values[type.toString()] }
            onChange={ handleChange }
            required=""
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
        console.log('sdsda', key)
        inputBars.push( createInputBar({ type: inputTypes[key].type, placeholder: inputTypes[key].placeholder, handleChange, values }) )
    })
    return inputBars
}

const Register = ({ values, errors, touched, isSubmitting, createUserAction, handleChange }) => {
    
    const [ createUser, { data, loading, error }] = useMutation(CREATE_USER)
    const history = useHistory()

    return (
        <Form
            onSubmit={ async e => {
                e.preventDefault()

                const { name, email, password, password2 } = values
                const createdUserData = await createUser({ variables: { newUserData: { name, email, password, password2 } } })

                if(!loading) {
                    createUserAction(createdUserData.data.createUser)               
                    history.push('/')
                }
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