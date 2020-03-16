import React from 'react'

import { Header, Line } from '../syledComponents/PageHeaderSpan'

const PageHeaderSpan = ({ text }) => {
    return (
        <>
            <Header>{ text }</Header>
            <Line />
        </>
    )
}

export default PageHeaderSpan
