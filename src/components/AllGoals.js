import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'

import { GET_ALL_GOALS } from '../graphql/tags/goals'

const StyledGoalCard = styled.div`
    border: 1px solid black;
    margin: 5px;
    width: 150px;
    height: 200px;
    text-align: center;
    align-self: center;
    background: ${ props => props.cardColor };
    box-shadow: 5px 10px 8px 10px #b5eeff;
`

const AllGoalCards = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    width: 100%;
    justify: center;
`

const StyledGoalList = styled.div`
    
`

const renderGoalCards = ( allGoals ) => {
    const categoryColors = { 
        Physical: 'green', 
        Mental: 'blue', 
        Nutrition: 'red',
        Spiritual: 'yellow',
        Emotional: 'purple'
    }

    // sort goals into alphabetical order by category
    allGoals.sort((a, b) => (a.category > b.category) ? 1 : -1)

    // seperate allGoals into new arrays by category
    let currentCategory = allGoals[0].category
    let currentCategoryList = []
    const splitCategories = {}
    allGoals.map(goal => {
        if(goal.category !== currentCategory) {
            splitCategories[currentCategory] = currentCategoryList
            currentCategory = goal.category
            currentCategoryList = []
        }
        currentCategoryList.push(goal)
        return 0 // <- just to remove console error
    })
    splitCategories[currentCategory] = currentCategoryList // <- be sure to add the last array to the object

    let sortedCardsAndHeaders = []
    for(let category in splitCategories) {
        sortedCardsAndHeaders.push(splitCategories[category].map(goal => {
            const ptsMessage = goal.points > 1 ? 'points' : 'point'
            
            return (
                <div key={ goal.id }>
                    <StyledGoalCard cardColor={ categoryColors[goal.category] } >
                        <h4>{ goal.title} ({ goal.points } { ptsMessage })</h4>
                        <h4>{ goal.category }</h4>
                    </StyledGoalCard>
                </div>
            )
        }))
    }

    return sortedCardsAndHeaders
}

// returns array of different goals in a set, i really don't know what to call this so.....
const createGoalList = ( arrayOfGoals ) => {
    return arrayOfGoals.map(list => {
        // grab the category from the first react component card in arrayOfGoals
        // reaching into a nested react component in a react component, neato
        const category = list[0].props.children.props.children[1].props.children
        return (
            <StyledGoalList>
                <h2>{ category }</h2>
                { list }
            </StyledGoalList>
        )
    })
}

const AllGoals = (props) => {

    const { data, loading, error } = useQuery(GET_ALL_GOALS)
    const [ allRenderedGoals, setAllRenderedGoals ] = useState([])

    useEffect(() => {
        if(data !== undefined && data !== null) {
            setAllRenderedGoals(renderGoalCards(data.getAllGoals))
        }
        return
    }, [ data ])

    if(error) {
        console.log(error)
    }
    
    if(!loading) {
        return (
            <AllGoalCards>
                { createGoalList(allRenderedGoals) }
            </AllGoalCards>
        )
    }
    return (
        <p>Loading All Goals...</p>
    )
}
export default AllGoals
