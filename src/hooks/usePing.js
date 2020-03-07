import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'

import { PING } from '../graphql/tags/misc'

function usePing( initialState = '' ) {
    const [ data, setData ] = useState(initialState)
    const { data: pingData } = useQuery(PING)

    useEffect(() => {
        if(pingData !== undefined && pingData !== null) {
            setData(pingData)
        }
    }, [ pingData ])

    return [ data ]
}

export default usePing