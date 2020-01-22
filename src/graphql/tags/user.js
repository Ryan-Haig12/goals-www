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

// dunno why I didn't name this registerUser, but that's
// the waaaaay the news goes
export const CREATE_USER = gql`
    mutation CreateUser($newUserData: CreateUserInput!) {
        createUser(data: $newUserData) {
            id
            name
            email
            errors
            dateCreated
            totalScoreDay
            totalScoreWeek
            totalScoreMonth
            totalScoreAllTime
            jwt
        }
    }
`