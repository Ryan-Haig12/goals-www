import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { GET_USER } from '../../graphql/tags/user'

const GroupCard = styled.div`
    border: 1px solid black;
    margin: 25px;
    padding: 5px;
    width: 350px;
    height: 175px;
`

const UserGroups = ({ groupData }) => {
    const [ userName, setUserName ] = useState('Null User Name')
    const { data } = useQuery(GET_USER, {
        variables: { userId: groupData.groupCreator }
    })
    const history = useHistory()
    // if the error value is added to the returned object from GET_USER
    // then it prints an error for querying
    // "Error: GraphQL error: Cannot return null for non-nullable field Query.getUser."
    // this doesn't seem to be an issue if I just don't print the error...
    // there's a trello card to fix this
    //if(error) console.log(error)

    useEffect(() => {
        if(data !== undefined && data !== null) {
            setUserName(data.getUser.name)
        }
    }, [data])

    return (
        <GroupCard>
            <h2>{ groupData.groupName }</h2>
            <p>Created By { userName }</p>
            <p>Last Completed Goal: REPLACE ME WITH DATA</p>
            <button onClick={() => {
                const link = `/group/${ groupData.id }`
                history.push(link)
            }} >Go To Group Page</button>
        </GroupCard>
    )
}

UserGroups.propTypes = {
    groupData: PropTypes.object
}

export default UserGroups

