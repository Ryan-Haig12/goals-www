import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import HeaderChunk from './HeaderChunk'
import { logoutUserAction } from '../../redux/actions'
import { StyledHeader, StyledLogoutButton, StyledLogoText, StyledChunksGroup } from '../syledComponents/Header'

const Header = ({ isAuthenticated, logoutUserAction }) => {
    const history = useHistory()
    return (
        <StyledHeader>
            <StyledLogoText onClick={ () => history.push('/') } >Daily Goals</StyledLogoText>
            { isAuthenticated ? <StyledLogoutButton onClick={() => {
                logoutUserAction();
                window.location.reload()
            } } >Logout</StyledLogoutButton> : null }
            <StyledChunksGroup>
                <HeaderChunk toLink="/user" toText="Profile" />
                <HeaderChunk toLink="/createGroup" toText="Create Group" />
                <HeaderChunk toLink="/" toText="Home" />
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
