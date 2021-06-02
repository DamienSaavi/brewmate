import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, TouchableOpacity, LayoutAnimation, UIManager, Text, View, ScrollView } from 'react-native'
import { Button, Overlay, Input, Card } from 'react-native-elements'
import { HeaderBackButton } from '@react-navigation/stack'
import DraggableFlatList from 'react-native-draggable-flatlist'
import Step from './Step'
import Icon from 'react-native-vector-icons/Ionicons';


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
        springDamping: 0.5
    },
    duration: 500,
    delete: {
        type: 'spring',
        property: 'scaleXY',
        springDamping: 1
    },
    update: {
        type: 'spring',
        springDamping: 0.5
    }
}

export default function Recipe({ route, navigation }) {
    const [recipe, setRecipe] = useState(route.params.recipe)
    const [recipeBackup, setRecipeBackup] = useState(route.params.recipe)
    const [nextID, setNextID] = useState([])
    const [editing, setEditing] = useState(false)
    const [focusedStep, focusStep] = useState(false)

    const [modDescription, setModDescription] = useState(null)
    const [modIngredient, setModIngrediet] = useState(null)
    const [modTimer, setModTimer] = useState(null)

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


    const updateStep = (index, step) => {
        const updatedRecipe = JSON.parse(JSON.stringify(recipe))
        updatedRecipe.steps[index] = step

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

                    setRecipeBackup(recipe)
                    setEditing(!editing)
                }}
                title={editing ? 'Save' : 'Edit'} />
        ),
        headerLeft: () => (
            <HeaderBackButton
                onPress={() => {
                    LayoutAnimation.configureNext(layoutAnimationConfig);
                    if (editing) {
                        setEditing(false)
                        setRecipe(recipeBackup)
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
                extraData={recipe}
                keyExtractor={(item) => item.id.toString()}
                onDragEnd={({ data }) => updateStepsOrder(data)}
                renderItem={({ item, index, drag, isActive }) =>
                    <TouchableOpacity
                        disabled={!editing}
                        onLongPress={drag}
                        onPress={() => {
                            LayoutAnimation.configureNext(layoutAnimationConfig);
                            focusStep(index)
                        }} >
                        <Step
                            step={item}
                            step_no={index}
                            editing={editing}
                            delStep={() => delStep(index)}
                            drag={drag} />
                    </TouchableOpacity>
                }
            />
            {editing ?
                <Button
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
                /> : null}
            <Overlay
                // animationType='fade'
                isVisible={typeof focusedStep == 'number' && focusedStep >= 0}
                onBackdropPress={() => {
                    const step = JSON.parse(JSON.stringify(recipe.steps[focusedStep]))
                    if (typeof modDescription == 'string' && modDescription !== null)
                        step.description = modDescription
                    updateStep(focusedStep,step)
                    focusStep(false)
                    setModDescription(null)
                    
                }}
                overlayStyle={styles.overlay}
                backdropStyle={styles.backdrop}
                on
            >
                {(typeof focusedStep == 'number' && focusedStep >= 0) ?
                    <ScrollView style={styles.overlayForm}>
                        <Text>{'Description'}</Text>
                        <Input
                            defaultValue={recipe.steps[focusedStep].description}
                            onChangeText={value => setModDescription(value)}
                            multiline
                        />
                        <Text>{'Ingredient'}</Text>
                        <View style={styles.ingr_container}>
                            {recipe.steps[focusedStep].ingredient.map((ingredient, index) => {
                                if (ingredient !== null)
                                    return (
                                        <View style={styles.ingr}>
                                            <View style={styles.ingrName}>
                                                <Text>{ingredient.name}</Text>
                                            </View>
                                            <View style={styles.ingrInfo}>
                                                <Text>{String(ingredient.amount)}</Text>
                                                <Text>{ingredient.unit}</Text>
                                            </View>
                                        </View>
                                    )
                            })}
                            <View style={styles.ingr}>
                                <View style={styles.ingrName}>
                                    <Icon
                                        name='add'
                                        size={28}
                                        color="#000"
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView> : null}
            </Overlay>
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
    },
    overlay: {
        flex: 1,
        padding: 20,
        width: '85%',
        marginTop: 128,
        marginBottom: 100,

    },
    backdrop: {
        
    },
    overlayForm: {
        flex: 1,
    },
    ingr_container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 12
    },
    ingr: {
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 8,
        marginHorizontal: 8,
        backgroundColor: '#f99548',
    },
    ingrInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ingrName: {
        flex: 1,
        marginVertical: 0,
        minHeight: 40,
        maxWidth: 120,
        minWidth: 48,
        justifyContent:'center',
        alignItems:'center',
    }
})