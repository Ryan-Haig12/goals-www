import React from 'react'
import { connect } from 'react-redux'

import { onGoalSelectedHandlerAction } from '../../redux/actions/index'

// render portion of table for default goals
const defaultGoalsTable = ( defaultGoals, onGoalSelectedHandlerAction ) => {
    return defaultGoals.map(category => {
        return category.goals.map(goal => {
            return (
                <tr key={ goal.id } onClick={ () => onGoalSelectedHandlerAction(goal) } >
                    <td>{goal.category}</td>
                    <td>{goal.title}</td>
                    <td>{goal.points}</td>
                </tr>
            )
        })
    })
}

// render portion of table for custom goals
const customGoalsTable = ( customGoalsAllGroups, groupId, onGoalSelectedHandlerAction ) => {
    const group = customGoalsAllGroups.filter(group => group.groupId === groupId)[0]
    const customGoals = group.customGoals
    
    if(!customGoals.length) return <tr><td>No Custom Goals</td></tr>

    return customGoals.map(goal => {
        return (
            <tr key={ goal.id } onClick={ () => onGoalSelectedHandlerAction(goal) } >
                <td>{goal.category}</td>
                <td>{goal.title}</td>
                <td>{goal.points}</td>
            </tr>
        )
    })
}

const GroupGoalsTable = ({ defaultGoals, customGoalsAllGroups, groupData, onGoalSelectedHandlerAction }) => {
    const { userId, groupId } = groupData

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Title</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    { defaultGoalsTable(defaultGoals, onGoalSelectedHandlerAction) }
                    { customGoalsTable(customGoalsAllGroups, groupId, onGoalSelectedHandlerAction) }
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = ( state ) => {
    return {
        defaultGoals: state.Goals.defaultGoals,
        customGoalsAllGroups: state.Goals.customGoals
    }
}

export default connect(mapStateToProps, { onGoalSelectedHandlerAction })(GroupGoalsTable)