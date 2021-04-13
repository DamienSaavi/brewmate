import React, { useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { Button } from 'react-native-elements'
import Step from './Step'

export default function Recipe(props) {
    const [steps, setSteps] = useState(props.recipe.steps)

    const addStep = (step) => {
        setSteps(steps.concat([step]))
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "position" : "height"}
            style={{ alignSelf: 'stretch' }}>
            {steps.map((step, index) => {
                return (
                    <Step
                        key={index} step={step}>
                    </Step>
                )
            })}
            <Button
                title='+'
                containerStyle={{ width: 180 }}
                buttonStyle={{ marginBottom: 80 }}
                onPress={() => addStep(
                    {
                        ingredient: null,
                        description: 'Look at you! adding a new step and all :)',
                        timer: null
                    }
                )}
            />
        </KeyboardAvoidingView>
    )
}
