import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    LOGOUT_ERROR,
    CREATE_NEW_GROUP,
    ERROR_CREATING_GROUP
} from '../actions/types' 

// Register a user
export const createUserAction = ( createdUserData, error ) => async dispatch => {
    if(error) {
        console.log(error)
    }

    localStorage.setItem('userJWT', createdUserData.jwt)

    try {
        dispatch({ type: REGISTER_SUCCESS, payload: createdUserData })
    } catch(err) {
        console.log(err)
        dispatch({ type: REGISTER_FAIL, payload: err })
    }
}

// Login a user
export const loginUserAction = ( loggedInUserData, error ) => async dispatch => {
    if(error) {
        console.log(error)
    }

    localStorage.setItem('userJWT', loggedInUserData.jwt)

    try {
        dispatch({ type: LOGIN_SUCCESS, payload: loggedInUserData })
    } catch(err) {
        console.log(err)
        dispatch({ type: LOGIN_FAIL, payload: err })
    }
}

// Logout a user
export const logoutUserAction = () => async dispatch => {
    try {
        dispatch({ type: LOGOUT })
    } catch(err) {
        console.log(err)
        dispatch({ type: LOGOUT_ERROR, payload: err })
    }
}

// Create a Group
export const createGroupAction = ( newGroup ) => async dispatch => {

    console.log(newGroup)

    try {
        dispatch({ type: CREATE_NEW_GROUP, payload: newGroup.id })
    } catch(err) {
        console.log(err)
        dispatch({ type: ERROR_CREATING_GROUP, payload: err })
    }
}