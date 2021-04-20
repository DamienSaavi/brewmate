import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, TouchableOpacity, LayoutAnimation, UIManager } from 'react-native'
import { Button } from 'react-native-elements'
import DraggableFlatList from 'react-native-draggable-flatlist'
import Step from './Step'

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
    const [editing, setEditing] = useState(false)

    // update recipe everytime steps change
    useEffect(() => {
        const { index, updateRecipe } = route.params
        updateRecipe(recipe, index)
    }, [recipe])

    // add step
    const addStep = (step) => {
        //on animation end update step ID to prevent duplicates bc of index !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        LayoutAnimation.configureNext(layoutAnimationConfig);
        const updatedRecipe = Object.create(recipe)
        updatedRecipe.steps = recipe.steps.concat(step)
        setRecipe(updatedRecipe)
    }

    // delete step
    const delStep = (index) => {
        //on animation end update step ID to prevent duplicates bc of index !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        LayoutAnimation.configureNext(layoutAnimationConfig);
        const updatedRecipe = Object.create(recipe)
        updatedRecipe.steps = recipe.steps.filter((item, i) => {
            return index != i
        })
        setRecipe(updatedRecipe)
    }

    // update steps array
    const updateSteps = (steps) => {
        const updatedRecipe = Object.create(recipe)
        updatedRecipe.steps = steps
        setRecipe(updatedRecipe)
    }

    // show edit button in nav header
    navigation.setOptions({
        headerRight: () => (
            <Button onPress={() => {
                LayoutAnimation.configureNext(layoutAnimationConfig);
                setEditing(!editing)
            }}
                title="Edit" />
        ),
    })

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <DraggableFlatList
                contentContainerStyle={{ paddingBottom: 150 }}
                data={recipe.steps}
                keyExtractor={(item) => item.id.toString()}
                onDragEnd={({ data }) => updateSteps(data)}
                renderItem={({ item, index, drag, isActive }) =>
                    <TouchableOpacity
                        disabled={!editing}
                        onLongPress={drag}>
                        <Step step={item} step_no={index} editing={editing} delStep={() => delStep(index)} />
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
                        id: recipe.steps.length,
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