import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { connect } from 'react-redux'

import Login from './Login'
import Register from './Register'

import { GET_USER_BY_JWT } from '../../graphql/tags/user'
import { loginUserAction, logoutUserAction } from '../../redux/actions/index'
import { StyledTextDiv } from '../syledComponents/UnAuthed'
import Button from 'react-bootstrap/Button'

const UnAuthenticatedPage = ({ loginUserAction, logoutUserAction }) => {

    // true - render register, false - render login
    // probably a better way to do this but I'm drunk idc
    const [ renderRegisterModal, setRenderRegisterModal ] = useState(true)

    const { data: loggedInUserData } = useQuery(GET_USER_BY_JWT)

    useEffect(() => {
        if(loggedInUserData !== undefined && loggedInUserData !== null) {
            if(!loggedInUserData.getUserByJWT.errors && loggedInUserData.getUserByJWT.id !== null) {
                loginUserAction(loggedInUserData.getUserByJWT)
            }
        }
    }, [ loggedInUserData, loginUserAction, logoutUserAction ])

    return (
        <div style={{ width: '75%', margin: 'auto' }} >
            
            <div>
                { renderRegisterModal ? <Login /> : <Register /> }
            </div>
            <Button 
                id="userRedirect"
                style={{ position: 'fixed', left: '50%', transform: 'translate(-50%, -50%)' }}
                onClick={ () => setRenderRegisterModal(!renderRegisterModal) }
            >
                { renderRegisterModal ? 'Need to create a user?' : 'Already have a user?' }
            </Button>

            <br />
            
            <StyledTextDiv>
                <h1 style={{ borderBottom: '1px solid black' }} >Welcome to Goals!</h1>
                <p>In this game, you can team up and face off against your friends to use competition as motivation to improve your life one goal at a time</p>
            </StyledTextDiv>
        </div>
    )
}

export default connect(null, { loginUserAction, logoutUserAction })(UnAuthenticatedPage)
