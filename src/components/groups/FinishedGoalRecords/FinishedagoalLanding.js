import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory, Redirect } from 'react-router-dom'
import { useLazyQuery } from '@apollo/react-hooks'
import moment from 'moment'

import { GET_FINISHED_GOALS } from '../../../graphql/tags/finishedGoal'
import { GET_USERS_BY_ID } from '../../../graphql/tags/user'
import { StyledUserFinishedGoalsLog } from '../../syledComponents/Group'

// return unique userNames for select user dropdown
const mapUserIds = ( finishedGoals, allUserData ) => {
    if(!finishedGoals || !allUserData) return 
    let userIds = Array.from(new Set(finishedGoals.map(goal => goal.userId)))
    let userNames = allUserData.map(user => ({ id: user.id, name: user.name }))

    return userNames.map(({ name, id }) => {
        if(!userIds.includes(id)) return 0
        return (<option key={ id } value={ id } >{ name }</option>)
    })
} 

// return all finishedGoals for a given userId
const mapUserGoals = ( finishedGoals, userSelected ) => {
    if(!finishedGoals) return 0
    const userGoals = finishedGoals.filter(goal => goal.userId === userSelected)

    // reverse the goals so goals finished the most recent are placed at the top of the div
    return userGoals.reverse().map(fg => {
        return (
            <div key={ fg.id } >
                <h4 style={{ "textDecoration": "underline" }} >{ fg.goalId + ' ' + moment(parseInt(fg.timeCompleted)).format('LLLL') }</h4>
            </div>
        )
    })
}

const FinishedGoalLanding = ({ match, usersGroups }) => {
    const [ currentGroup, setCurrentGroup ] = useState()
    const [ getFinishedGoalsQuery, { data } ] = useLazyQuery(GET_FINISHED_GOALS, { variables: { GetFinishedGoalsData: { groupId: match.params.groupId } } })
    const [ getAllUsers, { data: allUserData } ] = useLazyQuery(GET_USERS_BY_ID, { variables: { 
        userIds: currentGroup ? currentGroup.groupMembers : [] 
    }})
    const [ finishedGoals, setFinishedGoals ] = useState()
    const [ userSelected, setUserSelected ] = useState('no user selected')
    const history = useHistory()

    useEffect(() => {
        getFinishedGoalsQuery()
        setCurrentGroup( usersGroups.find(group => {
            return group.id.toString() === match.params.groupId.toString()
        }))
    }, [ getFinishedGoalsQuery, match, usersGroups ])

    useEffect(() => {
        if(data !== undefined && data !== null) {
            setFinishedGoals(data.getFinishedGoals)
        }
    }, [ data ])

    useEffect(() => {
        if(currentGroup !== undefined && data !== null) {
            getAllUsers()
        }
    }, [ currentGroup, getAllUsers, data ])

    if(!usersGroups.length) return <Redirect to="/" />
    
    if(allUserData !== undefined && allUserData !== null) {
        return (
            <div>
                <button onClick={() => {
                    const link = `/group/${ match.params.groupId }`
                    history.push(link)
                }} >Go To Group Page</button>
    
                <select
                    name="userSelect"
                    onChange={ e => setUserSelected(e.target.value) }
                >
                    <option defaultValue value="">Users</option>
                    { mapUserIds( finishedGoals, allUserData.getMultipleUsersById ) }
                </select>
                
                <StyledUserFinishedGoalsLog>
                    <h3>{ userSelected }</h3>
                    { mapUserGoals( finishedGoals, userSelected ) }
                </StyledUserFinishedGoalsLog>
            </div>
        )
    }
    return (
        <div>
            Loading...
            <button 
            id="finishedGoal"
            onClick={() => {
                    const link = `/group/${ match.params.groupId }`
                    history.push(link)
                }} >Go To Group Page</button>
        </div>
    )
}

// I coded this component poorly, I should be passing all members in through props rather
// than having to connect to redux again. I just didn't set this component up that way
const mapStateToProps = ( state ) => {
    const usersGroups = state.Group.groupsFullData ? state.Group.groupsFullData : []
    return {
        usersGroups
    }
}

export default connect( mapStateToProps )(FinishedGoalLanding)