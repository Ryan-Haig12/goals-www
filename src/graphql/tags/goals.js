import gql from 'graphql-tag'

export const GET_ALL_GOALS = gql`
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