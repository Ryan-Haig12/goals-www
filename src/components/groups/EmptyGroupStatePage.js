import React from 'react'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'

import * as Theme from '../syledComponents/Theme'

const EmptyGroupStatePage = () => {
    return (
        <Jumbotron style={{ top: '100px', position: 'relative', width: '80%', margin: 'auto', color: Theme.yellow, background: Theme.darkBlue }}>
            <h1 style={{ width: '90%', margin: 'auto' }} >You are not a member of any groups yet!</h1>
            <p style={{ margin: '25px', fontSize: '3vh' }} >Ask your group leader to add you using the admin options or create your own group!</p>
            <Button 
                variant="warning"
                size="lg"
                onClick={ () => console.log('ddd') }
            >Create new Group!</Button>
        </Jumbotron>
    )
}

export default EmptyGroupStatePage
