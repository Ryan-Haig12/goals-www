import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { connect } from 'react-redux'

import Login from './Login'
import Register from './Register'

import { GET_USER_BY_JWT } from '../../graphql/tags/user'
import { loginUserAction, logoutUserAction } from '../../redux/actions/index'
import { StyledTextDiv, StyledAuthDiv, StyledUnauthedPage, StyledAuthButton } from '../syledComponents/UnAuthed'

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
        <StyledUnauthedPage>
            <StyledAuthButton onClick={ () => setRenderRegisterModal(!renderRegisterModal) } >{ renderRegisterModal ? 'Need to create a user?' : 'Already have a user?' }</StyledAuthButton>
            <StyledAuthDiv>
                { renderRegisterModal ? <Login /> : <Register /> }
            </StyledAuthDiv>
            <br />
            <StyledTextDiv>
                <p>Damn, so you're struggling a bit huh?</p>
                <p>Not really eating as healthy as you'd like?</p>
                <p>Too much TV and not enough exercise?</p>
                <p>Not really going to church every Sunday?</p>
                <p>Feel like you're drinking too much?</p>
                <p>Well guess what mother fucker</p>
                <p>That shits on you. You gatta make a path for yourself</p>
                <p>Start running again</p>
                <p>Stop eating so many goddamn pizza rolls</p>
                <p>Go for a hike with your wife for fucks sake</p>
                <p>Go shoot some hoops with your pals instead of going to the bar</p>
                <p>Spend some time with your kid, jesus do I really have to say that?</p>
                <p>That's all on you</p>
                <p>However, humans are lazy, stupid, and sometimes need a push</p>
                <p>This app is your push</p>
                <p>Join with your buddies or compete against yourself</p>
                <p>Do what you gatta do to be the best you you can be</p>
            </StyledTextDiv>
        </StyledUnauthedPage>
    )
}

export default connect(null, { loginUserAction, logoutUserAction })(UnAuthenticatedPage)
