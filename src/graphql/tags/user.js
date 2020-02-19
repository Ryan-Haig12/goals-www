import gql from 'graphql-tag'

export const LOGIN_USER = gql`
    query loginUser($email: String!, $password: String!){
        loginUser(email: $email, password: $password) {
            id
            name
            email
            password
            dateCreated
            errors
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
            jwt
        }
    }
`

// i think grabbing user data might be handy here or there
// idk felt cute, might delete later
export const GET_USER = gql`
    query GetUser($userId: ID, $userEmail: String) {
        getUser(id: $userId, email: $userEmail) {
            id
            name
            email
            password
            dateCreated
            errors
            jwt
        }
    }
    
`

// grab multiple users by userId
export const GET_USERS_BY_ID = gql`
    query GetUsersById($userIds: [ID]!) {
        getMultipleUsersById(userIds: $userIds) {
            id
            name
            email
            password
            dateCreated
            errors
            jwt   
        }
    }
`