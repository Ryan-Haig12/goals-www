import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import AddUserToGroup from './AddUserToGroup'
import CreateCustomGoal from './CreateCustomGoal'
import PageHeaderSpan from '../../header/PageHeaderSpan'

const AdminOptions = ({ match, userId, allGroups }) => {
    const [ currentGroup, setCurrentGroup ] = useState()
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

    return (
        <div>
            <PageHeaderSpan text='Admin Options' />
            <button onClick={() => {
                const link = `/group/${ match.params.groupId }`
                history.push(link)
            }} >Go To Group Page</button>
            <AddUserToGroup match={ match } />
            <CreateCustomGoal userId={ userId } match={ match } />
        </div>
    )
}

const mapStateToProps = (state) => {
    const userId = state.User.userData ? state.User.userData.id : ''
    const allGroups = state.Group.groupsFullData ? state.Group.groupsFullData : '' // have to pass in all groups, groupId exists in main component
    return {
        userId,
        allGroups
    }
} 

export default connect(mapStateToProps)(AdminOptions)
