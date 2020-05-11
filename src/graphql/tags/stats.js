import gql from 'graphql-tag'

export const CALC_USER_STAT = gql`
    query CalcUserStat($userId: ID!) {
        calcUserStat(userId: $userId) {
            lastFiveFinishedGoals {
                id
                title
                points
                category
                errors
            }
            totalGoalsCompleted
            totalTimeLogged
            totalPointsScored
            favoriteGoal {
                id
                title
                points
                category
                errors
            }
            oneWeek {
                totalTimeLogged
                totalPointsScored
            }
            oneMonth {
                totalTimeLogged
                totalPointsScored
            }
            threeMonths {
                totalTimeLogged
                totalPointsScored
            }
            sixMonths {
                totalTimeLogged
                totalPointsScored
            }
            oneYear {
                totalTimeLogged
                totalPointsScored
            }
            allTime {
                totalTimeLogged
                totalPointsScored
            }
            errors
        }
    }
`