import React from 'react'

import GroupMessageBoard from './GroupMessageBoard'
import InputBar from './InputBar'
import { StyledGroupChat } from '../../syledComponents/Group'

const GroupChat = ({ userId, groupId, allMembers }) => {
    return (
        <StyledGroupChat>
            <GroupMessageBoard groupData={{ userId, groupId, allMembers }} />
            <InputBar groupData={{ userId, groupId }} />
        </StyledGroupChat>
    )
}

export default GroupChat
