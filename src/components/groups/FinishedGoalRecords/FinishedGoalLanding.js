import React, { useState, useEffect } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useLazyQuery } from '@apollo/react-hooks'
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Table from 'react-bootstrap/Table'
import moment from 'moment'

import { GET_FINISHED_GOALS } from '../../../graphql/tags/finishedGoal'
import { GET_USERS_BY_ID } from '../../../graphql/tags/user'
import { StyledUserFinishedGoalsLog } from '../../syledComponents/Group'
import * as Theme from '../../syledComponents/Theme'

const FinishedGoalLanding = props => {
    const { match, usersGroups, allGoals, groupId } = props.location.state

    const [ currentGroup, setCurrentGroup ] = useState()
    const [ getFinishedGoalsQuery, { data } ] = useLazyQuery(GET_FINISHED_GOALS, { variables: { GetFinishedGoalsData: { groupId: match.params.groupId } } })
    const [ getAllUsers, { data: allUserData } ] = useLazyQuery(GET_USERS_BY_ID, { variables: { userIds: currentGroup ? currentGroup.groupMembers : [] }})
    const [ finishedGoals, setFinishedGoals ] = useState()
    const [ userSelected, setUserSelected ] = useState('no user selected')
    const history = useHistory()

    // strip all enabled customGoals
    const group = allGoals.customGoalsAllGroups.filter(group => group.groupId === groupId)[0]
    const customGoals = group.customGoals.filter(f => f)

    // merge custom goals and default goals
    let groupGoals = []
    let mergedGoals = allGoals.defaultGoals

    // add all default goals to groupGoals array
    for(let category in mergedGoals) {
        mergedGoals[category].goals.map(goal => {
            groupGoals.push(goal)
            return goal
        })
    }
    // add custom goals to groupGoals array
    customGoals.map(goal => { groupGoals.push(goal); return goal })

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

    // return unique userNames for select user dropdown
    const mapUserIdsV2 = () => {
        if(!finishedGoals || !allUserData) return

        let userIds = Array.from(new Set(finishedGoals.map(goal => goal.userId)))
        let userNames = allUserData.getMultipleUsersById.map(user => ({ id: user.id, name: user.name }))

        return userNames.map(({ name, id }) => {
            if(!userIds.includes(id)) return undefined
            return (
                <Dropdown.Item
                    onClick={ () => setUserSelected(id) }
                    variant="warning"
                    key={ id }
                    value={ id }
                >{ name }</Dropdown.Item>
            )
        })
    } 

    // return all finishedGoals for a given userId
    const mapUserGoalsV2 = userSelected => {
        if(!finishedGoals || !allUserData || !userSelected) return <div><h3>Found no finished goals</h3></div>

        let userGoals = finishedGoals.filter(goal => goal.userId === userSelected)
        let userNames = allUserData.getMultipleUsersById.map(user => ({ id: user.id, name: user.name }))
        const userSelectedName = userNames.find(user => user.id === userSelected)

        return (
            <div>
                <h3 style={{ padding: '20px' }} >{ userSelectedName ? userSelectedName.name : 'No User Selected'  }</h3>

                { userSelectedName !== undefined && 
                    <Table style={{ color: `${ Theme.yellow }` }} >
                        <thead>
                            <tr>
                                <th onClick={ () => userGoals = userGoals.sort((a, b) => a.title > b.title) } >Title</th>
                                <th onClick={ () => console.log('categoru') } >Category</th>
                                <th>Points</th>
                                <th>Minutes</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userGoals.reverse().map(fg => {
                                const goalDetail = groupGoals.find(goal => fg.goalId === goal.id)
                                return (
                                    <tr key={ fg.id } >
                                        <td>{ goalDetail.title }</td>
                                        <td>{ goalDetail.category }</td>
                                        <td>{ goalDetail.points * ((parseInt(fg.minutesLogged) / 15) * .25) }</td>
                                        <td>{ fg.minutesLogged }</td>
                                        <td>{ moment(parseInt(fg.timeCompleted)).format('L') }</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                }
            </div>
        )
    }

    // render button to return user to home page
    const GroupPageButton = (
        <div style={{ display: 'flex', justifyContent: 'center', flexBasis: '400px', margin: '20px' }} >
            <Button variant="warning" onClick={() => {
                const link = `/group/${ match.params.groupId }`
                history.push(link)
            }} >Go To Group Page</Button>
        </div>
    )

    if(!usersGroups.length) return <Redirect to="/" />
    
    if(allUserData !== undefined && allUserData !== null) {
        return (
            <div>
                { GroupPageButton }
    
                {
                    /* 
                        if the group has yet to finish a goal or the goals are loading
                        return an empty state message
                    */
                    !finishedGoals?.length 
                        ? <StyledUserFinishedGoalsLog>
                            <h2>No goals have been found</h2>
                        </StyledUserFinishedGoalsLog>
                        : <div style={{ margin: '0px !important'}} >
                            <DropdownButton 
                                id="dropdownItemButton"
                                title="Select User"
                                name="userSelect"
                                variant="warning"
                                style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}
                            >
                                { mapUserIdsV2() }
                            </DropdownButton>
                            
                            <StyledUserFinishedGoalsLog>
                                { mapUserGoalsV2(userSelected) }
                            </StyledUserFinishedGoalsLog>
                        </div>
                }
            </div>
        )
    }
    return (
        <div>
            Loading...
            { GroupPageButton }
        </div>
    )
}

export default FinishedGoalLanding