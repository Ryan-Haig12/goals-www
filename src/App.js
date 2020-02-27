import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css'

import AllGoals from './components/AllGoals'
import CreateGroup from './components/groups/CreateGroup'
import Home from './components/home/Home'
import Header from './components/header/Header'
import UnAuthenticatedPage from './components/auth/UnAuthenticatedPage'
import GroupLandingPage from './components/groups/GroupLandingPage'

import {
  GET_DEFAULT_GOALS,
  //GET_CUSTOM_GOAL,
  GET_CUSTOM_GOALS_BY_GROUPID_ARRAY
} from './graphql/tags/goals'
import { GET_ALL_USERS_GROUPS } from './graphql/tags/groups'
import { getDefaultGoalsAction, getAllUserGroupsAction, getCustomGoalsByGroupIdArrayAction } from './redux/actions/index'

const App = ({ userData, userId, getDefaultGoalsAction, getAllUserGroupsAction, groupIds, getCustomGoalsByGroupIdArrayAction }) => {
  const [ isAuthenticated, setIsAuthenticated ] = useState(false)
  const { data: defaultGoals, loading, error } = useQuery(GET_DEFAULT_GOALS)
  const [
    getAllUsersGroupsQuery, {
    data: usersGroups,
    //loading: usersGroupsIsLoading,
    error: getAllGroupsError
  }] = useLazyQuery(GET_ALL_USERS_GROUPS, { variables: { userId } })
  const [
    getAllUsersCustomGoalsQuery, {
    data: usersCustomGoalsData,
    //loading: usersCustomGoalsLoading,
    error: usersCustomGoalsError
  }] = useLazyQuery(GET_CUSTOM_GOALS_BY_GROUPID_ARRAY, { variables: { groupIds } })

  if(error) console.log(error)
  if(getAllGroupsError) console.log(getAllGroupsError)
  if(usersCustomGoalsError) console.log(usersCustomGoalsError)

  useEffect(() => {
    setIsAuthenticated( userData !== undefined && userData.jwt !== undefined )
  }, [ userData ])

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
      //console.log('useEffect App.js', usersCustomGoalsData)
      getCustomGoalsByGroupIdArrayAction(usersCustomGoalsData.getAllCustomGoalsByGroupArray)
    }
  }, [usersCustomGoalsData, isAuthenticated, getCustomGoalsByGroupIdArrayAction])

  return (
    <BrowserRouter>
      { isAuthenticated ? <Header /> : null }
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route path='/allGoals' component={ AllGoals } />
        <Route path='/unauthed' component={ UnAuthenticatedPage } />
        <Route path='/createGroup' component={ CreateGroup } />
        <Route path='/group/:groupId' component={ GroupLandingPage } />
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
