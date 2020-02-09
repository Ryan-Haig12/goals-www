import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    LOGOUT_ERROR,
    CREATE_NEW_GROUP,
    ERROR_CREATING_GROUP,
    GET_DEFAULT_GOALS,
    GET_ALL_USERS_GROUPS,
    GET_CUSTOM_GOAL,
    GET_CUSTOM_GOALS_BY_GROUPID_ARRAY
} from '../actions/types' 

// Register a user
export const createUserAction = ( createdUserData, error ) => async dispatch => {
    if(error) {
        console.log(error)
    }

    localStorage.setItem('userJWT', createdUserData.jwt)

    try {
        dispatch({ type: REGISTER_SUCCESS, payload: createdUserData })
    } catch(err) {
        console.log(err)
        dispatch({ type: REGISTER_FAIL, payload: err })
    }
}

// Login a user
export const loginUserAction = ( loggedInUserData, error ) => async dispatch => {
    if(error) {
        console.log(error)
    }

    localStorage.setItem('userJWT', loggedInUserData.jwt)

    try {
        dispatch({ type: LOGIN_SUCCESS, payload: loggedInUserData })
    } catch(err) {
        console.log(err)
        dispatch({ type: LOGIN_FAIL, payload: err })
    }
}

// Logout a user
export const logoutUserAction = () => async dispatch => {
    try {
        dispatch({ type: LOGOUT })
    } catch(err) {
        console.log(err)
        dispatch({ type: LOGOUT_ERROR, payload: err })
    }
}

// Create a Group
export const createGroupAction = ( newGroup ) => async dispatch => {
    try {
        dispatch({ type: CREATE_NEW_GROUP, payload: newGroup.id })
    } catch(err) {
        console.log(err)
        dispatch({ type: ERROR_CREATING_GROUP, payload: err })
    }
}

// Get all groups user is a part of
// also determines which groups the user is an admin of
export const getAllUserGroupsAction = ( userId, allUserGroups ) => async dispatch => {
    const groupsMember = allUserGroups.map(group => group.id)
    const groupsAdmin = allUserGroups.filter(group => group.groupCreator === userId).map(group => group.id)

    try {
        dispatch({ type: GET_ALL_USERS_GROUPS, payload: { groupsMember, groupsAdmin }})
    } catch(err) {
        console.log(err)
    }
}

// grab all of the default goals from mongo
export const getDefaultGoalsAction = ( defaultGoals ) => async dispatch => {
    try {
        dispatch({ type: GET_DEFAULT_GOALS, payload: defaultGoals })
    } catch(err) {
        console.log(err)
    }
}

// grab all of the custom goals from mongo
export const getCustomGoalsAction = ( customGoals ) => async dispatch => {
    try {
        dispatch({ type: GET_CUSTOM_GOAL, payload: customGoals })
    } catch(err) {
        console.log(err)
    }
}

// grab all custom goals from mongo by groupid
export const getCustomGoalsByGroupIdArrayAction = ( allCustomGoals ) => async dispatch => {
    try {
        dispatch({ type: GET_CUSTOM_GOALS_BY_GROUPID_ARRAY, payload: allCustomGoals })
    } catch(err) {
        console.log(err)
    }
}
//GET_CUSTOM_GOALS_BY_GROUPID_ARRAY