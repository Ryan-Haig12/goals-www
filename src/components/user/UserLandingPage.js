import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useLazyQuery } from '@apollo/react-hooks'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

import { CALC_USER_STAT } from '../../graphql/tags/stats'
import PageHeaderSpan from '../header/PageHeaderSpan'
import ShowUserStats from './ShowUserStats'


const UserLandingPage = ({ userData }) => {

    const [ userId, setUserId ] = useState(null)
    const [ getUserStat, { data } ] = useLazyQuery(CALC_USER_STAT, { variables: { userId } })
    const [ userStats, setUserStats ] = useState()
    const [ userStatsFetched, setUserStatsFetched ] = useState(false)
    useEffect(() => {
        if(userData !== undefined && userData !== null) {
            setUserId(userData.id)
            getUserStat()
        }
    }, [ userData ])

    useEffect(() => {
        if(data !== undefined && data !== null) {
            setUserStats(data.calcUserStat)
            setUserStatsFetched(true)
        }
    }, [ data ])

    if(userData === undefined) return <Redirect to="/" />

    const { name, email, dateCreated } = userData

    return (
        <div>
            <PageHeaderSpan text={ name + '\'s Landing Page' } />
            <div>
                <p>Name { name }, Email { email }</p>
                <p>Member since { moment(dateCreated).format('MMM do, YYYY') }</p>
            </div>
            <div>
                { userStatsFetched ? <ShowUserStats data={ userStats } /> : '' }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userData: state.User.userData
    }
}

export default connect(mapStateToProps)(UserLandingPage)
