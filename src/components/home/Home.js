import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import EmptyGroupStatePage from '../groups/EmptyGroupStatePage'
import PageHeaderSpan from '../header/PageHeaderSpan'
import UnAuthenticatedPage from '../auth/UnAuthenticatedPage'
import UserGroups from './UserGroups'
import { StyledHomePage, StyledGroupCards } from '../syledComponents/Home'

const mapUsersGroups = ( usersGroups ) => {
    return usersGroups.map(group => {
        return <UserGroups key={ group.id } groupData={ group } />
    })
}

const Home = ({ userData, usersGroups }) => {
    const [ usersGroupsCards, setUsersGroupsCards ] = useState(null)

    useEffect(() => {
        if(usersGroups !== undefined && usersGroups !== null) {
            setUsersGroupsCards(mapUsersGroups(usersGroups))
        }
    }, [usersGroups])

    // User is authed
    if(userData !== undefined) {
        //const { name, email } = userData
        return (
            <StyledHomePage>
                <PageHeaderSpan text={ "Home" } />
                <StyledGroupCards>{ usersGroupsCards }</StyledGroupCards>
                { usersGroupsCards.length < 1 && <EmptyGroupStatePage /> }
            </StyledHomePage>
        )
    }
    // User is un-authed
    return (
        <UnAuthenticatedPage />
    )
}

const mapStateToProps = ( state ) => {
    const usersGroups = state.Group ? state.Group.groupsFullData : ''
    return {
        userData: state.User.userData,
        usersGroups
    }
}

export default connect(mapStateToProps)(Home)
