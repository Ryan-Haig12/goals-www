import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    LOGOUT_ERROR
} from '../actions/types' 

const INITIAL_STATE = {
    userData: undefined,
    authError: undefined,
    isAuthenticated: false
}

const AuthReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS: 
            return { userData: action.payload, isAuthenticated: true }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT_ERROR:
            return { authError: action.payload }
        case LOGOUT: 
            return INITIAL_STATE
        default:
            return state
    }
}

export default AuthReducer