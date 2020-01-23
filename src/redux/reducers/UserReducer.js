import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from '../actions/types' 

const INITIAL_STATE = {
    userData: undefined
}

const AuthReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case REGISTER_SUCCESS: 
            return { userData: action.payload }
        default:
            return state
    }
}

export default AuthReducer