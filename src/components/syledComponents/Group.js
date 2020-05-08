import styled from 'styled-components'

import * as Theme from './Theme'

export const GroupCard = styled.div`
    border: 1px solid black;
    margin: 40px;
    padding: 10px;
    width: 60%;
    height: 80%;
    border-radius: 5px;
    background: ${ Theme.darkBlue };
`

export const GoToAdminButton = styled.button`
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

    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: 5%;

    &:hover {
        opacity: 0.5;
        cursor: pointer;
    }

    &:active {
        background-color: #3e8e41;
        box-shadow: 0 5px #666;
    }
`

export const StyledFinishedGoalReportButton = styled.button`
    padding: 15px 25px;
    text-align: center;
    cursor: pointer;
    outline: none;
    color: #fff;
    background-color: #DCAE1D;
    border: none;
    border-radius: 5px;
    box-shadow: 0 9px #999;

    position: relative;
    top: 50%;
    left: 40%;
    transform: translate(-50%, -50%);
    margin-top: 25px;

    &:hover {
        opacity: 0.5;
        cursor: pointer;
    }

    &:active {
        background-color: #3e8e41;
        box-shadow: 0 5px #666;
    }
`

export const StyledGroupMembersDiv = styled.div`
    width: 25%;
    margin: 0 auto;
    color: #b48608;
    text-align: center
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
    color: #111;
    text-align: center;

    position: absolute;
    top: 25%;
    left: 2%;
`

export const StyledMainGroupDiv = styled.div`
    position: relative;
`

export const StyledGroupInputButtonDuo = styled.div`
    display: block;
    margin: auto;
`

export const StyledGroupChatInputBar = styled.input`
    border-radius: 5px;
    width: 70%;
    border: 1px solid black;
    position: relative !important;
    top: 15px;
    left: 5px;
    width: 97%;
`

export const StyledGroupChatButton = styled.button`
    text-align: center;
    cursor: pointer;
    outline: none;
    color: #7A9D96;
    background-color: #DCAE1D;
    height: 30px;
    float: left;

    &:hover {
        opacity: 0.5;
        cursor: pointer;
    }

    &:active {
        background-color: #3e8e41;
        box-shadow: 0 5px #666;
    }
`

export const StyledPowerRankings = styled.div`
    width: 33%;

    position: absolute;
    top: 110%;
    left: 2%;
    float: left;

    background: #7A9D96;
`

export const StyledUserFinishedGoalsLog = styled.div`
    width: 75%;
    top: 20%;
    text-align: center;
    margin: 0 auto;
    position: relative;
    background: #7A9D96;
`

export const StyledUserListAdminPage = styled.div`
    text-align: center;
    width: 600px;
    background-image: linear-gradient(
        to top, 
        #a3b591, #e4ffc9
    );
    position: relative;
    margin: 5% auto;
`

export const StyledUserListUserCard = styled.div`
    padding: 5px;
    margin: 5px;
`

export const StyledGoalsListAdminPage = styled.div`
    text-align: center;
    width: 600px;
    background-image: linear-gradient(
        to top, 
        #a3b591, #e4ffc9
    );
    position: relative;
    margin: 5% auto;
`

export const StyledGoalsListGoalCard = styled.div`
    padding: 5px;
    margin: 5px;
`