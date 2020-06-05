import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import { UPDATE_CUSTOM_GOAL } from '../../../graphql/tags/customGoal'
import { StyledForm } from '../../syledComponents/auth'
import * as Theme from '../../syledComponents/Theme'

const EditCustomGoals = ({ customGoals }) => {
    const [ UpdateCustomGoalQuery ] = useMutation(UPDATE_CUSTOM_GOAL)

    const mapCustomGoals = () => {
        return customGoals.map(goal => {
            const buttonText = goal.enabled ? 'Disable' : 'Enable'
            return (
                <tr key={ goal.id } style={{ color: `${ Theme.yellow }` }} >
                    <td>{ goal.category }</td>
                    <td>{ goal.title } </td>
                    <td>{ goal.points }</td>
                    <td
                        id="editCustomGoal"
                        onClick={ async () => {
                            await UpdateCustomGoalQuery({ variables: {
                                customGoalData: {
                                    enabled: !goal.enabled,
                                    customGoalId: goal.id
                                }
                            }})
                        }}
                    ><Button variant="warning" >{ buttonText }</Button></td>
                </tr>
            )
        })
    }

    return (
        <StyledForm>
            <h3 style={{ margin: '5%' }}>All Custom Goals</h3>
            <Table>
                <thead style={{ color: `${ Theme.yellow }` }} >
                    <tr>
                        <th>Category</th>
                        <th>Title</th>
                        <th>Points</th>
                        <th>Enable/Disable</th>
                    </tr>
                </thead>
                <tbody>
                    { customGoals.length && mapCustomGoals() }
                </tbody>
            </Table>
        </StyledForm>
    )
}

export default EditCustomGoals
 