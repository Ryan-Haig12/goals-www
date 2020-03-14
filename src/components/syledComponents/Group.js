import styled from 'styled-components'

export const GroupCard = styled.div`
    border: 1px solid black;
    margin: 25px;
    padding: 5px;
    width: 350px;
    height: 210px;
    background: #7A9D96;
`

export const GoToGroupButton = styled.button`
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