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

export const GET_FINISHED_GOALS = gql`
    query GetFinishedGoals($GetFinishedGoalsData: GetFinishedGoalsInput!) {
        getFinishedGoals(data: $GetFinishedGoalsData) {
            id
            goalId
            userId
            groupId
            timeCompleted
            errors
        }
    }
`