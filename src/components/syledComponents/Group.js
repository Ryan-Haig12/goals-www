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

export const GroupHeader = styled.h1`
    color: #b48608;
    font-family: 'Droid serif', serif;
    font-size: 36px;
    font-weight: 400;
    font-style: italic;
    line-height: 44px;
    margin: 0 0 12px;
    text-align: center;
`

export const GroupSpan = styled.span`
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

export const StyledGroupMembersDiv = styled.div`
    border: 1px solid red;
    width: 25%;
    margin: 0 auto;
    color: #b48608;
`

export const StyledFinishedGoalForm = styled.div`
    width: 33%;
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
    border: 1px solid red;

    float: left;
    position: relative;
    bottom: 375px;
    left: 2%;
`

export const StyledMainGroupDiv = styled.div`
    border: 1px solid red;
    display: block;
`