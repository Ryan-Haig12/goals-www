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
    margin-top: 25px;

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
    color: #111;
    text-align: center;
    border: 1px solid red;

    position: absolute;
    top: 25%;
    left: 2%;
`

export const StyledMainGroupDiv = styled.div`
    border: 1px dashed red;
    position: relative;
`