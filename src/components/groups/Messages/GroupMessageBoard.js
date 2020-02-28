import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { GET_ALL_GROUP_MESSAGE } from '../../../graphql/tags/groupMessages'
import { getAllGroupMessages } from '../../../redux/actions/index'

const GroupMessageBoard = ({ groupData, getAllGroupMessages }) => {
    const { userId, groupId } = groupData
    const { data, loading, error } = useQuery(GET_ALL_GROUP_MESSAGE, {
        variables: { groupId }
    })

    if(error) console.log(error)

    useEffect(() => {
        if(data !== undefined && data !== null) {
            getAllGroupMessages(data.getGroupMessages)
        }
    }, [ data, getAllGroupMessages ])

    return (
        <div>
            The group messages and input bar will go here
        </div>
    )
}

GroupMessageBoard.propTypes = {
    groupData: PropTypes.object
}

export default connect(null, { getAllGroupMessages })(GroupMessageBoard)