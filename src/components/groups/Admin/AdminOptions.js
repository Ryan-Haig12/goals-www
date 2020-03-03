import React, { useState } from 'react'
import PropTypes from 'prop-types'

import AddUserToGroup from './AddUserToGroup'

const AdminOptions = ({ group }) => {

    const [ renderAdminOptions, setRenderAdminOptions ] = useState(false)

    // Admin options are not showing
    if(!renderAdminOptions) {
        return (
            <div>
                <button onClick={ () => setRenderAdminOptions(!renderAdminOptions) } >
                    Show Admin Options
                </button>
            </div>
        )
    }

    // Admin options are not showing
    if(renderAdminOptions) {
        return (
            <div>
                <button onClick={ () => setRenderAdminOptions(!renderAdminOptions) } >
                    Hide Admin Options
                </button>
                <AddUserToGroup group={ group } />
            </div>
        )
    }
}

AdminOptions.propTypes = {
    group: PropTypes.object
}

export default AdminOptions
