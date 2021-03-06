import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useLazyQuery } from '@apollo/react-hooks'
import moment from 'moment'

import { GET_USERS_BY_ID } from '../../graphql/tags/user'
import { StyledGroupMembersDiv } from '../syledComponents/Group'
import PageHeaderSpan from '../header/PageHeaderSpan'
import Button from 'react-bootstrap/Button'

import FinishedGoalForm from './FinishedGoalForm'
import GroupChat from './Messages/GroupChat'
import GroupMembers from './GroupMembers'
import PowerRankings from './PowerRankings/PowerRankings'
import UnAuthedNavHome from '../auth/UnAuthedNavHome'

const GroupLandingPage = ({ match, usersGroups, isAuthenticated, groupsAdmin, userData, defaultGoals, customGoalsAllGroups }) => {
    const [ currentGroup, setCurrentGroup ] = useState(null)
    const [ isAdmin, setIsAdmin ] = useState(false)
    const [ playerScoresShouldBeFetched, setPlayerScoresShouldBeFetched ] = useState(false)
    const [ redirectToAdmin, setRedirectToAdmin ] = useState(false)
    const [ redirectToScoringRecords, setRedirectToScoringRecords ] = useState(false)
    const [ getAllUsers, { data, loading, error } ] = useLazyQuery(GET_USERS_BY_ID, { variables: { userIds: currentGroup ? currentGroup.groupMembers : [] } })

    const userId = userData.id

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

                { isAdmin && redirectToAdmin && <Redirect to={{
                    pathname: adminLink,
                    state: { allMembers: data.getMultipleUsersById }
                }} /> }

                { redirectToScoringRecords && <Redirect to={{
                    pathname: `/group/${ currentGroup.id }/finishedGoalsReport`,
                    state: { match, usersGroups, allGoals: { defaultGoals, customGoalsAllGroups }, groupId: currentGroup.id, isAuthenticated }
                }} /> }

                <div>
                    <StyledGroupMembersDiv style={{ border: '1px solid black' }} >
                        <h3>{ moment(Date.now()).format('MMMM') } Standings</h3>
                        <GroupMembers
                            groupId={currentGroup.id}
                            allMembers={data.getMultipleUsersById}
                            playerScoresShouldBeFetched={ playerScoresShouldBeFetched }
                        />

                        <div style={{ display: 'block', padding: '15px', textAlign: 'center' }} >
                            { isAdmin ? 
                                <Button
                                    variant="warning"
                                    onClick={ () => {setRedirectToAdmin(true)}}
                                >Go To Admin Options</Button>
                                : null
                            }
                            <Button 
                                style={{ margin: '10px' }}
                                variant="warning"
                                onClick={() => {
                                setRedirectToScoringRecords(true)
                            }}>Go To Finished Goal Report</Button>
                        </div>
                    </StyledGroupMembersDiv>

                    <FinishedGoalForm
                        allGoals={{ defaultGoals, customGoalsAllGroups }}
                        allMembers={data.getMultipleUsersById}
                        groupData={{ userId, groupId: currentGroup.id }}
                        setPlayerScoresShouldBeFetched={ setPlayerScoresShouldBeFetched }
                    />

                    <PowerRankings groupId={ currentGroup.id } allMembers={data.getMultipleUsersById} />

                    <GroupChat allMembers={data.getMultipleUsersById} userId={ userId } groupId={ currentGroup.id } />
                </div>
            </div>
        )
    }
    return <p>Loading...</p>
}

const mapStateToProps = (state) => {
    const userData = state.User.userData ? state.User.userData : ''
    const usersGroups = state.Group.groupsFullData ? state.Group.groupsFullData : []
    const groupsAdmin = state.Group.groupsAdmin ? state.Group.groupsAdmin : []
    return {
        isAuthenticated: state.User.isAuthenticated,
        goalIsSelected: state.FinishedGoals.goalIsSelected,
        userData,
        usersGroups,
        groupsAdmin,
        defaultGoals: state.Goals.defaultGoals,
        customGoalsAllGroups: state.Goals.customGoals,
    }
}

export default connect(mapStateToProps)(GroupLandingPage)
