import gql from 'graphql-tag'

export const LOGIN_USER = gql`
  {
    loginUser(
        email: "testhaig1@haig.com",
        password: "password"
    )
    {
        id
        name
        email
        password
        dateCreated
        errors
        totalScoreAllTime
        totalScoreDay
        totalScoreWeek
        totalScoreMonth
        totalScoreGroup {
            groupId
            score
        }
        groups
        completedGoals
        jwt
    } 
  }
`