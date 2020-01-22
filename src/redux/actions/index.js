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
export const createUserAction = ( data, error ) => async dispatch => {
    try {
        console.log(data, error)
        dispatch({ type: REGISTER_SUCCESS, payload: data })
    } catch(err) {
        const errors = err.response.data.errors
        if(errors){
            console.log( errors.forEach(error => error.msg) )
        }
        dispatch({ type: REGISTER_FAIL })
    }
}