import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import HeaderChunk from './HeaderChunk'
import { logoutUserAction } from '../../redux/actions'
import { StyledHeader, StyledLogoutButton } from '../syledComponents/Header'

const Header = ({ isAuthenticated, logoutUserAction }) => {

    const token = localStorage.getItem('userJWT')
    useEffect(() => {
        if(!token) {
            return <Redirect to="/" />
        }
    }, [ token ])

    return (
        <StyledHeader>
            <HeaderChunk toLink="/" toText="Home" />
            <HeaderChunk toLink="/createGroup" toText="Create Group" />
            <HeaderChunk toLink="/user" toText="Profile" />
            { isAuthenticated ? <StyledLogoutButton onClick={() => {
                logoutUserAction();
                window.location.reload()
            } } >Logout</StyledLogoutButton> : null }
        </StyledHeader>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.User.isAuthenticated
    }
}

export default connect(mapStateToProps, { logoutUserAction })(Header)
