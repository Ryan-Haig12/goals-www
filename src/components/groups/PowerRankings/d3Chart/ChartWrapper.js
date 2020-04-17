import React, { useEffect, useRef, useState } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import moment from 'moment'

import { CALC_USER_SCORE } from '../../../../graphql/tags/scoring'
import D3Chart from './D3Chart'

const ChartWrapper = ({ groupId, allMembers, dateRange }) => {
    const chartRef = useRef(null)
    const [ chart, setChart ] = useState(null)
    const [ calcUserScoreQuery, { data, error } ] = useLazyQuery(CALC_USER_SCORE, { variables: {
        userScoreInput: {
            userIds: allMembers.map(m => m.id),
            groupId,
            startTime: dateRange ? dateRange.toString() : (moment().startOf('month').unix() * 1000).toString(),
            endTime: "6900000000000" // august 26th, 2188
        }
    }})

    useEffect(() => {
        calcUserScoreQuery()
    }, [])

    useEffect(() => {
        calcUserScoreQuery()
    }, [ dateRange ])

    useEffect(() => {
        if(error) console.log(error)
        if(!chart && data !== null && data !== undefined) setChart(new D3Chart(chartRef.current, data.calcUserScore))
    }, [ data, chart ])

    useEffect(() => {
        if(chart !== null && chart !== undefined && data !== null && data !== undefined) {
            if(data.calcUserScore[0].score < 1) return // prevent chart from updating if there is no data to show
            chart.update(data.calcUserScore)
        }
    }, [ chart, data ])

    // && dateRange !== null && dateRange !== undefined

    return <div ref={ chartRef }></div>
}

export default ChartWrapper
