import styled from 'styled-components'

export const StyledTextDiv = styled.div`
    border: 10px solid black;
    text-align: center;
    background: #7A9D96;
    padding: 5px;
    width: 400px;
    margin: auto;
`

export const StyledAuthDiv = styled.div`

`

export const StyledUnauthedPage = styled.div`
    width: 75%;
    margin: auto;
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