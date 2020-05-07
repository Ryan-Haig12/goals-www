import React from 'react'

import GroupMessageBoard from './GroupMessageBoard'
import InputBar from './InputBar'
import Modal from 'react-bootstrap/Modal'

const GroupChat = ({ userId, groupId, allMembers }) => {
    return (
        <Modal.Dialog style={{ position: 'absolute', top: '25%', right: '2%', width: '33%', borderRadius: '5px', padding: 'auto', margin: 'auto' }}>
            <Modal.Header style={{ background: '#7A9D96' }} >
                <Modal.Title>Group Chat</Modal.Title>
            </Modal.Header>

            <InputBar groupData={{ userId, groupId }} />
            <GroupMessageBoard groupData={{ userId, groupId, allMembers }} />
        </Modal.Dialog>
    )
}

export default GroupChat
