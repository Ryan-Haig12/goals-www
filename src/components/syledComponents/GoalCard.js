import styled from 'styled-components'

export const StyledGoalCard = styled.div`
    border: 1px solid black;
    margin: 5px;
    width: 150px;
    height: 200px;
    text-align: center;
    align-self: center;
    background: ${ props => props.cardColor };
    box-shadow: 5px 10px 8px 10px #b5eeff;
`

export const AllGoalCards = styled.div`
    width: 100%;
    justify: center;
`