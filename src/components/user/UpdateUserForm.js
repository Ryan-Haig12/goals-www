import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withFormik, Form } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import styled from 'styled-components'

import { UPDATE_USER } from '../../graphql/tags/user'
import { updateUserDataAction } from '../../redux/actions/index'
//import UserLandingPage from './UserLandingPage'
import { StyledInputBar } from '../syledComponents/auth'
import Button from 'react-bootstrap/Button'
import * as Theme from '../syledComponents/Theme'

const StyledForm = styled.div`
    margin: 5% auto;
    width: 80%;
    height: 75%;

    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    line-height: 1.6;
    background-color: ${ Theme.darkBlue };
    color: ${ Theme.yellow };
    text-align: center;

    @media(max-width: 650px) {
        width: 100%;
    }
`

const UpdateUserForm = ({ isSubmitting, values, handleChange, userId, userData, updateUserDataAction }) => {
    const [ updateUserQuery, { error } ] = useMutation(UPDATE_USER)
    const [ successMessage, setSuccessMessage ] = useState()

    return ( 
        <Form 
            onSubmit={ async e => {
                e.preventDefault()

                if(!(!values.name.length && !values.email.length) && !error) {
                    try {
                        const updatedUser = await updateUserQuery({ variables: { UpdateUserInput: {
                            userId,
                            email: values.email,
                            name: values.name
                        }}})

                        updateUserDataAction({ email: values.email, name: values.name }, userData)
    
                        if(updatedUser) setSuccessMessage(`User Updated Successfully!`)
                        await setTimeout(() => {
                            setSuccessMessage(null)
                        }, 3000)
                    } catch(err) {
                        console.log(err)
                    }
                }
            }}
        >
            <StyledForm>
                <h3>Update Username and/or Email</h3>
                <StyledInputBar 
                    type={ 'name' }
                    name={ 'name' }
                    placeholder={ 'UserName' }
                    value={ values.name }
                    onChange={ handleChange }
                    key={ 'name' }
                />
                <StyledInputBar
                    type={ 'email' }
                    name={ 'email' }
                    placeholder={ 'Email' }
                    value={ values.email }
                    onChange={ handleChange }
                    key={ 'email' }
                />
                <Button 
                    id="updateUserForm"
                    style={{ marginBottom: '20px' }}
                    variant="warning"
                    size="lg"
                    disabled={ isSubmitting }
                    type="submit"
                >Submit</Button>
                { successMessage && <p>{ successMessage }</p> }
            </StyledForm>
        </Form>
    )
}

const FormikEnhancer = withFormik({
    mapPropsToValues: (props) => {
        return {
            name: '',
            email: ''
        }
    }
})(UpdateUserForm)

const mapPropsToState = ( state ) => {
    return {
        userData: state.User.userData
    }
}
 
export default connect(mapPropsToState, { updateUserDataAction })(FormikEnhancer)