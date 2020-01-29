import gql from 'graphql-tag'

export const CREATE_GROUP = gql`
    mutation CreateGroup($newGroupData: CreateGroupInput!) {
        createGroup(data: $newGroupData) {
            id
            groupCreator
            groupName
            groupMembers
            errors
        }
    }
`