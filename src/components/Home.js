import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const StyledHomePage = styled.div`
    text-align: center;
    padding-top: 50px;
`

const Home = ({ userData }) => {
    if(userData !== undefined) {
        const { id, name, email, jwt } = userData

        return (
            <StyledHomePage> 
                This is the Homepage

                { name && <p>Your name is { name } and you are logged in</p> }
            </StyledHomePage>
        )
    }
    return (
        <p>User Is Un-authenticated</p>
    )
}

const mapStateToProps = ( state ) => {
    return {
        userData: state.User.userData
    }
}

export default connect(mapStateToProps)(Home)
