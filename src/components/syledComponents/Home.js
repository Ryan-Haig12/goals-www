import styled from 'styled-components'

import * as Theme from './Theme'

export const StyledHomePage = styled.div`
    text-align: center;
`

export const StyledGroupCards = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
    font-size: 3vh;
    color: ${ Theme.yellow };

    @media(max-width: 800px) {
        grid-template-columns: repeat(1, 1fr);
    }
`