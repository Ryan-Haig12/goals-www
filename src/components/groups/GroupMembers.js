import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import PropTypes from 'prop-types'
import moment from 'moment'

import { CALC_USER_SCORE } from '../../graphql/tags/scoring'
import { loadGroupScores } from '../../redux/actions/index'

const GroupMembers = ({ allMembers, groupId, loadGroupScores, groupScoring }) => {
    const { data, error } = useQuery(CALC_USER_SCORE, { variables: {
        userScoreInput: {
            userIds: allMembers.map(m => m.id),
            groupId,
            startTime: (moment().startOf('month').unix() * 1000).toString(),
            endTime: (moment().endOf('month').unix() * 1000).toString()
        }
    }})

    if(error) console.log(error)

    useEffect(() => {
        if(data !== undefined && data !== null) {
            //setMemberData(data.calcUserScore)
            loadGroupScores(data.calcUserScore)
        }
    }, [ data, loadGroupScores])

    if(groupScoring.length) {
        return (
            <ol>
                {groupScoring.map(member => {
                    const user = allMembers.find(m => member.userId === m.id)
                    if(!user || !user.name) return -1 // return -1 to remove warning from console

                    return (
                        <li key={ member.userId } >{ user.name }, score: { member.score }</li>
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

const mapStateToProps = ( state ) => {
    return {
        groupScoring: state.Group.membersScoring
    }
}

export default connect(mapStateToProps, { loadGroupScores })(GroupMembers)
