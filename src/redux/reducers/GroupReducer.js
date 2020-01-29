import _ from 'lodash'
import { CREATE_NEW_GROUP, ERROR_CREATING_GROUP } from '../actions/types'

const INITIAL_STATE = {
    groupsMember: [],   // all groups the user is a member of
    groupsAdmin: [],     // all groups the user is an admin of
    errors: null
}

const AuthReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case CREATE_NEW_GROUP:
            return {
                groupsMember: _.uniq([ ...state.groupsMember, action.payload]),
                groupsAdmin: _.uniq([ ...state.groupsAdmin, action.payload])
            }
        case ERROR_CREATING_GROUP: 
            return {
                ...state,
                errors: action.payload
            }
        default:
            return state
    }
}

export default AuthReducer