import React, { useState, useEffect } from 'react'
import { withFormik, Form } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'

import { StyledForm, StyledInputBar, StyledErrorMessage } from '../../syledComponents/auth'
import { UPDATE_GROUP } from '../../../graphql/tags/groups'

const renderErrors = ( errors ) => {
    return errors.map(err => {
        return (
            <StyledErrorMessage key={ err } >{ err }</StyledErrorMessage>
        )
    })
}

const UpdateGroupForm = ({ match, isSubmitting, values, handleChange, groupId }) => {
    const [ UpdateUserQuery, { data }] = useMutation(UPDATE_GROUP)
    const [ graphQLErrors, setGraphQLErrors ] = useState([])
    const [ successUpdatingGroup, setSuccessUpdatingGroup ] = useState(false)

    // I can't explain why, but Redux is updated just fine when this query is fired...
    // no redux action required
    // I really don't understand why... ok I guess...
    // this hook only exists as foundation in case I need to connect to redux here again
    useEffect(() => {
        if(data !== undefined && data !== null) {
            //console.log(data)
        }
    }, [ data ])

    return (
        <Form 
            onSubmit={ async e => {
                e.preventDefault()
                setGraphQLErrors([])

                const { groupName } = values
                await UpdateUserQuery({ variables: {
                    updateGroupData: {
                        groupId,
                        groupName
                    }
                }})
                setSuccessUpdatingGroup(true)

                await setTimeout(() => {
                    setSuccessUpdatingGroup(false)
                }, 3000)
            }}
        >
            <StyledForm>
                <h3 style={{ margin: '5%' }} >Update Group Name</h3>
                <StyledInputBar 
                    type={ 'groupName' }
                    name={ 'groupName' }
                    placeholder={ 'Group Name' }
                    value={ values.groupName }
                    onChange={ handleChange }
                    key={ 'groupName' }
                />
                { graphQLErrors && renderErrors(graphQLErrors) }
                { successUpdatingGroup && <p>Group Updated Successfully!</p> }
                <Button 
                    id="updatGroup"
                    style={{ marginBottom: '20px' }} variant="warning" size="lg" disabled={ isSubmitting } type="submit"
                >Submit</Button>
            </StyledForm>
        </Form>
    )
}

const FormikEnhancer = withFormik({
    mapPropsToValues: (props) => {
        return {
            groupName: ''
        }
    }
})(UpdateGroupForm)

export default connect()(FormikEnhancer)
