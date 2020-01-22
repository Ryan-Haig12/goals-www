import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
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
    })
    splitCategories[currentCategory] = currentCategoryList // <- be sure to add the last array to the object

    let sortedCardsAndHeaders = []
    for(let category in splitCategories) {
        //sortedCardsAndHeaders.push(<h2>{ category }</h2>)
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

    // return allGoals.map(goal => {

    //     const ptsMessage = goal.points > 1 ? 'points' : 'point'
    //     return (
    //         <StyledGoalCard cardColor={ categoryColors[goal.category] } key={ goal.id } >
    //             <h4>{ goal.title} ({ goal.points } { ptsMessage })</h4>
    //             <h4>{ goal.category }</h4>
    //         </StyledGoalCard>
    //     )
    // })
}

const AllGoals = (props) => {

    const { data, loading, error } = useQuery(GET_ALL_GOALS)
    
    if(!loading) {
        
        return (
            <AllGoalCards>
                { renderGoalCards(data.getAllGoals) }
            </AllGoalCards>
        )
    }
    return (
        <p>Loading All Goals...</p>
    )
}

AllGoals.propTypes = {

}

export default AllGoals
