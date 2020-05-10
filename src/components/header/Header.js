import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import HeaderChunk from './HeaderChunk'
import { logoutUserAction } from '../../redux/actions'
import { StyledHeader, StyledLogoutButton, StyledLogoText, StyledChunksGroup } from '../syledComponents/Header'

const Header = ({ isAuthenticated, logoutUserAction }) => {
    const [ sendHome, setSendHome ] = useState(false)

    // send user back to homepage if this is clicked
    // setTimeout is to re-render header after user is back on the homepage 
    if(sendHome) {
        setTimeout(() => setSendHome(false), 1)
        return <Redirect to="/" />
    }
    
    return (
        <StyledHeader>
            <StyledLogoText onClick={ () => setSendHome(true) } >Daily Goals</StyledLogoText>
            { isAuthenticated ? <StyledLogoutButton onClick={() => {
                logoutUserAction();
                window.location.reload()
            } } >Logout</StyledLogoutButton> : null }
            <StyledChunksGroup>
                <HeaderChunk toLink="/" toText="Home" />
                <HeaderChunk toLink="/user" toText="Profile" />
                <HeaderChunk toLink="/createGroup" toText="Create Group" />
            </StyledChunksGroup>
        </StyledHeader>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.User.isAuthenticated
    }
}

export default connect(mapStateToProps, { logoutUserAction })(Header)
