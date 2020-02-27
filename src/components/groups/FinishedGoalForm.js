import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'

import { ADD_FINISHED_GOAL } from '../../graphql/tags/finishedGoal'


const FinishedGoalForm = ({ groupData }) => {
    const [ CreateFinishedGoal, { data, error } ] = useMutation(ADD_FINISHED_GOAL)
    const { userId, groupId } = groupData

    return (
        <div>
            <h2>Log Finished Goal</h2>
        </div>
    )
}

FinishedGoalForm.propTypes = {
    goalData: PropTypes.object
}

export default connect()(FinishedGoalForm)
