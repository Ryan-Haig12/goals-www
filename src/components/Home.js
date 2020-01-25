import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import UnAuthenticatedPage from './auth/UnAuthenticatedPage'

const StyledHomePage = styled.div`
    text-align: center;
    padding-top: 50px;
`

const Home = ({ userData }) => {
    // User is authed
    if(userData !== undefined) {
        const { name, email } = userData
        return (
            <StyledHomePage> 
                This is the Homepage

                { name && <p>Your name is { name } and you are logged in</p> }
                { email && <p>Your email is { email }</p> }
            </StyledHomePage>
        )
    }
    // User is un-authed
    return (
        <UnAuthenticatedPage />
    )
}

const mapStateToProps = ( state ) => {
    return {
        userData: state.User.userData
    }
}

export default connect(mapStateToProps)(Home)
