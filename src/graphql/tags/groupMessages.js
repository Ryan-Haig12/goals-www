import gql from 'graphql-tag'

export const GET_ALL_GROUP_MESSAGE = gql`
    query GetGroupMessages($groupId: ID!) {
        getGroupMessages(groupId: $groupId) {
            id
            groupId
            authorId
            groupId
            message
            timeWritten
            expirationTime
        }
    }
`

export const CREATE_NEW_GROUP_MESSAGE = gql`
    mutation AddGroupMessage($newGroupMessageData: AddGroupMessageInput) {
        addGroupMessage(data: $newGroupMessageData) {
            id
            groupId
            authorId
            message
            timeWritten
            expirationTime
        }
    }
`

export const GROUP_MESSAGE_SENT = gql`
    subscription GroupMessageSent($groupId: ID!) {
        groupMessageSent(groupId: $groupId) {
            id
            groupId
            authorId
            message
            timeWritten
            expirationTime
        }
    }
`