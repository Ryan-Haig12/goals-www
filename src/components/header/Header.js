import React from 'react'
import styled from 'styled-components'

import HeaderChunk from './HeaderChunk'

const StyledHeader = styled.header`
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
        </StyledHeader>
    )
}

export default Header

