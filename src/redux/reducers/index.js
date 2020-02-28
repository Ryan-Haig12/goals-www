import { combineReducers } from 'redux'

import FinishedGoalsReducer from './FinishedGoalsReducer'
import GoalsReducer from './GoalsReducer'
import GroupReducer from './GroupReducer'
import UserReducer from './UserReducer'

export default combineReducers({
    Goals: GoalsReducer,
    FinishedGoals: FinishedGoalsReducer,
    Group: GroupReducer,
    User: UserReducer
})