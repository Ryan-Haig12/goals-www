import React, { useState, useEffect } from 'react'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'

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

const mapGroupMessagesv2 = ( allMessages, allMembers ) => {
    //console.log(allMessages, allMembers)

    if(!allMessages) {
        return (
            <tr>
                <td>No Messages Found</td>
            </tr>
        )
    }

    let slots = []

    let k = 0
    slots = Array( 10 - allMessages.length ).fill((
        <tr key={ k++ } >
            <td></td>
        </tr>
    ))

    allMessages.map(message => {
        const user = allMembers.filter(mem => mem.id === message.authorId)[0]
        slots.push((
            <tr key={ message.id } >
                <td>{user.name} ({moment(message.timeWritten / 1000).format('h:mm:ss')}): {message.message}</td>
            </tr>
        ))
    })

    return slots
}

const GroupMessageBoard = ({ groupData, getAllGroupMessages }) => {
    const { groupId, allMembers } = groupData
    const [ messagesToRender, setMessagesToRender ] = useState(null)
    const [ update, setUpdate ] = useState(false)
    const { data: allGroupMessageData, error } = useQuery(GET_ALL_GROUP_MESSAGE, {
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
    }, [ data, setMessagesToRender, messagesToRender ])

    useEffect(() => {
        setUpdate(false)
    }, [update])

    return (
        <div>
            <table>
                <tbody>
                    { mapGroupMessagesv2(messagesToRender, allMembers) }
                </tbody>
            </table>
        </div>
    )
}

GroupMessageBoard.propTypes = {
    groupData: PropTypes.object
}

export default connect(null, { getAllGroupMessages })(GroupMessageBoard)