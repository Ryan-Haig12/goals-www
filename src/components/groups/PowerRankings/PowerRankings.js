import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'

import { GET_GROUP_POWER_RANKINGS } from '../../../graphql/tags/groups'
import { StyledPowerRankings } from '../../syledComponents/Group'

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

    useEffect(() => {
        getPowerRankingsQuery()
        if(error) console.log(error)
    }, [])

    useEffect(() => {
        if(data !== undefined && data !== null) {
            setPowerRankings(data.calcGroupPowerRanking)
        }
    }, [ data ])

    return (
        <StyledPowerRankings>
            <h2>All Time Power Rankings</h2>
            { powerRankings && mapPowerRankings(powerRankings, allMembers) }
        </StyledPowerRankings>
    )
}
 
export default PowerRankings;