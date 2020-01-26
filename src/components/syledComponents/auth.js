import styled from 'styled-components'

export const StyledForm = styled.div`
    position: relative;
    margin: 5% auto;
    width: 600px;
    height: 75%;
    background-image: linear-gradient(
        to top, 
        #a3b591, #e4ffc9
    );
    border-radius: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    color: #111;
    text-align: center;
`

export const StyledInputBar = styled.input`
    display: block;
    box-sizing: border-box;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    padding: 4px;
    width: 220px;
    height: 32px;
    border: none;
    border-bottom: 1px solid #AAA;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 15px;
    transition: 0.2s ease;
    color: #444;
    font-size: 1.5em;
    outline: none; 
    box-shadow: none; 
    -webkit-appearance: none; 
    border-radius: 0;
    border-top: none;
    border-bottom: solid 1px;
    border-color: #bbb;
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