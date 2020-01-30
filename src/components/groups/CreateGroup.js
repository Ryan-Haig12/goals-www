import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withFormik, Form } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import { Redirect } from 'react-router-dom'
import * as Yup from 'yup'

import { CREATE_GROUP } from '../../graphql/tags/groups'
import { createGroupAction } from '../../redux/actions/index'

import UnAuthedNavHome from '../auth/UnAuthedNavHome'
import { StyledForm, StyledInputBar, StyledButton, StyledErrorMessage } from '../syledComponents/auth'

const renderErrors = ( errors ) => {
    return errors.map(err => {
        return (
            <StyledErrorMessage>{ err }</StyledErrorMessage>
        )
    })
}

const CreateGroup = ({ isSubmitting, isAuthenticated, values, handleChange, createGroupAction }) => {
    const [ createGroup, { data, loading, error }] = useMutation(CREATE_GROUP)
    const [ graphQLErrors, setGraphQLErrors ] = useState([])
    const [ queryCanFire, setQueryCanFire ] = useState(true)

    if(!isAuthenticated) return <UnAuthedNavHome />

    if(error) {
        console.log(error)
    }

    console.log('dfsadfs', data)

    if(data !== undefined) {
        if(data.createGroup.errors !== undefined && queryCanFire) {
            setGraphQLErrors(data.createGroup.errors)
            setQueryCanFire(false)
        }

        if(data.createGroup.errors === null) {
            createGroupAction(data.createGroup) // create group action/reducer etc
            const route = `/group/${ data.createGroup.id }`
            return <Redirect to={ route } />
        }
    }

    return (
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
                Create New Group
                <p>Create a new Group to push you and your friends to be better!</p>
                <p>(I don't have friends either, you can totally play alone)</p>
                <StyledInputBar 
                    type={ 'groupName' }
                    name={ 'groupName' }
                    placeholder={ 'Group Name' }
                    value={ values.groupName }
                    onChange={ handleChange }
                    key={ 'groupName' }
                />
                { graphQLErrors && renderErrors(graphQLErrors) }
                <StyledButton disabled={ isSubmitting } type="submit" >Submit</StyledButton>
            </StyledForm>
        </Form>
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
