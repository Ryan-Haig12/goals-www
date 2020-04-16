import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'

import { UPDATE_CUSTOM_GOAL } from '../../../graphql/tags/customGoal'
import { StyledGoalsListAdminPage, StyledGoalsListGoalCard } from '../../syledComponents/Group'

const EditCustomGoals = ({ customGoals, groupId }) => {
    const [ UpdateCustomGoalQuery, { data } ] = useMutation(UPDATE_CUSTOM_GOAL)

    const mapCustomGoals = () => {
        return customGoals.map(goal => {
            const buttonText = goal.enabled ? 'Disable' : 'Enable'
            return (
                <StyledGoalsListGoalCard key={ goal.id } >
                    <p>Category: { goal.category }</p>
                    <p>Title: { goal.title } </p>
                    <p>Points: { goal.points }</p>
                    <p>This goal is currently { goal.enabled ? 'Enabled' : 'Disabled' }</p>
                    <button
                        onClick={ async () => {
                            const d = await UpdateCustomGoalQuery({ variables: {
                                customGoalData: {
                                    enabled: !goal.enabled,
                                    customGoalId: goal.id
                                }
                            }})
                        }}
                    >{ buttonText + ' Goal' }</button>
                </StyledGoalsListGoalCard>
            )
        })
    }

    return (
        <StyledGoalsListAdminPage>
            { customGoals.length && mapCustomGoals() }
        </StyledGoalsListAdminPage>
    )
}

export default EditCustomGoals
