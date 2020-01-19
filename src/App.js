import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import test from './components/test'

import { LOGIN_USER } from './graphql/tags/user'

const App = () => {
  const { data, loading, error } = useQuery(LOGIN_USER)

  if (loading) return <p>Connecting to GraphQL...</p>
  if (error) return <p>Error Connecting to GraphQL</p>

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={ test } />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
