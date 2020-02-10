import _ from 'lodash'
import { CREATE_NEW_GROUP, ERROR_CREATING_GROUP, GET_ALL_USERS_GROUPS, GET_ALL_GROUPS_FULL_DATA } from '../actions/types'

const INITIAL_STATE = {
    groupsMember: [],   // all groups the user is a member of by id
    groupsAdmin: [],     // all groups the user is an admin of by id
    // currently I am using groupsMember in a fair deal of logic elsewhere in the app
    // rather than replace the groupMember ID array with all of the groups data and change a few spots in the app
    // I'm going to create and use groupsFullData for the full data of every group from groupsMember
    groupsFullData: [],
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
        case GET_ALL_GROUPS_FULL_DATA:
            return {
                ...state,
                groupsFullData: action.payload
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