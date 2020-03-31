import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useLazyQuery } from '@apollo/react-hooks'

import { GET_FINISHED_GOALS } from '../../../graphql/tags/finishedGoal'

const FinishedGoalLanding = ({ match }) => {
    const [ getFinishedGoalsQuery, { data, error } ] = useLazyQuery(GET_FINISHED_GOALS, { variables: { GetFinishedGoalsData: { groupId: match.params.groupId } } })
    const [ finishedGoals, setFinishedGoals ] = useState()
    const history = useHistory()

    useEffect(() => {
        getFinishedGoalsQuery()
    }, [])

    useEffect(() => {
        if(data !== undefined && data !== null) {
            console.log(data)
        }
    }, [ data ])
    
    return (
        <div>
            <button onClick={() => {
                const link = `/group/${ match.params.groupId }`
                history.push(link)
            }} >Go To Group Page</button>


        </div>
    )
}

export default FinishedGoalLanding