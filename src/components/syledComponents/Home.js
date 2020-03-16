import styled from 'styled-components'

export const StyledHomePage = styled.div`
    text-align: center;
`

export const StyledGroupCards = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`

export const HomeHeader = styled.h1`
    color: #b48608;
    font-family: 'Droid serif', serif;
    font-size: 36px;
    font-weight: 400;
    font-style: italic;
    line-height: 44px;
    margin: 0 0 12px;
    text-align: center;
`

export const HomeSpan = styled.span`
    color: #b48608;
    text-decoration: none;
    font-style: italic;
    font-size: 13px;
    text-align: center;
    padding: 2px 5px;
    background: #b48608;
    width: 75%;
    margin: 0 auto;
    display:block;
    position: relative;
    top: -10px;
    font-family: "Droid serif", serif; 
`