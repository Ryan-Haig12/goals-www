import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css'

import AdminOptions from './components/groups/Admin/AdminOptions'
import CreateGroup from './components/groups/CreateGroup'
import FinishedGoalLanding from './components/groups/FinishedGoalRecords/FinishedagoalLanding'
import GroupLandingPage from './components/groups/GroupLandingPage'
import Header from './components/header/Header'
import Home from './components/home/Home'
import NotFoundPage from './components/home/NotFoundPage'
import UnAuthenticatedPage from './components/auth/UnAuthenticatedPage'
import UserLandingPage from './components/user/UserLandingPage'

import {
  GET_DEFAULT_GOALS,
  GET_CUSTOM_GOALS_BY_GROUPID_ARRAY
} from './graphql/tags/goals'
import { GET_ALL_USERS_GROUPS } from './graphql/tags/groups'
import { getDefaultGoalsAction, getAllUserGroupsAction, getCustomGoalsByGroupIdArrayAction } from './redux/actions/index'

const App = ({ userData, userId, getDefaultGoalsAction, getAllUserGroupsAction, groupIds, getCustomGoalsByGroupIdArrayAction }) => {
  const [ isAuthenticated, setIsAuthenticated ] = useState(false)
  const [ getDefaultGoals, { data: defaultGoals, loading, error } ] = useLazyQuery(GET_DEFAULT_GOALS)
  const [
    getAllUsersGroupsQuery, {
    data: usersGroups,
    error: getAllGroupsError
  }] = useLazyQuery(GET_ALL_USERS_GROUPS, { variables: { userId } })
  const [
    getAllUsersCustomGoalsQuery, {
    data: usersCustomGoalsData,
    error: usersCustomGoalsError
  }] = useLazyQuery(GET_CUSTOM_GOALS_BY_GROUPID_ARRAY, { variables: { groupIds } })

  if(error) console.log(error)
  if(getAllGroupsError) console.log(getAllGroupsError)
  if(usersCustomGoalsError) console.log(usersCustomGoalsError)

  useEffect(() => {
    if(defaultGoals !== undefined && defaultGoals !== null) {
      getDefaultGoalsAction(defaultGoals.getAllGoals)
    }
  }, [ getDefaultGoalsAction, defaultGoals ])

  useEffect(() => {
    const isAuthed = userData !== undefined && userData.jwt !== undefined
    setIsAuthenticated( isAuthed )
    if(isAuthed) {
      getDefaultGoals()
    }
  }, [ userData, getDefaultGoals ])

  useEffect(() => {
    if(defaultGoals !== undefined && defaultGoals !== null && isAuthenticated) {
      getDefaultGoalsAction(defaultGoals.getAllGoals)
      getAllUsersGroupsQuery()
    }
  }, [isAuthenticated, loading, getDefaultGoalsAction, defaultGoals, getAllUsersGroupsQuery, groupIds])

  useEffect(() => {
    if(usersGroups !== undefined && usersGroups !== null && isAuthenticated) {
      getAllUserGroupsAction(userId, usersGroups.getAllUsersGroups)
    }
  }, [isAuthenticated, getAllUserGroupsAction, usersGroups, userId])

  useEffect(() => {
    if(groupIds !== undefined && groupIds !== null && groupIds.length && isAuthenticated) {
      getAllUsersCustomGoalsQuery()
    }
  }, [isAuthenticated, groupIds, getAllUsersCustomGoalsQuery])

  useEffect(() => {
    if(usersCustomGoalsData !== undefined && usersCustomGoalsData !== null && isAuthenticated) {
      getCustomGoalsByGroupIdArrayAction(usersCustomGoalsData.getAllCustomGoalsByGroupArray)
    }
  }, [usersCustomGoalsData, isAuthenticated, getCustomGoalsByGroupIdArrayAction])

  return (
    <BrowserRouter>
      { isAuthenticated ? <Header /> : null }
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route path='/unauthed' component={ UnAuthenticatedPage } />
        <Route path='/createGroup' component={ CreateGroup } />
        <Route exact path='/group/:groupId' component={ GroupLandingPage } />
        <Route exact path='/group/:groupId/adminOptions' component={ AdminOptions } />
        <Route exact path='/group/:groupId/finishedGoalsReport' component={ FinishedGoalLanding } />
        <Route exact path='/user' component={ UserLandingPage } />
        <Route component={ NotFoundPage } />
      </Switch>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => {
  const userId = state.User.userData ? state.User.userData.id : ''
  const groupIds =  state.Group.groupsMember ? state.Group.groupsMember : ''
  return {
    userData: state.User.userData,
    userId,
    groupIds
  }
}

export default connect(mapStateToProps, { getDefaultGoalsAction, getAllUserGroupsAction, getCustomGoalsByGroupIdArrayAction })(App)
