import React, { useState } from 'react'
import PropTypes from 'prop-types'

import AddUserToGroup from './AddUserToGroup'

const AdminOptions = ({ match, group }) => {
    console.log(match)

    return (
        <div>
            <AddUserToGroup match={ match } />
        </div>
    )
}

AdminOptions.propTypes = {
    group: PropTypes.object
}

export default AdminOptions
