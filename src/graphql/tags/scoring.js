import gql from 'graphql-tag'

export const CALC_USER_SCORE = gql`
    query CalcUserScore($userScoreInput: CalcUserScoreInput!) {
        calcUserScore(data: $userScoreInput) {
            userId
            score
            rank
        }
    }
`
