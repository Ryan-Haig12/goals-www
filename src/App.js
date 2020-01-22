import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css'

import AllGoals from './components/AllGoals'
import Home from './components/Home'
import Header from './components/header/Header'

import { LOGIN_USER } from './graphql/tags/user'

const App = () => {
  // const { data, loading, error } = useQuery(LOGIN_USER)
  // if (loading) return <p>Connecting to GraphQL...</p>
  // if (error) return <p>Error Connecting to GraphQL</p>

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route path='/allGoals' component={ AllGoals } />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
