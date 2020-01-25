import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css'

import AllGoals from './components/AllGoals'
import Home from './components/Home'
import Header from './components/header/Header'
import UnAuthenticatedPage from './components/auth/UnAuthenticatedPage'

const App = ({ userData }) => {

  const [ isAuthenticated, setIsAuthenticated ] = useState(false)
  useEffect(() => {
    setIsAuthenticated( userData !== undefined && userData.jwt !== undefined )
  }, [ userData ])

  return (
    <BrowserRouter>
      { isAuthenticated ? <Header /> : null }
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route path='/allGoals' component={ AllGoals } />
        <Route path='/unauthed' component={ UnAuthenticatedPage } />
      </Switch>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => {
  return {
    userData: state.User.userData
  }
}

export default connect(mapStateToProps)(App)
