import { FINISHED_GOAL_SELECTED, FINSIHED_GOAL_FORM_CLOSED } from '../actions/types'

const INITIAL_STATE = {
    goalIsSelected: false,
    currentGoalData: null
}

const FinishedGoalsReducer = ( state = INITIAL_STATE, action ) => {
    switch(action.type){
        case FINISHED_GOAL_SELECTED:
            return {
                goalIsSelected: true,
                currentGoalData: action.payload
            }
        case FINSIHED_GOAL_FORM_CLOSED:
            return {
                goalIsSelected: false,
                currentGoalData: null
            }
        default:
            return state
    }
}

export default FinishedGoalsReducer