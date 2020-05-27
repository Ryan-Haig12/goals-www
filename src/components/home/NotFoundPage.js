import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const NotFoundPage = () => {
    const [ sendHome, setSendHome ] = useState(false)

    if (sendHome) return <Redirect to="/" />

    return (
        <div style={{ margin: 'auto', position: 'relative', left: '50%' }} >
            <h1 style={{ color: 'white' }} >Page Not Found</h1>
            <Button 
                id="toHome"
                onClick={ setSendHome(true) }
            >Go Home</Button>
        </div>
    )
}

export default NotFoundPage
