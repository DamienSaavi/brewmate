import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, TouchableOpacity, LayoutAnimation, UIManager } from 'react-native'
import { HeaderBackButton } from '@react-navigation/stack'
import { Button } from 'react-native-elements'
import DraggableFlatList from 'react-native-draggable-flatlist'
import Step from './Step'
import { Header } from 'react-native/Libraries/NewAppScreen'


if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

// animation config to use on layout change
const layoutAnimationConfig = {
    duration: 500,
    create: {
        type: 'spring',
        property: 'scaleXY',
        springDamping: 0.8
    },
    duration: 500,
    delete: {
        type: 'spring',
        property: 'scaleXY',
        springDamping: 0.5
    },
    update: {
        type: 'spring',
        springDamping: 0.5
    }
}

export default function Recipe({ route, navigation }) {
    const [recipe, setRecipe] = useState(route.params.recipe)
    const [nextID, setNextID] = useState([])
    const [editing, setEditing] = useState(false)

    // update recipe everytime steps change
    const saveChanges = () => {
        const { index, updateRecipe } = route.params
        updateRecipe(recipe, index)
    }

    // add step
    const addStep = (step) => {
        LayoutAnimation.configureNext(layoutAnimationConfig);

        if (nextID.length > 0) {
            step.id = nextID[0]
            setNextID(nextID.slice(1))
        } else {
            step.id = recipe.steps.length
        }

        const updatedRecipe = JSON.parse(JSON.stringify(recipe))
        updatedRecipe.steps = recipe.steps.concat(step)

        setRecipe(updatedRecipe)
    }

    // delete step
    const delStep = (index) => {
        LayoutAnimation.configureNext(layoutAnimationConfig);

        const droppedID = recipe.steps[index].id

        if (droppedID !== recipe.steps.length - 1 && !nextID.find(id => id == droppedID))
            setNextID(nextID.concat(droppedID))

        const updatedRecipe = JSON.parse(JSON.stringify(recipe))
        updatedRecipe.steps = recipe.steps.filter((item, i) => {
            return index != i
        })

        setRecipe(updatedRecipe)
    }

    // update steps array
    const updateStepsOrder = (steps) => {
        const updatedRecipe = JSON.parse(JSON.stringify(recipe))
        updatedRecipe.steps = steps
        setRecipe(updatedRecipe)
    }


    // show edit button in nav header
    navigation.setOptions({
        headerRight: () => (
            <Button
                onPress={() => {
                    LayoutAnimation.configureNext(layoutAnimationConfig);

                    if (editing)
                        saveChanges()

                    setEditing(!editing)
                }}
                title={editing ? 'Save' : 'Edit'} />
        ),
        headerLeft: (props) => (
            <HeaderBackButton
                // {...props}
                onPress={() => {
                    LayoutAnimation.configureNext(layoutAnimationConfig);
                    if (editing) {
                        setEditing(false)
                        setRecipe(route.params.recipe)
                        setNextID([])
                    }
                    else
                        navigation.goBack()
                }}
                label={editing ? 'Cancel' : 'Recipes'} />
        )
    })

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <DraggableFlatList
                contentContainerStyle={{ paddingBottom: 150 }}
                data={recipe.steps}
                keyExtractor={(item) => item.id.toString()}
                onDragEnd={({ data }) => updateStepsOrder(data)}
                renderItem={({ item, index, drag, isActive }) =>
                    <TouchableOpacity
                        disabled={!editing}
                        onLongPress={drag}>
                        <Step step={item} step_no={index} editing={editing} delStep={() => delStep(index)} />
                    </TouchableOpacity>
                }
            />
            <Button
                disabled={!editing}
                title='+'
                containerStyle={styles.add_container}
                buttonStyle={styles.add_button}
                titleStyle={{ fontSize: 36 }}
                onPress={() => addStep(
                    {
                        id: null,
                        ingredient: null,
                        description: 'Step #' + recipe.steps.length,
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