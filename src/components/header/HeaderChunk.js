import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

const StyledChunk = styled.button`
    background: #9efffd;
    width: 150px;
    height: 50px;
    text-decoration: none;
    text-align: center;
    position: static;
    margin-left: 5px;
    margin-top: 5px;
`

const HeaderChunk = ({ toLink, toText }) => {
    const history = useHistory()
    return (
        <StyledChunk onClick={ () => history.push(toLink) } >
            { toText }
        </StyledChunk>
    )
}

HeaderChunk.propTypes = {
    toLink: PropTypes.string,
    toText: PropTypes.string
}

export default HeaderChunk
