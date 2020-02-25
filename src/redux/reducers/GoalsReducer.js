import { CREATE_NEW_GOAL, ERROR_CREATING_GOAL, GET_DEFAULT_GOALS, GET_CUSTOM_GOAL, GET_CUSTOM_GOALS_BY_GROUPID_ARRAY } from '../actions/types'

const INITIAL_STATE = {
    defaultGoals: [],
    customGoals: [],
    errors: null
}

const AuthReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case CREATE_NEW_GOAL:
            return {
                defaultGoals: [ ...action.payload ]
            }
        case GET_DEFAULT_GOALS:
            return {
                ...state,
                defaultGoals: [ ...action.payload ]
            }
        case GET_CUSTOM_GOAL:
            return {
                ...state,
                customGoals: action.payload
            }
        case GET_CUSTOM_GOALS_BY_GROUPID_ARRAY:
            return {
                ...state,
                customGoals: action.payload
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