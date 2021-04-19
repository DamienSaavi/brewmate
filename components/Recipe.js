import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, ScrollView, KeyboardAvoidingView, StyleSheet, TouchableOpacity, LayoutAnimation } from 'react-native'
import { Button } from 'react-native-elements'
import DraggableFlatList from 'react-native-draggable-flatlist'
import Step from './Step'


const layoutAnimConfig = {
    duration: 300,
    update: {
        type: LayoutAnimation.Types.easeInEaseOut,
    },
    create: {
        type: LayoutAnimation.Types.easeInEaseOut,
    },
    delete: {
        duration: 500,
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleX,
    },
};


export default function Recipe({ route, navigation }) {

    // use recipe instead of steps. push changes to recipe instead of steps !!!!!!!!!!!!!!!

    const [recipe, setRecipe] = useState(route.params.recipe)
    const [steps, setSteps] = useState(route.params.recipe.steps)
    const [editing, setEditing] = useState(false)
    const localrecipe = { ...route.params.recipe }

    // update recipe everytime steps change
    useEffect(() => {
        (async () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

            const { index, recipe, updateRecipe } = route.params
            recipe.steps = [...steps]
            updateRecipe(recipe, index)
        })()
    }, [steps])

    // add step
    const addStep = (step) => {
        setSteps(steps.concat([step]))
    }

    // delete step
    const delStep = (index => {
        const updated = steps.filter((item, i) => {
            return index != i
        })
        setSteps(updated)
    })

    // update local instance of recipe
    const setStep = (index, step) => {
        localrecipe.steps[index] = step
    }

    // show edit button in nav header
    navigation.setOptions({
        headerRight: () => (
            <Button onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                setEditing(!editing)
            }}
                title="Edit" />
        ),
    })

    return (
        <KeyboardAvoidingView style={{ flex: 1, paddingBottom: 100 }}>
            <DraggableFlatList
                contentContainerStyle={{ paddingBottom: 150 }}
                data={steps}
                // extraData={steps}
                keyExtractor={(item, index) => index.toString()}
                onDragEnd={({ data }) => setSteps(data)}
                renderItem={({ item, index, drag, isActive }) =>
                    <TouchableOpacity
                        disabled={!editing}
                        onLongPress={drag}>
                        <Step step_no={index} step={item} editing={editing} delStep={delStep} />
                    </TouchableOpacity>
                }
            />
            <Button
                title='+'
                containerStyle={styles.add_container}
                buttonStyle={styles.add_button}
                titleStyle={{ fontSize: 36 }}
                onPress={() => addStep(
                    {
                        ingredient: null,
                        description: 'Step #' + steps.length,
                        timer: null
                    }
                )}
            />
        </KeyboardAvoidingView>
    )
}

// move these eventually
const styles = StyleSheet.create({
    add_container: {
        position: 'absolute',
        bottom: 64,
        right: 16,
        borderRadius: 40,
        borderWidth: 1,
        justifyContent: 'center',
    },
    add_button: {
        width: 70,
        height: 70
    }
})