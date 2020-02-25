import gql from 'graphql-tag'

export const GET_DEFAULT_GOALS = gql`
    query {
        getAllGoals {
            id
            title
            points
            category
            errors
        }
    }
`

export const GET_CUSTOM_GOAL = gql`
    query GetCustomGoal($groupId: ID, $creatorId: ID) {
        getCustomGoal(groupId: $groupId, creatorId: $creatorId) {
            id
            groupId
            category
            title
            points
            errors
            customGoalCreator
        }
    }
`

export const GET_CUSTOM_GOALS_BY_GROUPID_ARRAY = gql`
    query GetAllCustomGoalsByGroupArray($groupIds: [ID]) {
        getAllCustomGoalsByGroupArray(groupIds: $groupIds) {
            groupId
            customGoals {
                id
                groupId
                category
                customGoalCreator
                errors
                points
                title
            }
        }
    }
`   