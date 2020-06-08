import React from 'react'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'

import { turquoise, yellow, darkBlue } from '../syledComponents/Theme'

const mapLastFiveGoals = ( lastFiveGoals ) => {
    let g = 0
    return lastFiveGoals.map(goal => {
        return (
            <div key={ goal.id + `_${ g++ }` } style={{ margin: '20px' }}>
                <Card style={{ width: '70%', display: 'inline-block', background: turquoise }} key={ goal.id + `_${ g++ }` } body>
                    { goal.title } : { goal.category }
                </Card>
            </div>
        )
    })
}

const ShowUserStats = ({ data }) => {
    const {
        lastFiveFinishedGoals,
        favoriteGoal,
        favoriteGoalCount,
        oneWeek,
        oneMonth,
        threeMonths,
        sixMonths,
        oneYear,
        allTime
    } = data

    const mapTimeLogsV2 = timeLogs => {
        let ret = []
        let k = 0
        for(const log in timeLogs) {
            // split all terms like 'oneWeek' into 'One Week'
            let splitTerms = log.split(/(?=[A-Z])/)
            splitTerms[0] = splitTerms[0].charAt(0).toUpperCase() + splitTerms[0].slice(1) + ' '
    
            ret.push((
                <tr key={ k++ } style={{ border: '1px solid black', background: turquoise, }} >
                    <td>{ splitTerms }</td>
                    <td>{ timeLogs[log].totalTimeLogged } minutes</td>
                    <td>{ timeLogs[log].totalPointsScored } points</td>
                </tr>
            ))
        }
        return ret
    }

    return (
        <div style={{ color: yellow, marginBottom: '15px' }}>
            <div style={{ border: '1px solid black', background: darkBlue, width: '80%', margin: 'auto', borderRadius: '5px' }} >
                <h3 style={{ margin: '30px', borderBottom: '3px solid black', width: '80%', display: 'inline-block' }}>Last 5 Goals Completed</h3>
                { mapLastFiveGoals(lastFiveFinishedGoals) }
            </div>
            <div style={{ border: '1px solid black', background: darkBlue, width: '80%', margin: 'auto', borderRadius: '5px', marginTop: '40px' }} >
                <h3 style={{ margin: '30px', borderBottom: '3px solid black', width: '80%', display: 'inline-block' }}>Favorite Goal</h3>
                <Card style={{ width: '70%', display: 'inline-block', background: turquoise, margin: '20px' }} body>{ favoriteGoal.title } : { favoriteGoal.category }, Logged { favoriteGoalCount } times</Card>
            </div>
            <div style={{ border: '1px solid black', background: darkBlue, width: '80%', margin: 'auto', borderRadius: '5px', marginTop: '40px' }}>
                <h3 style={{ margin: '30px', borderBottom: '3px solid black', width: '80%', display: 'inline-block' }} >Time Logs</h3>
                
                <Table style={{ color: yellow, background: turquoise, width: '80%', margin: 'auto', marginBottom: '15px' }}>
                    <thead style={{ border: '1px solid black' }} >
                        <tr>
                            <th>Time Frame</th>
                            <th>Total Time Logged</th>
                            <th>Total Points Scored</th>
                        </tr>
                    </thead>
                    <tbody>
                        { mapTimeLogsV2({ oneWeek, oneMonth, threeMonths, sixMonths, oneYear, allTime }) }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default ShowUserStats
