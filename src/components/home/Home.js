import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import UserGroups from './UserGroups'
import UnAuthenticatedPage from '../auth/UnAuthenticatedPage'
import { StyledHomePage, StyledGroupCards, HomeHeader, HomeSpan } from '../syledComponents/Home'

//import usePing from '../../hooks/usePing'

const mapUsersGroups = ( usersGroups ) => {
    return usersGroups.map(group => {
        return <UserGroups key={ group.id } groupData={ group } />
    })
}

const Home = ({ userData, usersGroups }) => {
    const [ usersGroupsCards, setUsersGroupsCards ] = useState(null)

    // const [ ping ] = usePing()
    // useEffect(() => {
    //     console.log(ping)
    // }, [ ping ])

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
                <HomeHeader>Group Landing Page</HomeHeader>
                <HomeSpan />
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
