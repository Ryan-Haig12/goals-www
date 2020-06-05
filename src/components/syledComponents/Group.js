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

export const StyledGroupMembersDiv = styled.div`
    width: 70%;
    margin: 0 auto;
    margin-top: 25px;
    color: ${ Theme.yellow };
    background: ${ Theme.darkBlue };
    text-align: center;
    border-radius: 5px;

    @media(max-width: 650px) {
        width: 90%;
    }
`

export const StyledGroupInputButtonDuo = styled.div`
    display: block;
    margin: auto;
`

export const StyledGroupChatInputBar = styled.input`
    width: 100%;
    border: 1px solid black;
    background: ${ Theme.gray };
    color: ${ Theme.yellow };
    display: block;
    margin: 0px auto;

    position: relative;
    bottom: 3px;

    ::placeholder {
        color: ${ Theme.yellow };
        opacity: .5;
    }
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

export const StyledUserFinishedGoalsLog = styled.div`
    position: relative;
    margin: auto;
    width: 75%;
    height: 75%;

    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    line-height: 1.6;
    background-color: ${ Theme.darkBlue };
    color: ${ Theme.yellow };
    text-align: center;
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

    position: relative;
    margin: 5% auto;
`

export const StyledGroupMemberListItem = styled.li`
    background: ${ Theme.turquoise };
    border-radius: 5px;

    margin-left: auto;
    margin-right: auto;

    margin: 5px;
    width: 100%;
`