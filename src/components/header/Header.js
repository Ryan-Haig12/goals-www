import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import HeaderChunk from './HeaderChunk'

const StyledHeader = styled.div`
    height: 60px;
    width: 100%;
    background: #579190;
    margin: 0px !important;
`

const Header = (props) => {
    return (
        <StyledHeader>
            <HeaderChunk toLink="/" toText="Home" />
            <HeaderChunk toLink="/allGoals" toText="All Goals" />
            <HeaderChunk toLink="/register" toText="Register" />
        </StyledHeader>
    )
}

Header.propTypes = {

}

export default Header

