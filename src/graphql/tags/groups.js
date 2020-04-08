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

export const GET_GROUP = gql`
    query GetGroup($groupId: ID!) {
        getGroup(groupId: $groupId) {
            id
            groupCreator
            groupName
            groupMembers
            errors
        }
        
    }
`

export const GET_ALL_USERS_GROUPS = gql`
    query GetAllUsersGroups($userId: ID!) {
        getAllUsersGroups(userId: $userId) {
            id
            errors
            groupName
            groupCreator
            groupMembers
        } 
    }
`

export const ADD_USER_TO_GROUP = gql`
    mutation AddUserToGroup($addUserData: AddUserToGroupInput!){
        addUserToGroup(data: $addUserData) {
            id
            groupCreator
            groupName
            groupMembers
            errors
        }
    }
`

export const UPDATE_GROUP = gql`
    mutation UpdateGroup($updateGroupData: UpdateGroupInput!){
        updateGroup(data: $updateGroupData) {
            id
            groupCreator
            groupName
            groupMembers
            errors
        }
    }
`

export const ADD_USER_TO_GROUP_BY_EMAIL = gql`
    mutation AddUserToGroupByEmail($addUserData: AddUserToGroupInput!){
        addUserToGroupByEmail(data: $addUserData) {
            id
            groupCreator
            groupName
            groupMembers
            errors
        }
    }
`

export const GET_GROUP_POWER_RANKINGS = gql`
    query CalcGroupPowerRanking($groupId: ID!){
        calcGroupPowerRanking(groupId: $groupId) {
            allTimeRankingsWeeks {
                userId
                recordsWon
            }
            allTimeRankingsMonths {
                userId
                recordsWon
            }
            errors
        }   
    }
`