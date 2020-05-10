import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'

import { GET_GROUP_POWER_RANKINGS } from '../../../graphql/tags/groups'

// import ChartWrapper from './d3Chart/ChartWrapper'
// import DatePicker from './d3Chart/DatePicker'
// import { StyledChartBody } from '../../syledComponents/d3Chart'

const mapPowerRankings = ( powerRankings, allMembers ) => {    
    let mappedPowerRankings = []

    mappedPowerRankings.push(<h3 key={ 'weeklyRankings' } >Weekly Rankings</h3>)
    mappedPowerRankings.push(powerRankings.allTimeRankingsWeeks?.map(rankLog => {
        const member = allMembers.find(member => member.id === rankLog.userId)
        if(!member) return 0

        return (
            <div key={ rankLog.userId + '_' + rankLog.recordsWon }>
                <h5>{ member.name + ' Weeks Won: ' + rankLog.recordsWon }</h5>
            </div>
        )
    }))

    mappedPowerRankings.push(<h3 key={ 'monthlyRankings' } style={{ borderTop: '1px solid black', width: '90%', position: 'block', margin: 'auto' }} >Monthly Rankings</h3>)
    mappedPowerRankings.push(powerRankings.allTimeRankingsMonths?.map(rankLog => {
        const member = allMembers.find(member => member.id === rankLog.userId)
        if(!member) return 0

        return (
            <div key={ rankLog.userId + '_' + rankLog.recordsWon } >
                <h5>{ member.name + ' Months Won: ' + rankLog.recordsWon }</h5>
            </div>
        )
    }))

    return mappedPowerRankings
}

const PowerRankings = ({ groupId, allMembers }) => {
    const [ getPowerRankingsQuery, { data, error } ] = useLazyQuery(GET_GROUP_POWER_RANKINGS, { variables: { groupId } })
    const [ powerRankings, setPowerRankings ] = useState(null)
    //const [ dateRange, setDateRange ] = useState(null)

    useEffect(() => {
        getPowerRankingsQuery()
    }, [ getPowerRankingsQuery ])

    useEffect(() => {
        if(error) console.log(error)

        if(data !== undefined && data !== null) {
            setPowerRankings(data.calcGroupPowerRanking)
        }
    }, [ data, error ])

    return (
        <div style={{ textAlign: 'center', border: '1px solid black', borderRadius: '5px', width: '33%', background: '#2B8083', color: '#F0D47E', display: 'block', margin: 'auto' }} >
            <h2 style={{ margin: 'auto', fontSize: '5vh', borderBottom: '1px solid black', width: '90%' }} >All Time Power Rankings</h2>
            <div style={{ marginTop: '10px' }} >{ powerRankings && mapPowerRankings(powerRankings, allMembers) }</div>
            { !powerRankings && <p style={{ fontSize: '3vh', paddingTop: '25px' }} >There hasn't been a goal logged in this group. Be the first to log a goal and watch your groups power rankings change over time!</p> }
        </div>
    )
}
 
export default PowerRankings