import styled from 'styled-components'

import * as Theme from './Theme'

export const StyledForm = styled.div`
    position: relative;
    margin: 5% auto;
    width: 600px;
    height: 75%;

    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    line-height: 1.6;
    background-color: ${ Theme.darkBlue };
    color: ${ Theme.yellow };
    text-align: center;

    @media(max-width: 650px) {
        width: 90%;
    }
`

export const StyledInputBar = styled.input`
    display: block;
    color: ${ Theme.yellow };
    box-sizing: border-box;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    padding: 4px;
    width: 220px;
    height: 32px;
    border: none;
    border-bottom: 1px solid ${ Theme.yellow };
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    transition: 0.2s ease;
    font-size: 1.5em;
    outline: none; 
    box-shadow: none; 
    -webkit-appearance: none; 
    border-radius: 0;
    border-top: none;
    border-bottom: solid 1px;
    border-color: ${ Theme.yellow };
    background: transparent;
    display: flex;
    height: 2em;
    width: 12em;
    margin-bottom: 5%;
    padding: 0 3%;
    z-index: 0;
    -webkit-transition: border .25s;
    -moz-transition: border .25s;
    -o-transition: border .25s;
    transition: border .25s;

    ::placeholder {
        color: ${ Theme.yellow };
    }

    @media(max-width: 600px) {
        width: 90%;
    }
`

export const StyledButton = styled.button`
    outline: none;
    -webkit-appearance: none;
    border: none;
    background: transparent;
    color: #000000;
    font-size: 2.05em;
    cursor: pointer;
    bottom: 0%;
`

export const StyledErrorMessage = styled.p`
    color: red;
`

export const StyledSelectBar = styled.select`
    width: 80%;
    height: 35px;
    background: ${ Theme.turquoise };
    color: ${ Theme.yellow };
    font-size: 3vh;
    border: none;
    margin: 10px;
    text-align-last:center;

    option {
        color: black;
        background: white;
        display: flex;
        white-space: pre;
        min-height: 20px;
        padding: 0px 2px 1px;
    }
`