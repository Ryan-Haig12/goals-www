import React from 'react'
import styled from 'styled-components'

const Header = styled.h1`
    color: #b48608;
    font-family: 'Droid serif', serif;
    font-size: 36px;
    font-weight: 400;
    font-style: italic;
    line-height: 44px;
    text-align: center;

    border-bottom: 5px solid #b48608;
    width: 75%;
    margin: auto;
`

const PageHeaderSpan = ({ text }) => {
    return (
        <div>
            <Header>{ text }</Header>
        </div>
    )
}

export default PageHeaderSpan
