import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withFormik, Form } from 'formik'
import { useMutation } from '@apollo/react-hooks'

import { UPDATE_USER } from '../../graphql/tags/user'
import { StyledUpdateUserForm } from '../syledComponents/User'

const UpdateUserForm = ({ isSubmitting, values, handleChange, userId }) => {
    const [ updateUserQuery, { error } ] = useMutation(UPDATE_USER)
    const [ successMessage, setSuccessMessage ] = useState()

    return ( 
        <Form 
            onSubmit={ async e => {
                e.preventDefault()

                if(!(!values.name.length && !values.email.length) && !error) {
                    const updatedUser = await updateUserQuery({ variables: { UpdateUserInput: {
                        userId,
                        email: values.email,
                        name: values.name
                    }}})

                    if(updatedUser) setSuccessMessage(`User Updated Successfully!`)
                    await setTimeout(() => {
                        setSuccessMessage(null)
                    }, 3000)
                }
            }}
        >
            <StyledUpdateUserForm>
                Form
                <input 
                    type={ 'name' }
                    name={ 'name' }
                    placeholder={ 'Name' }
                    value={ values.name }
                    onChange={ handleChange }
                    key={ 'name' }
                />
                <input
                    type={ 'email' }
                    name={ 'email' }
                    placeholder={ 'Email' }
                    value={ values.email }
                    onChange={ handleChange }
                    key={ 'email' }
                />
                <button disabled={ isSubmitting } type="submit" >Submit</button>
                { successMessage && <p>{ successMessage }</p> }
            </StyledUpdateUserForm>
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
 
export default connect()(FormikEnhancer)