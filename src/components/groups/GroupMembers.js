import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import PropTypes from 'prop-types'
import moment from 'moment'

import { CALC_USER_SCORE } from '../../graphql/tags/scoring'
import { loadGroupScores } from '../../redux/actions/index'
import { StyledGroupMemberListItem } from '../syledComponents/Group'

const GroupMembers = ({ allMembers, groupId, loadGroupScores, groupScoring, playerScoresShouldBeFetched }) => {
    const { data, error, refetch } = useQuery(CALC_USER_SCORE, {
        fetchPolicy: 'no-cache',
        variables: {
            userScoreInput: {
                userIds: allMembers.map(m => m.id),
                groupId,
                startTime: (moment().startOf('month').unix() * 1000).toString(),
                endTime: (moment().endOf('month').unix() * 1000).toString()
            }
        }
    })

    if(error) console.log(error)

    // if user has logged a finished goal, update the score 
    useEffect(() => {
        if(playerScoresShouldBeFetched) refetch()
    }, [ playerScoresShouldBeFetched, refetch ])

    useEffect(() => {
        if(data !== undefined && data !== null) {
            //setMemberData(data.calcUserScore)
            loadGroupScores(data.calcUserScore)
        }
    }, [ data, loadGroupScores])

    if(groupScoring.length) {
        return (
            <ul style={{ listStyle: 'none', display: 'inline-block', margin: '0px auto', paddingInlineStart: '0px', width: '50%', fontSize: '2vh' }} >
                {groupScoring.map(member => {
                    const user = allMembers.find(m => member.userId === m.id)
                    if(!user || !user.name) return -1 // return -1 to remove warning from console

                    return (
                        <StyledGroupMemberListItem 
                            key={ member.userId }
                        >
                            { user.name }, score: { member.score }
                        </StyledGroupMemberListItem>
                    )
                })}
            </ul>
            
        )
    }
    return (
        <ol style={{ display: 'flex' }}>
            <StyledGroupMemberListItem>No Member Data</StyledGroupMemberListItem>
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
