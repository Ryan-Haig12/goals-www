import React, { useEffect, useRef, useState } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import D3Chart from './D3Chart'

import { CALC_USER_SCORE } from '../../../../graphql/tags/scoring'
import { StyledChartBody } from '../../../syledComponents/d3Chart'

const ChartWrapper = ({ groupId, allMembers }) => {
    const chartRef = useRef(null)
    const [ chart, setChart ] = useState(null)
    const [ calcUserScoreQuery, { data, error } ] = useLazyQuery(CALC_USER_SCORE, { variables: {
        userScoreInput: {
            userIds: allMembers.map(m => m.id),
            groupId,
            startTime: "0",
            endTime: "158707482243799"
        }
    }})

    useEffect(() => {
        calcUserScoreQuery()
    }, [])

    useEffect(() => {
        if(error) console.log(error)
        if(!chart && data !== null && data !== undefined) setChart(new D3Chart(chartRef.current, data.calcUserScore))
    }, [ data, chart ])

    useEffect(() => {
        if(chart !== null && chart !== undefined) {
            chart.update()
        }
    }, [ chart ])

    return <StyledChartBody ref={ chartRef }></StyledChartBody>
}

export default ChartWrapper
