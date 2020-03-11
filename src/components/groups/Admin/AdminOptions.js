import React, { useState } from 'react'

import AddUserToGroup from './AddUserToGroup'
import CreateCustomGoal from './CreateCustomGoal'

const AdminOptions = ({ match }) => {

    return (
        <div>
            <h3>Admin Options</h3>
            <AddUserToGroup match={ match } />
            <CreateCustomGoal match={ match } />
        </div>
    )
}

export default AdminOptions
