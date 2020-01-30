import React from 'react'
import { connect } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'

import { GET_GROUP } from '../../graphql/tags/groups'

import UnAuthedNavHome from '../auth/UnAuthedNavHome'

const GroupLandingPage = ({ match, isAuthenticated }) => {
    const { data, loading, error } = useQuery(GET_GROUP, { variables: { groupId: match.params.groupId } })

    if(!isAuthenticated) return <UnAuthedNavHome />

    if(error) {
        console.log(error)
    }

    if(loading) {
        console.log(data)
        return (
            <p>Loading...</p>
        )
    }

    return (
        <div>
            Group Landing Page
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.User.isAuthenticated
    }
}

export default connect(mapStateToProps)(GroupLandingPage)
