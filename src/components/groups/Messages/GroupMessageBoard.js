import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { GET_ALL_GROUP_MESSAGE, GROUP_MESSAGE_SENT } from '../../../graphql/tags/groupMessages'
import { getAllGroupMessages } from '../../../redux/actions/index'

const mapGroupMessages = ( allMessages ) => {
    if(!allMessages) {
        return (
            <tr>
                <td>No Messages Found</td>
            </tr>
        )
    }
    return allMessages.map(message => {
        return (
            <tr key={ message.id } >
                <td>{message.message}</td>
                <td>{message.authorId}</td>
                <td>{message.timeWritten}</td>
            </tr>
        )
    })
}

const GroupMessageBoard = ({ groupData, getAllGroupMessages }) => {
    const { userId, groupId } = groupData
    const [ messagesToRender, setMessagesToRender ] = useState(null)
    const [ update, setUpdate ] = useState(false)
    const { data: allGroupMessageData, loading, error } = useQuery(GET_ALL_GROUP_MESSAGE, {
        variables: { groupId }
    })
    const { data, error: subError } = useSubscription(
        GROUP_MESSAGE_SENT,
        { variables: { groupId } },
    )

    if(error) console.log(error)
    if(subError) console.log(subError)

    useEffect(() => {
        if(allGroupMessageData !== undefined && allGroupMessageData !== null) {
            getAllGroupMessages(allGroupMessageData.getGroupMessages)
            setMessagesToRender(allGroupMessageData.getGroupMessages)
        }
    }, [ allGroupMessageData, getAllGroupMessages ])

    useEffect(() => {
        if(data !== undefined && data !== null) {
            let d = messagesToRender
            d.push(data.groupMessageSent)
            setMessagesToRender(d)
            setUpdate(true)
        }
    }, [ data, setMessagesToRender ])

    useEffect(() => {
        setUpdate(false)
    }, [update])

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Message</th>
                        <th>Author</th>
                        <th>Time Written</th>
                    </tr>
                </thead>
                <tbody>
                    { mapGroupMessages(messagesToRender) }
                </tbody>
            </table>
        </div>
    )
}

GroupMessageBoard.propTypes = {
    groupData: PropTypes.object
}

export default connect(null, { getAllGroupMessages })(GroupMessageBoard)