import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import HeaderChunk from './HeaderChunk'

import { logoutUserAction } from '../../redux/actions'

const StyledHeader = styled.header`
    height: 60px;
    width: 100%;
    background: #579190;
    margin: 0px !important;
`

const StyledLogoutButton = styled.button`
    background: #d1311f;
    width: 150px;
    height: 50px;
    text-decoration: none;
    text-align: center;
    position: static;
    margin-right: 5px;
    margin-top: 5px;
    float: right;
`

const Header = ({ isAuthenticated, logoutUserAction }) => {
    return (
        <StyledHeader>
            <HeaderChunk toLink="/" toText="Home" />
            <HeaderChunk toLink="/allGoals" toText="All Goals" />
            { isAuthenticated ? <StyledLogoutButton onClick={() => { logoutUserAction() }} >Logout</StyledLogoutButton> : null }
        </StyledHeader>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.User.isAuthenticated
    }
}

export default connect(mapStateToProps, { logoutUserAction })(Header)
