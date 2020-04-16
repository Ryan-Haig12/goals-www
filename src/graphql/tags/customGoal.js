import gql from 'graphql-tag'

export const CREATE_CUSTOM_GOAL = gql`
    mutation CreateCustomGoal($customGoalData: CreateCustomGoalInput) {
        createCustomGoal(data: $customGoalData) {
            id
            title
            points
            category
            groupId
            customGoalCreator
            errors
        }
    }
`

export const UPDATE_CUSTOM_GOAL = gql`
    mutation UpdateCustomGoal($customGoalData: UpdateCustomGoalInput) {
        updateCustomGoal(data: $customGoalData) {
            id
            title
            points
            enabled
            category
            errors
            groupId
            customGoalCreator
        }
    }
`