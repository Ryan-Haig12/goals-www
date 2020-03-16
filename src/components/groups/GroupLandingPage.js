import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useLazyQuery } from '@apollo/react-hooks'

import { GET_USERS_BY_ID } from '../../graphql/tags/user'
import { StyledGroupMembersDiv, StyledMainGroupDiv, GoToAdminButton } from '../syledComponents/Group'
import PageHeaderSpan from '../header/PageHeaderSpan'

//import AdminOptions from './Admin/AdminOptions'
import FinishedGoalForm from './FinishedGoalForm'
//import GroupGoalsTable from './GroupGoalsTable'
import GroupMembers from './GroupMembers'
import GroupMessageBoard from './Messages/GroupMessageBoard'
import InputBar from './Messages/InputBar'
import UnAuthedNavHome from '../auth/UnAuthedNavHome'

const GroupLandingPage = ({ match, usersGroups, isAuthenticated, groupsAdmin, userId, defaultGoals, customGoalsAllGroups }) => {
    const [ currentGroup, setCurrentGroup ] = useState(null)
    const [ isAdmin, setIsAdmin ] = useState(false)
    const [ redirectToAdmin, setRedirectToAdmin ] = useState(false)
    const [ getAllUsers, { data, loading, error } ] = useLazyQuery(GET_USERS_BY_ID, { variables: { userIds: currentGroup ? currentGroup.groupMembers : [] } })

    useEffect(() => {
        usersGroups.map(group => {
            if(group.id === match.params.groupId) {
                setCurrentGroup(group)
            }
            return 0
        })
    }, [ usersGroups, match.params.groupId ])

    useEffect(() => {
        if(currentGroup !== null && currentGroup !== undefined) {
            getAllUsers()
        }
    }, [ currentGroup, getAllUsers ])
    if(error) console.log(error)

    useEffect(() => {
        if(!loading && data && currentGroup !== null & currentGroup !== undefined) {
            if(groupsAdmin.includes(currentGroup.id.toString())) setIsAdmin(true)
        }
    }, [ loading, data, currentGroup, setIsAdmin, groupsAdmin ])

    if(!isAuthenticated) return <UnAuthedNavHome />
    if(!currentGroup) return <p>Loading...</p>

    if(!loading && data && currentGroup !== null & currentGroup !== undefined) {
        const adminLink = match.url + '/adminOptions'
        return (
            <div>
                <PageHeaderSpan text={ 'Welcome to ' + currentGroup.groupName } />

                { isAdmin ? <GoToAdminButton onClick={ () => {setRedirectToAdmin(true)} }>Go To Admin Options</GoToAdminButton> : null}
                { isAdmin && redirectToAdmin && <Redirect to={ adminLink } /> }

                <StyledMainGroupDiv>
                    <StyledGroupMembersDiv>
                        <h3>Monthly Power Rankings</h3>
                        <GroupMembers groupId={currentGroup.id} allMembers={data.getMultipleUsersById} />
                    </StyledGroupMembersDiv>

                    <FinishedGoalForm allGoals={{ defaultGoals, customGoalsAllGroups }} allMembers={data.getMultipleUsersById} groupData={{ userId, groupId: currentGroup.id }} />
                </StyledMainGroupDiv>

                { /* <GroupGoalsTable groupData={{ userId, groupId: currentGroup.id }} /> */ }
                <GroupMessageBoard groupData={{ userId, groupId: currentGroup.id }} />
                <InputBar groupData={{ userId, groupId: currentGroup.id }} />
            </div>
        )
    }
    return <p>Loading...</p>
}

const mapStateToProps = (state) => {
    const userId = state.User.userData ? state.User.userData.id : ''
    const usersGroups = state.Group.groupsFullData ? state.Group.groupsFullData : []
    const groupsAdmin = state.Group.groupsAdmin ? state.Group.groupsAdmin : []
    return {
        isAuthenticated: state.User.isAuthenticated,
        goalIsSelected: state.FinishedGoals.goalIsSelected,
        userId,
        usersGroups,
        groupsAdmin,
        defaultGoals: state.Goals.defaultGoals,
        customGoalsAllGroups: state.Goals.customGoals,
    }
}

export default connect(mapStateToProps)(GroupLandingPage)
