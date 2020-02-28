import { FINISHED_GOAL_SELECTED } from '../actions/types'

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
        default:
            return state
    }
}

export default FinishedGoalsReducer