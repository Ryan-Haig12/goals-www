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
