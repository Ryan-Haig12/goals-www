import styled from 'styled-components'

// the actual header
export const StyledHeader = styled.header`
    height: 60px;
    width: 100%;
    background: #CAE4DB;
    display: inline-block;
`

// styled header link, idk why I called it a chunk
export const StyledChunk = styled.button`
    background: #7A9D96;
    width: 150px;
    height: 50px;
    text-decoration: none;
    text-align: center;
    margin-right: 10px;
    margin-top: 5px;
    float: right;
`

export const StyledLogoutButton = styled.button`
    background: #d1311f;
    width: 150px;
    height: 50px;
    text-decoration: none;
    text-align: center;
    position: static;
    margin-right: 5px;
    margin-top: 5px;
    float: right;
`

export const StyledLogoText = styled.h1`
    float: left;
    font-family: Georgia;
`

export const StyledChunksGroup = styled.div`
    padding-right: 200px;
`