import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'

import { GET_GROUP_POWER_RANKINGS } from '../../../graphql/tags/groups'
import { StyledPowerRankings } from '../../syledComponents/Group'

// import ChartWrapper from './d3Chart/ChartWrapper'
// import DatePicker from './d3Chart/DatePicker'
// import { StyledChartBody } from '../../syledComponents/d3Chart'

const mapPowerRankings = ( powerRankings, allMembers ) => {
    let mappedPowerRankings = []

    mappedPowerRankings.push(<h3 key={ 'weeklyRankings' } >Weekly Rankings</h3>)
    mappedPowerRankings.push(powerRankings.allTimeRankingsWeeks.map(rankLog => {
        const member = allMembers.find(member => member.id === rankLog.userId)
        if(!member) return <></>

        return (
            <div key={ rankLog.userId + '_' + rankLog.recordsWon } >
                <h5>{ member.name + ' Weeks Won: ' + rankLog.recordsWon }</h5>
            </div>
        )
    }))

    mappedPowerRankings.push(<h3 key={ 'monthlyRankings' } >Monthly Rankings</h3>)
    mappedPowerRankings.push(powerRankings.allTimeRankingsMonths.map(rankLog => {
        const member = allMembers.find(member => member.id === rankLog.userId)
        if(!member) return <></>

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
    }, [])

    useEffect(() => {
        if(error) console.log(error)

        if(data !== undefined && data !== null) {
            setPowerRankings(data.calcGroupPowerRanking)
        }
    }, [ data ])

    return (
        <div>
            <StyledPowerRankings>
                <h2>All Time Power Rankings</h2>
                { powerRankings && mapPowerRankings(powerRankings, allMembers) }
            </StyledPowerRankings>
            {/* 
                <StyledChartBody>
                    <DatePicker setDateRange={ setDateRange } />
                    <ChartWrapper groupId={ groupId } allMembers={ allMembers } dateRange={ dateRange } />
                </StyledChartBody>
            */}
        </div>
    )
}
 
export default PowerRankings;