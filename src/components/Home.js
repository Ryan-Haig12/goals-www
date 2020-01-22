import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledHomePage = styled.div`
    text-align: center;
`

const Home = props => {
    return (
        <StyledHomePage> 
            This is the Homepage
        </StyledHomePage>
    )
}

Home.propTypes = {

}

export default Home
