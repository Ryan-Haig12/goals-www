import React, { useState } from 'react'
import { withFormik, Form } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import { connect } from 'react-redux'
import * as Yup from 'yup'

import { ADD_USER_TO_GROUP_BY_EMAIL } from '../../../graphql/tags/groups'
import { addUserToGroupAction } from '../../../redux/actions/index'

import { StyledForm, StyledInputBar, StyledButton, StyledErrorMessage } from '../../syledComponents/auth'

const renderErrors = ( errors ) => {
    return errors.map(err => {
        return (
            <StyledErrorMessage key={ err } >{ err }</StyledErrorMessage>
        )
    })
}

const AddUserToGroup = ({ match, isSubmitting, values, handleChange, addUserToGroupAction }) => {
    const [ AddUserToGroup, { data, error }] = useMutation(ADD_USER_TO_GROUP_BY_EMAIL)
    const [ graphQLErrors, setGraphQLErrors ] = useState([])
    const [ successAddingUser, setsuccessAddingUser ] = useState(false)
    const [ queryCanFire, setQueryCanFire ] = useState(true)

    if(error) console.log(error)
    
    if(data !== undefined) {
        if(data.addUserToGroupByEmail.errors !== undefined && queryCanFire) {
            setGraphQLErrors(data.addUserToGroupByEmail.errors)
            setQueryCanFire(false)
        }

        if(data.addUserToGroupByEmail.errors === null && queryCanFire) {
            addUserToGroupAction(data.addUserToGroupByEmail)
            setsuccessAddingUser(true)
            setQueryCanFire(false)
        }
    }

    return (
        <Form 
            onSubmit={ async e => {
                e.preventDefault()
                setGraphQLErrors([])
                setQueryCanFire(true)
                setsuccessAddingUser(false)

                const { newUserEmail } = values
                await AddUserToGroup({variables:{addUserData:{ newUserEmail: newUserEmail, groupId: match.params.groupId }}})
            }}
        >
            <StyledForm>
                Add New User via Email
                <StyledInputBar 
                    type={ 'newUserEmail' }
                    name={ 'newUserEmail' }
                    placeholder={ 'Email' }
                    value={ values.newUserEmail }
                    onChange={ handleChange }
                    key={ 'newUserEmail' }
                />
                { graphQLErrors && renderErrors(graphQLErrors) }
                { successAddingUser && <p>User Added to group!</p> }
                <StyledButton disabled={ isSubmitting } type="submit" >Submit</StyledButton>
            </StyledForm>
        </Form>
    )
}

const FormikEnhancer = withFormik({
    mapPropsToValues: (props) => {
        return {
            newUserEmail: ''
        }
    },
    validationSchema: Yup.object().shape({
        newUserEmail: Yup.string().required('newUserEmail is Required')
    })
})(AddUserToGroup)

export default connect(null, { addUserToGroupAction })(FormikEnhancer)
