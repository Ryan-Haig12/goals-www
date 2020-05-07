import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withFormik, Form } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import * as Yup from 'yup'

import { StyledGroupChatInputBar } from '../../syledComponents/Group'
import { CREATE_NEW_GROUP_MESSAGE } from '../../../graphql/tags/groupMessages'

const InputBar = ({ values, handleChange, groupData }) => {
    const { userId, groupId } = groupData
    const [ createNewGroupMessage, { error }] = useMutation(CREATE_NEW_GROUP_MESSAGE, { variables: {
        newGroupMessageData: {
            message: values.messageText.substr(0, 75),
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
            <StyledGroupChatInputBar
                type={ 'messageText' }
                name={ 'messageText' }
                placeholder={ 'Message' }
                value={ values.messageText }
                onChange={ handleChange }
                key={ 'messageText' }
            />
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