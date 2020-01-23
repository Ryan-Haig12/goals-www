import axios from 'axios'
import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT,
} from '../actions/types' 

// Register a user
export const createUserAction = ( createdUserData, error ) => async dispatch => {
    try {
        console.log(createdUserData, error)
        dispatch({ type: REGISTER_SUCCESS, payload: createdUserData })
    } catch(err) {
        console.log(err)
        dispatch({ type: REGISTER_FAIL })
    }
}