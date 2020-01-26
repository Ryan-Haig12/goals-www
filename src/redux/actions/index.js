import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    LOGOUT_ERROR
} from '../actions/types' 

// Register a user
export const createUserAction = ( createdUserData, error ) => async dispatch => {
    if(error) {
        console.log(error)
    }

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