import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withFormik, Form } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import { Redirect } from 'react-router-dom'
import * as Yup from 'yup'

import { CREATE_GROUP } from '../../graphql/tags/groups'
import { createGroupAction } from '../../redux/actions/index'

import PageHeaderSpan from '../header/PageHeaderSpan'
import UnAuthedNavHome from '../auth/UnAuthedNavHome'
import { StyledForm, StyledInputBar, StyledErrorMessage } from '../syledComponents/auth'
import Button from 'react-bootstrap/Button'

const renderErrors = ( errors ) => {
    return errors.map(err => {
        return (
            <StyledErrorMessage>{ err }</StyledErrorMessage>
        )
    })
}

const CreateGroup = ({ isSubmitting, isAuthenticated, values, handleChange, createGroupAction }) => {
    const [ createGroup, { data, error }] = useMutation(CREATE_GROUP)
    const [ graphQLErrors, setGraphQLErrors ] = useState([])
    const [ queryCanFire, setQueryCanFire ] = useState(true)

    if(!isAuthenticated) return <UnAuthedNavHome />
    if(error) console.log(error)
    
    if(data !== undefined) {
        if(data.createGroup.errors !== undefined && queryCanFire) {
            setGraphQLErrors(data.createGroup.errors)
            setQueryCanFire(false)
        }

        if(data.createGroup.errors === null) {
            createGroupAction(data.createGroup) // create group action/reducer etc
            const route = `/group/${ data.createGroup.id }`
            window.location.reload()
            return <Redirect to={ route } />
        }
    }

    return (
        <>
            <PageHeaderSpan text='Create New Group' />
            <Form 
                onSubmit={ async e => {
                    e.preventDefault()
                    setGraphQLErrors([])
                    setQueryCanFire(true)

                    const { groupName } = values
                    await createGroup({ variables: { newGroupData: { groupName } } })
                }}
            >
                <StyledForm>
                    <p>Create a new Group to push you and your friends to be better!</p>
                    <StyledInputBar 
                        type={ 'groupName' }
                        name={ 'groupName' }
                        placeholder={ 'Group Name' }
                        value={ values.groupName }
                        onChange={ handleChange }
                        key={ 'groupName' }
                    />
                    { graphQLErrors && renderErrors(graphQLErrors) }
                    <Button style={{ marginBottom: '20px' }} variant="warning" size="lg" disabled={ isSubmitting } type="submit" >Submit</Button>
                </StyledForm>
            </Form>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.User.isAuthenticated
    }
}

const FormkEnhancer = withFormik({
    mapPropsToValues: (props) => {
        return {
            groupName: ''
        }
    },
    validationSchema: Yup.object().shape({
        groupName: Yup.string().required('Group Name is Required')
    })
})(CreateGroup)

export default connect(mapStateToProps, { createGroupAction })(FormkEnhancer)
