import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import PropTypes from 'prop-types'
import moment from 'moment'

import { CALC_USER_SCORE } from '../../graphql/tags/scoring'

const GroupMembers = ({ allMembers, groupId }) => {
    const [ memberData, setMemberData ] = useState([])
    const { data, error } = useQuery(CALC_USER_SCORE, { variables: {
        userScoreInput: {
            userIds: allMembers.map(m => m.id),
            groupId,
            startTime: (moment().startOf('month').unix() * 1000).toString(),
            endTime: (moment().endOf('month').unix() * 1000).toString()
        }
    }})

    useEffect(() => {
        if(data !== undefined && data !== null) {
            setMemberData(data.calcUserScore)
        }
    }, [data])

    if(memberData !== undefined && memberData !== null) {
        return (
            <ol>
                {memberData.map(member => {
                    return (
                        <li key={ member.userId } >{ allMembers.find(m => member.userId === m.id).name }, score: { member.score }</li>
                    )
                })}
            </ol>
        )
    }
    return (
        <ol>
            <li>No Member Data</li>
        </ol>
    )
}

GroupMembers.propTypes = {
    allMembers: PropTypes.array,
    groupId: PropTypes.string
}

export default GroupMembers

