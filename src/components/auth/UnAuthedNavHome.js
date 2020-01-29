import React from 'react'
import { useHistory } from 'react-router-dom'

const UnAuthedNavHome = () => {
    const history = useHistory()
    return (
        <div>
            <p>You need to be signed in to view this page</p>
            <button onClick={ () => history.push('/') } >Click to Create new account</button>
        </div>
    )
}

export default UnAuthedNavHome

