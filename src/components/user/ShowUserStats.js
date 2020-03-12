import React from 'react'

const mapLastFiveGoals = ( lastFiveGoals ) => {
    let g = 0
    return lastFiveGoals.map(goal => {
        return (
            <div key={ goal.id + `_${ g++ }` } >
                <p>{ goal.title } : { goal.category }</p>
            </div>
        )
    })
}

const mapTimeLogs = ( timeLogs ) => {
    let ret = []
    let k = 0
    for(const log in timeLogs) {
        ret.push((
            <div key={ k++ } >
                <p>{ log }</p>
                <p>Total Time Logged { timeLogs[log].totalTimeLogged }</p>
                <p>Total Points Scored { timeLogs[log].totalPointsScored }</p>
            </div>
        ))
    }
    return ret
}

const ShowUserStats = ({ data }) => {
    const {
        lastFiveFinishedGoals,
        favoriteGoal,
        oneWeek,
        oneMonth,
        threeMonths,
        sixMonths,
        oneYear
    } = data

    return (
        <>
            <div>
                <h3>Last 5 Goals Completed</h3>
                { mapLastFiveGoals(lastFiveFinishedGoals) }
            </div>
            <div>
                <h3>Favorite Goal</h3>
                <p>{ favoriteGoal.title } : { favoriteGoal.category }</p>
            </div>
            <div>
                <h3>Time Logs</h3>
                { mapTimeLogs({ oneWeek, oneMonth, threeMonths, sixMonths, oneYear }) }
            </div>
        </>
    )
}

export default ShowUserStats

