import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { GET_DEFAULT_GOALS } from '../graphql/tags/goals'

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
    width: 100%;
    justify: center;
`

const StyledGoalList = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
`

const StyledCategoryHeader = styled.div`
    margin: 30px;
    margin-top: 50px;
    border-bottom: 1px solid black;
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
        return 0 // <- just to remove console
    })
    splitCategories[currentCategory] = currentCategoryList // <- be sure to add the last array to the object

    let sortedCardsAndHeaders = []
    for(let category in splitCategories) {
        // sort goals into alphabetical order by name of card inside of each category
        splitCategories[category].sort((a, b) => (a.title > b.title) ? 1 : -1)
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
        console.log('yeet', list)

        // grab the category from the first react component card in arrayOfGoals
        // reaching into a nested react component in a react component, neato
        const category = list[0].props.children.props.children[1].props.children
        return (
            <div key={ category } >
                <StyledCategoryHeader>{ category }</StyledCategoryHeader>
                <StyledGoalList key={ list[0].key }>{ list }</StyledGoalList>       
            </div>
        )
    })
}

const AllGoals = (props) => {

    const { data, loading, error } = useQuery(GET_DEFAULT_GOALS)
    const [ allRenderedGoals, setAllRenderedGoals ] = useState([])

    useEffect(() => {
        if(data !== undefined && data !== null) {
            setAllRenderedGoals(renderGoalCards(data.getAllGoals))
        }
    }, [ data ])

    if(error) {
        console.log(error)
    }
    
    if(!loading) {
        console.log(allRenderedGoals)
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

export default connect(null, {  })(AllGoals)
