import React, { useState, useEffect } from 'react'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import Modal from 'react-bootstrap/Modal'

import { GET_ALL_GROUP_MESSAGE, GROUP_MESSAGE_SENT } from '../../../graphql/tags/groupMessages'
import { getAllGroupMessages } from '../../../redux/actions/index'
import { yellow, purple, darkBlue, turquoise } from '../../syledComponents/Theme'

const mapGroupMessagesv2 = ( allMessages, allMembers ) => {
    if(!allMessages || !allMessages.length) {
        return (
            <Modal.Body style={{ width: '98%', border: '1px solid black', borderRadius: '5px', margin: '1%', background: turquoise, color: yellow }} >No Messages Found</Modal.Body>
        )
    }

    if(allMessages.length > 10) {
        allMessages = allMessages.splice(0, 1)
    }

    let slots = []
    allMessages.map(message => {
        const user = allMembers.filter(mem => mem.id === message.authorId)[0]
        slots.push((
            <Modal.Body style={{ width: '98%', border: '1px solid black', borderRadius: '5px', margin: '1%', background: turquoise, color: yellow }}>
                {user?.name} ({moment(message.timeWritten / 1000).format('h:mm:ss')}): {message.message}
            </Modal.Body>
        ))
        return 0    // removes warning from console
    })

    return slots.reverse()
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
        <Modal.Dialog style={{ width: '95%', background: purple }}>
            <div style={{ background: darkBlue }} >{ mapGroupMessagesv2(messagesToRender, allMembers) }</div>
        </Modal.Dialog>
    )
}

GroupMessageBoard.propTypes = {
    groupData: PropTypes.object
}

export default connect(null, { getAllGroupMessages })(GroupMessageBoard)