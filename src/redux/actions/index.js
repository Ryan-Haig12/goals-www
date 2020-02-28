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
    GET_CUSTOM_GOALS_BY_GROUPID_ARRAY,
    GET_ALL_GROUPS_FULL_DATA,
    ADD_USER_TO_GROUP,
    FINISHED_GOAL_SELECTED,
    CREATE_NEW_GROUP_MESSAGE,
    GET_ALL_GROUP_MESSAGE
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
        dispatch({ type: GET_ALL_GROUPS_FULL_DATA, payload: allUserGroups })
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
// saves to Group reducer
export const getCustomGoalsAction = ( customGoals ) => async dispatch => {
    try {
        dispatch({ type: GET_CUSTOM_GOAL, payload: customGoals })
    } catch(err) {
        console.log(err)
    }
}

// grab all custom goals from mongo by groupid array
// saves to Goals reducer
export const getCustomGoalsByGroupIdArrayAction = ( allCustomGoals ) => async dispatch => {
    //console.log('action', allCustomGoals)
    try {
        dispatch({ type: GET_CUSTOM_GOALS_BY_GROUPID_ARRAY, payload: allCustomGoals })
    } catch(err) {
        console.log(err)
    }
}

// Add a brand new user to the list of users belonging to a group
export const addUserToGroupAction = ( groupData ) => async dispatch => {
    try {
        dispatch({ type: ADD_USER_TO_GROUP, payload: groupData })
    } catch(err) {
        console.log(err)
    }
}

// store currently selected finished goal to redux
// solution to having the FinishedGoalForm and GroupGoalsTable
export const onGoalSelectedHandlerAction = ( goalData ) => async dispatch => {
    try {
        dispatch({ type: FINISHED_GOAL_SELECTED, payload: goalData })
    } catch(err) {
        console.log(err)
    }
}

// grab every groupMessage currently existing for the given groupId
export const getAllGroupMessages = ( allMessages ) => async dispatch => {
    try {
        dispatch({ type: GET_ALL_GROUP_MESSAGE, payload: allMessages })
    } catch(err) {
        console.log(err)
    }
}