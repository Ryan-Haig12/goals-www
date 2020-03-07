import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import UserGroups from './UserGroups'
import UnAuthenticatedPage from '../auth/UnAuthenticatedPage'

const StyledHomePage = styled.div`
    text-align: center;
    padding-top: 50px;
`

const StyledGroupCards = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
`

const mapUsersGroups = ( usersGroups ) => {
    return usersGroups.map(group => {
        return <UserGroups key={ group.id } groupData={ group } />
    })
}

const Home = ({ userData, usersGroups }) => {
    //const token = localStorage.getItem('token')
    const [ usersGroupsCards, setUsersGroupsCards ] = useState(null)

    useEffect(() => {
        if(usersGroups !== undefined && usersGroups !== null) {
            setUsersGroupsCards(mapUsersGroups(usersGroups))
        }
    }, [usersGroups])

    // User is authed
    if(userData !== undefined) {
        const { name, email } = userData
        return (
            <StyledHomePage> 
                This is the Homepage

                { name && <p>Your name is { name } and you are logged in</p> }
                { email && <p>Your email is { email }</p> }
                <StyledGroupCards>{ usersGroupsCards }</StyledGroupCards>       
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
