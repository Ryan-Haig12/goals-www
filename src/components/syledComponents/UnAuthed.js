import styled from 'styled-components'

import * as Theme from './Theme'

export const PageHandler = styled.div`
    width: 100%;
    margin: auto;
`

export const StyledTextDiv = styled.div`
    position: relative;
    border: 1px solid black;
    text-align: center;
    background: ${ Theme.darkBlue };
    color: ${ Theme.yellow };
    transform: translate(-50%, -50%);
    left: 50%;
    font-size: 2vh;
    padding: 5px;
    margin-top: 100px;
    width: 80%;
`

export const StyledAuthButton = styled.button`
    padding: 15px 25px;
    font-size: 24px;
    text-align: center;
    cursor: pointer;
    outline: none;
    color: #fff;
    background-color: #DCAE1D;
    border: none;
    border-radius: 15px;
    box-shadow: 0 9px #999;

    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 5%;

    &:hover {
        opacity: 0.5;
        cursor: pointer;
    }

    &:active {
        background-color: #3e8e41;
        box-shadow: 0 5px #666;
        transform: translateY(4px);
    }
`