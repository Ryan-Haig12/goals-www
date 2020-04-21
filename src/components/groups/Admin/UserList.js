import React from 'react'
import { useMutation } from '@apollo/react-hooks'

import { REMOVE_USERS_FROM_GROUP } from '../../../graphql/tags/goals'
import { StyledUserListAdminPage, StyledUserListUserCard } from '../../syledComponents/Group'

const UserList = ({ allMembers, groupId, groupCreator }) => {
    const [ RemoveUserQuery ] = useMutation(REMOVE_USERS_FROM_GROUP)

    const mapUserCards = () => {
        return allMembers.map(member => {
            // if user is admin, don't render a user card
            if(member.id === groupCreator) return 0
    
            return (
                <StyledUserListUserCard key={ member.id } >
                    <p>{ member.name }</p>
                    <button onClick={ async () => {
                        // delete user
                        await RemoveUserQuery({ variables: {
                            data: {
                                groupId,
                                userIds: [ member.id ]
                            }
                        }})
                        allMembers.splice(allMembers.indexOf(member.id), 1)
                    }}>Remove User From Group</button>
                </StyledUserListUserCard>
            )
        })
    }

    return (
        <StyledUserListAdminPage>
            { allMembers && mapUserCards() }
        </StyledUserListAdminPage>
    )
}

export default UserList
