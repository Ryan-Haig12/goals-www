import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from "graphql-tag"

const LOGIN_USER = gql`
  {
    loginUser(
      email: "testhaig1@haig.com",
      password: "password"
    )
    {
      id
      name
      email
      password
      dateCreated
      errors
      totalScoreAllTime
      totalScoreDay
      totalScoreWeek
      totalScoreMonth
      totalScoreGroup {
        groupId
        score
      }
      groups
      completedGoals
      jwt
    } 
  }
`

const App = () => {
  const { data, loading, error } = useQuery(LOGIN_USER)

  if (loading) return <p>Connecting to GraphQL...</p>
  if (error) return <p>Error Connecting to GraphQL</p>

  return (
    <div className="App">
      YUHEET
    </div>
  );
}

export default App;
