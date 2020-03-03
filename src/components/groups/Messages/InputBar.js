import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withFormik, Form } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import * as Yup from 'yup'

import { StyledForm, StyledInputBar, StyledButton } from '../../syledComponents/auth'
import { CREATE_NEW_GROUP_MESSAGE } from '../../../graphql/tags/groupMessages'

const InputBar = ({ isSubmitting, values, handleChange, groupData }) => {
    const { userId, groupId } = groupData
    const [ createNewGroupMessage, { error }] = useMutation(CREATE_NEW_GROUP_MESSAGE, { variables: {
        newGroupMessageData: {
            message: values.messageText,
            authorId: userId,
            groupId: groupId,
            timeWritten: Date.now().toString()
        }
    }})
    if(error) console.log(error)
    
    return (
        <Form 
            onSubmit={ async e => {
                e.preventDefault()
                if(values.messageText) {
                    createNewGroupMessage()
                }
                values.messageText = ''
            }}
        >
            <StyledForm>
                Send A New Message!
                <div>
                    <StyledInputBar
                        type={ 'messageText' }
                        name={ 'messageText' }
                        placeholder={ 'Message' }
                        value={ values.messageText }
                        onChange={ handleChange }
                        key={ 'messageText' }
                    />
                </div>
                <StyledButton disabled={ isSubmitting } type="submit" >Submit</StyledButton>
            </StyledForm>
        </Form>
    )
}

InputBar.propTypes = {
    groupData: PropTypes.object
}

const FormikEnhancer = withFormik({
    mapPropsToValues: (props) => {
        return {
            messageText: ''
        }
    },
    validationSchema: Yup.object().shape({
        messageText: Yup.string().required('messageText is Required')
    })
})(InputBar)

export default connect()(FormikEnhancer)