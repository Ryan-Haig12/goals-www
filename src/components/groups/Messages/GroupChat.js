import React from 'react'

import GroupMessageBoard from './GroupMessageBoard'
import InputBar from './InputBar'
import Modal from 'react-bootstrap/Modal'

import { darkBlue, yellow } from '../../syledComponents/Theme'

const GroupChat = ({ userId, groupId, allMembers }) => {
    return (
        <Modal.Dialog style={{ display: 'box', borderRadius: '5px', padding: '0px auto', margin: '0px auto', paddingTop: '50px', display: 'block' }}>
            <Modal.Header style={{ background: darkBlue }} >
                <Modal.Title style={{ color: yellow }} >Group Chat</Modal.Title>
            </Modal.Header>

            <div style={{ background: darkBlue, margin: '0px', padding: '0px', display: 'block' }} >
                <InputBar groupData={{ userId, groupId }} />
                <GroupMessageBoard groupData={{ userId, groupId, allMembers }} />
            </div>
        </Modal.Dialog>
    )
}

export default GroupChat
