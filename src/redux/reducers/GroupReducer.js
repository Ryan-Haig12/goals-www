import _ from 'lodash'
import { CREATE_NEW_GROUP, ERROR_CREATING_GROUP, GET_ALL_USERS_GROUPS } from '../actions/types'

const INITIAL_STATE = {
    groupsMember: [],   // all groups the user is a member of
    groupsAdmin: [],     // all groups the user is an admin of
    errors: null
}

const AuthReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case CREATE_NEW_GROUP:
            return {
                ...state,
                groupsMember: _.uniq([ ...state.groupsMember, action.payload]),
                groupsAdmin: _.uniq([ ...state.groupsAdmin, action.payload])
            }
        case GET_ALL_USERS_GROUPS: 
            return {
                ...state,
                groupsMember: action.payload.groupsMember,
                groupsAdmin: action.payload.groupsAdmin
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