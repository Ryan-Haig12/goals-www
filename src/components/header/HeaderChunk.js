import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import { StyledChunk } from '../syledComponents/Header'

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
