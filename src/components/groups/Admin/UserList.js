import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import { REMOVE_USERS_FROM_GROUP } from '../../../graphql/tags/goals'
import { StyledForm } from '../../syledComponents/auth'
import * as Theme from '../../syledComponents/Theme'

const UserList = ({ allMembers, groupId, groupCreator }) => {
    const [ RemoveUserQuery ] = useMutation(REMOVE_USERS_FROM_GROUP)

    const mapUserCards = () => {
        return allMembers.map(member => {
            // if user is admin, don't render a user card
            if(member.id === groupCreator) return undefined
    
            return (
                <tr key={ member.id } style={{ color: `${ Theme.yellow }` }} >
                    <td>{ member.name }</td>
                    <td><Button 
                        id="userList"
                        variant="warning"
                        onClick={ async () => {
                            // delete user
                            await RemoveUserQuery({ variables: {
                                data: {
                                    groupId,
                                    userIds: [ member.id ]
                                }
                        }})
                        allMembers.splice(allMembers.indexOf(member.id), 1)
                    }}>Remove</Button></td>
                </tr>
            )
        })
    }

    return (
        <StyledForm>
            <h3 style={{ margin: '5%' }}>Remove Users from Group</h3>
            <Table>
                <tbody>
                    { allMembers && mapUserCards() }
                </tbody>
            </Table>
        </StyledForm>
    )
}

export default UserList
