import gql from 'graphql-tag'

export const ADD_FINISHED_GOAL = gql`
    mutation AddFinishedGoal($finishedGoalData: AddFinishedGoalInput!) {
        addFinishedGoal(data: $finishedGoalData) {
            id
            goalId
            userId
            groupId
            timeCompleted
            errors
        }
    }
`

