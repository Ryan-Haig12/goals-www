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
    }
`

export const StyledGroupMembersDiv = styled.div`
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

    position: absolute;
    top: 25%;
    left: 2%;
`

export const StyledMainGroupDiv = styled.div`
    position: relative;
`

export const StyledGroupChat = styled.div`
    width: 33%;

    position: absolute;
    top: 25%;
    right: 2%;
    float: right;

    background: #7A9D96;
`

export const StyledGroupInputButtonDuo = styled.div`
    display: block;
    margin: auto;
`

export const StyledGroupChatInputBar = styled.input`
    border-radius: 25px;
    width: 99%;
    height: 25px;
    float: right;
`

export const StyledGroupChatButton = styled.button`
    text-align: center;
    cursor: pointer;
    outline: none;
    color: #fff;
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