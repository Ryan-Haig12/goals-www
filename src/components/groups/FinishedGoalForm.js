import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'

import { ADD_FINISHED_GOAL } from '../../graphql/tags/finishedGoal'

const allGoalsTable = ( allGroupGoals ) => {
    
}

const FinishedGoalForm = (props) => {
    const [ CreateFinishedGoal, { data, error } ] = useMutation(ADD_FINISHED_GOAL)

    return (
        <div>
            <h2>Log Finished Goal</h2>
            <div>
                Table here where user can select goal to complete
            </div>
        </div>
    )
}

FinishedGoalForm.propTypes = {
    goalData: PropTypes.object
}

export default FinishedGoalForm
