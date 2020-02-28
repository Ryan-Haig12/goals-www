import { combineReducers } from 'redux'

import FinishedGoalsReducer from './FinishedGoalsReducer'
import GoalsReducer from './GoalsReducer'
import GroupMessagesReducer from './GroupMessagesReducer'
import GroupReducer from './GroupReducer'
import UserReducer from './UserReducer'

export default combineReducers({
    Goals: GoalsReducer,
    FinishedGoals: FinishedGoalsReducer,
    Group: GroupReducer,
    GroupMessages: GroupMessagesReducer,
    User: UserReducer
})