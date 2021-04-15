import React, { useState } from 'react'
import { View, ScrollView, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import Step from './Step'

export default function Recipe({ route }) {
    const [steps, setSteps] = useState(route.params.recipe.steps)

    const addStep = (step) => {
        setSteps(steps.concat([step]))
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "position" : "height"}
            style={{ alignSelf: 'stretch' }}>
            <ScrollView style={{paddingBottom:100}}>
                {steps.map((step, index) => {
                    return (
                        <Step
                            key={index} step_no={index} step={step}>
                        </Step>
                    )
                })}
                <View style={{height:150}}></View>
            </ScrollView>
            <Button
                title='+'
                containerStyle={styles.add_container}
                buttonStyle={styles.add_button}
                titleStyle={{fontSize:36}}
                onPress={() => addStep(
                    {
                        ingredient: null,
                        description: 'New step!',
                        timer: null
                    }
                )}
            />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    add_container: {
        position: 'absolute',
        bottom: 36,
        right: 36,
        borderRadius: 40,
        borderWidth: 1,
        justifyContent:'center',
    },
    add_button: {
        width: 70,
        height: 70
    }
})