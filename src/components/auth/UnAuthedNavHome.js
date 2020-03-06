import React from 'react'
//import { useQuery } from '@apollo/react-hooks'
import { useHistory, Redirect } from 'react-router-dom'

//import { LOGIN_USER } from '../../graphql/tags/user'

const UnAuthedNavHome = () => {
    //const { data, loading, error } = useQuery(LOGIN_USER)
    const history = useHistory()

    //if(error) console.log(error)

    // const token = localStorage.getItem('token')
    // console.log(token)
    // if(token && data !== undefined && data !== null) {
    //     console.log(data)
    //     //return <Redirect to="/" />
    // }

    return <Redirect to="/" />
}

export default UnAuthedNavHome

