import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useLazyQuery } from '@apollo/react-hooks'

import { GET_USERS_BY_ID } from '../../graphql/tags/user'

import AdminOptions from './Admin/AdminOptions'
import FinishedGoalForm from './FinishedGoalForm'
import GroupGoalsTable from './GroupGoalsTable'
import GroupMessageBoard from './GroupMessageBoard'
import UnAuthedNavHome from '../auth/UnAuthedNavHome'

const mapMembers = (allMembers) => {
    return allMembers.map(member => {
        return <li key={member} >{ member }</li>
    })
}

const GroupLandingPage = ({ match, usersGroups, isAuthenticated, groupsAdmin, userId }) => {
    const [ currentGroup, setCurrentGroup ] = useState(null)
    const [ isAdmin, setIsAdmin ] = useState(false)
    const [ getAllUsers, { data, loading, error } ] = useLazyQuery(GET_USERS_BY_ID, { variables: { userIds: currentGroup ? currentGroup.groupMembers : [] } })

    useEffect(() => {
        usersGroups.map(group => {
            if(group.id === match.params.groupId) setCurrentGroup(group)
        })
    }, [ usersGroups, match.params.groupId ])

    useEffect(() => {
        if(currentGroup !== null && currentGroup !== undefined) {
            getAllUsers()
        }
    }, [ currentGroup ])
    if(error) console.log(error)

    useEffect(() => {
        if(!loading && data && currentGroup !== null & currentGroup !== undefined) {
            if(groupsAdmin.includes(currentGroup.id.toString())) setIsAdmin(true)
        }
    }, [ loading, data, currentGroup, setIsAdmin ])

    if(!isAuthenticated) return <UnAuthedNavHome />
    if(!currentGroup) return <p>Loading...</p>

    if(!loading && data && currentGroup !== null & currentGroup !== undefined) {
        return (
            <div>
                <h1>Welcome to { currentGroup.groupName }</h1>
                { <h3>Members</h3> }
                <ol>{ mapMembers(currentGroup.groupMembers) }</ol>
                { isAdmin ? <AdminOptions group={ currentGroup } /> : '' }
                <FinishedGoalForm groupData={{ userId, groupId: currentGroup.id }} />
                <GroupGoalsTable groupData={{ userId, groupId: currentGroup.id }} />
                <GroupMessageBoard />
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
        userId,
        usersGroups,
        groupsAdmin
    }
}

export default connect(mapStateToProps)(GroupLandingPage)
