import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { useHistory } from 'react-router-dom'

import { logoutUserAction } from '../../redux/actions'
import * as Theme from '../syledComponents/Theme'

const Header = ({ logoutUserAction }) => {
    const [ sendHome, setSendHome ] = useState(false)
    const history = useHistory()

    // send user back to homepage if this is clicked
    // setTimeout is to re-render header after user is back on the homepage 
    if(sendHome) {
        setTimeout(() => setSendHome(false), 1)
        return <Redirect to="/" />
    }

    return (
        <Navbar style={{ background: `${ Theme.darkBlue }` }} expand="lg">
            <Navbar.Brand onClick={ () => history.push('/') } style={{ color: `${ Theme.yellow }`, borderBottom: `1px solid ${ Theme.yellow }`, fontSize: '3vh' }}>Daily Goals</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Nav.Link style={{ color: `${ Theme.yellow }` }} onClick={ () => history.push('/') } className="ml-auto">Dashboard</Nav.Link>
                    <Nav.Link style={{ color: `${ Theme.yellow }` }} onClick={ () => history.push('/user') } className="ml-auto">Profile</Nav.Link>
                    <Nav.Link style={{ color: `${ Theme.yellow }` }} onClick={ () => history.push('/createGroup') } className="ml-auto">Create Group</Nav.Link>
                    <Nav.Link style={{ color: `${ Theme.yellow }` }} onClick={() => { logoutUserAction(); window.location.reload(); }} className="ml-auto" >Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.User.isAuthenticated
    }
}

export default connect(mapStateToProps, { logoutUserAction })(Header)
