import { CREATE_NEW_GROUP_MESSAGE, GET_ALL_GROUP_MESSAGE } from '../actions/types'

const INITIAL_STATE = {
    groupMessages: [],
}

const GroupMessagesReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case GET_ALL_GROUP_MESSAGE:
            return {
                ...state,
                groupMessages: action.payload
            }
        default:
            return state
    }
}

export default GroupMessagesReducer