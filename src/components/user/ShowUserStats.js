import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import { turquoise, yellow } from '../syledComponents/Theme'

const mapLastFiveGoals = ( lastFiveGoals ) => {
    let g = 0
    return lastFiveGoals.map(goal => {
        return (
            <div style={{ margin: '20px' }}>
                <Card style={{ width: '33%', display: 'inline-block', background: turquoise }} key={ goal.id + `_${ g++ }` } body>
                    { goal.title } : { goal.category }
                </Card>
            </div>
        )
    })
}

const mapTimeLogs = ( timeLogs ) => {
    let ret = []
    let k = 0
    for(const log in timeLogs) {
        // split all terms like 'oneWeek' into 'One Week'
        let splitTerms = log.split(/(?=[A-Z])/)
        splitTerms[0] = splitTerms[0].charAt(0).toUpperCase() + splitTerms[0].slice(1) + ' '

        ret.push((
            <Col key={ k++ } style={{ border: '1px solid black', background: turquoise, display: 'inline-block' }} >
                <div>
                    <p>{ splitTerms }</p>
                    <p>Total Time Logged: { timeLogs[log].totalTimeLogged }</p>
                    <p>Total Points Scored: { timeLogs[log].totalPointsScored }</p>
                </div>
            </Col>
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
        oneYear,
        allTime
    } = data

    return (
        <div style={{ color: yellow }}>
            <div>
                <h3 style={{ margin: '30px', borderBottom: '3px solid black', width: '80%', display: 'inline-block' }}>Last 5 Goals Completed</h3>
                { mapLastFiveGoals(lastFiveFinishedGoals) }
            </div>
            <div>
                <h3 style={{ margin: '30px', borderBottom: '3px solid black', width: '80%', display: 'inline-block' }}>Favorite Goal</h3>
                <Card style={{ width: '33%', display: 'inline-block', background: turquoise }} body>{ favoriteGoal.title } : { favoriteGoal.category }</Card>
            </div>
            <div>
                <h3 style={{ margin: '50px', borderBottom: '3px solid black', width: '80%', display: 'inline-block' }} >Time Logs</h3>
                <Container>
                    <Row style={{ marginBottom: '50px' }}>{ mapTimeLogs({ oneWeek, oneMonth, threeMonths }) }</Row>
                    <Row>{ mapTimeLogs({ sixMonths, oneYear, allTime }) }</Row>
                </Container>
            </div>
        </div>
    )
}

export default ShowUserStats

