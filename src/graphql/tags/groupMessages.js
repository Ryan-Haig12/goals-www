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