import { combineReducers } from 'redux'

import GoalsReducer from './GoalsReducer'
import GroupReducer from './GroupReducer'
import UserReducer from './UserReducer'

export default combineReducers({
    Goals: GoalsReducer,
    Group: GroupReducer,
    User: UserReducer
})