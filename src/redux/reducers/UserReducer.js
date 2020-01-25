import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../actions/types' 

const INITIAL_STATE = {
    userData: undefined,
    authError: undefined,
}

const AuthReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS: 
            return { userData: action.payload }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            return { authError: action.payload }
        default:
            return state
    }
}

export default AuthReducer