import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import AddUserToGroup from './AddUserToGroup'
import EditCustomGoals from './EditCustomGoals'
import CreateCustomGoal from './CreateCustomGoal'
import PageHeaderSpan from '../../header/PageHeaderSpan'
import UpdateGroupForm from './UpdateGroupForm'
import UserList from './UserList'

const AdminOptions = ({ match, userId, allGroups, location, allCustomGoals }) => {
    const [ currentGroup, setCurrentGroup ] = useState()
    const [ groupCustomGoals, setGroupCustomGoals ] = useState([])
    const history = useHistory()

    // set CurrentGroup data
    useEffect(() => {
        if(!allGroups.length) history.push('/')
        allGroups.map(group => { if(group.id === match.params.groupId) setCurrentGroup(group); return -1 }) // <- return -1 to remove warning from console
    }, [ allGroups, history, match ])

    // if user is not admin, kick them out
    useEffect(() => {
        if(currentGroup !== undefined) {
            const isAdmin = currentGroup.groupCreator === userId
            if(!isAdmin) history.push('/')
        }
    }, [ currentGroup, history, userId ])

    // strip the custom goals to be sent to EditCustomGoals
    useEffect(() => {
        if(allCustomGoals !== null && allCustomGoals !== undefined && currentGroup !== undefined) {
            const groupGoals = allCustomGoals.find(g => g.groupId === currentGroup.id)
            setGroupCustomGoals( groupGoals.customGoals )
        }
    }, [ allCustomGoals, currentGroup ])

    // prevents page from crashing on refresh
    if(!currentGroup) return (<div>Loading...</div>)

    return (
        <div>
            <PageHeaderSpan text='Admin Options' />
            <button 
                id="adminButton"
                onClick={() => {
                    const link = `/group/${ match.params.groupId }`
                    history.push(link)
                }}
            >Go To Group Page</button>
            <AddUserToGroup match={ match } />
            <UpdateGroupForm groupId={ currentGroup.id } />
            <CreateCustomGoal userId={ userId } match={ match } />
            { groupCustomGoals.length > 0 && <EditCustomGoals customGoals={ groupCustomGoals } groupId={ currentGroup.id } /> }
            { location.state.allMembers.length > 1 && <UserList allMembers={ location.state.allMembers } groupId={ currentGroup.id } groupCreator={ currentGroup.groupCreator } /> }
        </div>
    )
}

const mapStateToProps = (state) => {
    const userId = state.User.userData ? state.User.userData.id : ''
    const allGroups = state.Group.groupsFullData ? state.Group.groupsFullData : '' // have to pass in all groups, groupId exists in main component
    const allCustomGoals = state.Goals.customGoals ? state.Goals.customGoals : ''
    return {
        userId,
        allGroups,
        allCustomGoals
    }
} 

export default connect(mapStateToProps)(AdminOptions)
