import { CREATE_NEW_GOAL, ERROR_CREATING_GOAL } from '../actions/types'

const INITIAL_STATE = {
    defaultGoals: [],
    errors: null
}

const AuthReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case CREATE_NEW_GOAL:
            return {
                defaultGoals: [ ...action.payload ]
            }
        case ERROR_CREATING_GOAL:
            return {
                ...state,
                errors: action.payload
            }
        default:
            return state
    }
}

export default AuthReducer