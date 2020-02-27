import React from 'react'
import { connect } from 'react-redux'

// handler for when a goal is clicked
// fires off 
const goalOnClickHandler = ( goal ) => {
    console.log('clickedfddfdf', goal.id)
    return <p>test</p>
}

// render portion of table for default goals
const defaultGoalsTable = ( defaultGoals ) => {
    return defaultGoals.map(goal => {
        return (
            <tr key={ goal.id } onClick={ () => goalOnClickHandler(goal) } >
                <td>{goal.category}</td>
                <td>{goal.title}</td>
                <td>{goal.points}</td>
            </tr>
        )
    })
}

// render portion of table for custom goals
const customGoalsTable = ( customGoalsAllGroups, groupId ) => {
    const group = customGoalsAllGroups.filter(group => group.groupId === groupId)[0]
    const customGoals = group.customGoals
    
    if(!customGoals.length) return <tr><td>No Custom Goals</td></tr>

    return customGoals.map(goal => {
        return (
            <tr key={ goal.id } onClick={ () => goalOnClickHandler(goal) } >
                <td>{goal.category}</td>
                <td>{goal.title}</td>
                <td>{goal.points}</td>
            </tr>
        )
    })
}

const GroupGoalsTable = ({ defaultGoals, customGoalsAllGroups, groupData }) => {
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
                    { defaultGoalsTable(defaultGoals) }
                    { customGoalsTable(customGoalsAllGroups, groupId) }
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

export default connect(mapStateToProps)(GroupGoalsTable)