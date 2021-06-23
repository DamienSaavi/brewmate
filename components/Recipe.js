import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, TouchableOpacity, LayoutAnimation, UIManager, Text, View, ScrollView, TouchableHighlight } from 'react-native'
import { Button, Overlay, Input } from 'react-native-elements'
import { Picker } from '@react-native-picker/picker';

import { HeaderBackButton } from '@react-navigation/stack'
import DraggableFlatList from 'react-native-draggable-flatlist'
import Step from './Step'
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';


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
    const [focusedIngr, focusIngr] = useState(false)
    const [modDescription, setModDescription] = useState(null)
    const [modIngredient, setModIngrediet] = useState(null)
    const [modTimer, setModTimer] = useState({ minute: 0, second: 0 })

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

        step.description = 'step ID #' + step.id

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
            <Button
                onPress={() => {
                    if (editing) {
                        LayoutAnimation.configureNext(layoutAnimationConfig);
                        setEditing(false)
                        setRecipe(recipeBackup)
                        setNextID([])
                    }
                    else
                        navigation.goBack()
                }}
                title={editing ? 'Cancel' : 'Recipes'}
            />
        ),

    })

    const Minutes = () => {
        const mins = []
        for (let i = 0; i <= 60; i++)
            mins.push(<Picker.Item label={String(i).padStart(2, '0')} value={i} />)
        return mins
    }
    const Seconds = () => {
        const secs = []
        for (let i = 0; i < 60; i++)
            secs.push(<Picker.Item label={String(i).padStart(2, '0')} value={i} />)
        return secs
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <DraggableFlatList
                // contentContainerStyle={{ paddingBottom: 150 }}
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
                            setModTimer(recipe.steps[index].timer)
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
                            ingredient: [],
                            description: '',
                            timer: null
                        }
                    )}
                /> : null}
            <Overlay
                animationType='fade'
                isVisible={typeof focusedStep == 'number' && focusedStep >= 0}
                onBackdropPress={() => {
                    LayoutAnimation.configureNext(layoutAnimationConfig);

                    const step = JSON.parse(JSON.stringify(recipe.steps[focusedStep]))
                    if (typeof modDescription == 'string' && modDescription !== null)
                        step.description = modDescription

                    step.timer = modTimer

                    updateStep(focusedStep, step)
                    focusStep(false)
                    setModDescription(null)
                    setModTimer({ minute: 0, second: 0 })

                }}
                overlayStyle={styles.overlay}
                backdropStyle={styles.backdrop}
            >
                {(typeof focusedStep == 'number' && focusedStep >= 0) ?
                    <View style={styles.overlayForm}>
                        <Text>{'Description'}</Text>
                        <Input
                            defaultValue={recipe.steps[focusedStep].description}
                            onChangeText={value => setModDescription(value)}
                            multiline
                        />
                        <Text>{'Ingredient'}</Text>
                        <ScrollView horizontal style={styles.ingr_container}>
                            {recipe.steps[focusedStep].ingredient.map((ingredient, index) => {
                                if (ingredient !== null)
                                    return (
                                        <TouchableHighlight
                                            onPress={() => {
                                                focusIngr(index)
                                                setModIngrediet(ingredient)
                                            }}
                                            style={styles.ingr}>
                                            <View>
                                                <View style={styles.ingrName}>
                                                    <Text>{ingredient.name}</Text>
                                                </View>
                                                <View style={styles.ingrInfo}>
                                                    <Text>{String(ingredient.amount)}</Text>
                                                    <Text>{ingredient.unit}</Text>
                                                </View>
                                            </View>
                                        </TouchableHighlight>
                                    )
                            })}
                            <TouchableHighlight
                                onPress={() => {
                                    const updatedRecipe = JSON.parse(JSON.stringify(recipe))

                                    updatedRecipe.steps[focusedStep].ingredient = recipe.steps[focusedStep].ingredient.concat({
                                        name: 'New',
                                        amount: 0,
                                        unit: 'gr'
                                    })

                                    LayoutAnimation.configureNext(layoutAnimationConfig);
                                    setRecipe(updatedRecipe)
                                    // focusIngr
                                }}
                                style={styles.ingrAdd}>
                                <Icon
                                    name='add'
                                    size={28}
                                    color="#000"
                                />
                            </TouchableHighlight>
                        </ScrollView>

                        <Text style={{ marginTop: 28 }}>{'Timer'}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', marginTop:16 }}>
                            <View
                                style={{ flex: 1, flexDirection: 'row', alignItems:'center'}}>
                                <Text> {'Minutes:'}</Text>
                                <Picker
                                    style={{ width: 64 }}
                                    selectedValue={modTimer.minute}
                                    onValueChange={val => {
                                        setModTimer({ minute: val, second: modTimer.second })
                                    }}>
                                    {Minutes()}
                                </Picker>
                            </View>
                            <View
                                style={{ flex: 1, flexDirection: 'row', alignItems:'center' }}>
                                <Text> {'Seconds:'}</Text>
                                <Picker
                                    style={{ width: 64 }}
                                    selectedValue={modTimer.second}
                                    onValueChange={val => {
                                        setModTimer({ minute: modTimer.minute, second: val })
                                    }}>
                                    {Seconds()}
                                </Picker>
                            </View>
                        </View>
                    </View> : null}
                <Overlay
                    isVisible={typeof focusedIngr == 'number' && focusedIngr >= 0}
                    onBackdropPress={() => {
                        const step = JSON.parse(JSON.stringify(recipe.steps[focusedStep]))
                        if (modIngredient !== null) {
                            step.ingredient[focusedIngr] = modIngredient
                            updateStep(focusedStep, step)
                        }
                        focusIngr(false)
                        setModIngrediet(null)
                    }}
                    overlayStyle={styles.overlay}
                    backdropStyle={styles.backdrop}>
                    {(typeof focusedIngr == 'number' && focusedIngr >= 0) ?
                        <View>
                            <View>
                                <Input
                                    defaultValue={modIngredient.name}
                                    onChangeText={val => {
                                        const ingr = JSON.parse(JSON.stringify(modIngredient))
                                        ingr.name = val
                                        setModIngrediet(ingr)
                                    }}
                                />
                            </View>
                            <View>
                                <Input
                                    defaultValue={String(modIngredient.amount)}
                                    onChangeText={val => {
                                        const ingr = JSON.parse(JSON.stringify(modIngredient))
                                        ingr.amount = Number(val)
                                        setModIngrediet(ingr)
                                    }}
                                    keyboardType={'number-pad'}
                                />
                                <Picker
                                    selectedValue={modIngredient.unit}
                                    onValueChange={val => {
                                        const ingr = JSON.parse(JSON.stringify(modIngredient))
                                        ingr.unit = val
                                        setModIngrediet(ingr)
                                    }}>
                                    <Picker.Item label='gr' value='gr' />
                                    <Picker.Item label='oz' value='oz' />
                                    <Picker.Item label='ml' value='ml' />
                                    <Picker.Item label='tsp' value='tsp' />
                                    <Picker.Item label='tbsp' value='tbsp' />
                                    <Picker.Item label='cup' value='cup' />
                                </Picker>
                            </View>
                            <Button
                                onPress={() => {
                                    const updatedRecipe = JSON.parse(JSON.stringify(recipe))

                                    updatedRecipe.steps[focusedStep].ingredient.splice(focusedIngr, 1)
                                    focusIngr(false)
                                    LayoutAnimation.configureNext(layoutAnimationConfig)
                                    setRecipe(updatedRecipe)
                                }}
                                title='Delete'
                            />
                        </View>
                        : null}
                </Overlay>
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
        // flex: 1,
    },
    ingr_container: {
        marginTop: 12,
        alignSelf: 'stretch'
    },
    ingr: {
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 8,
        marginHorizontal: 8,
        backgroundColor: '#f99548',
        alignSelf: 'center'
    },
    ingrAdd: {
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 8,
        marginHorizontal: 8,
        borderWidth: 1,
        alignSelf: 'center'
    },
    ingrInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ingrName: {
        marginVertical: 0,
        minHeight: 40,
        maxWidth: 120,
        minWidth: 48,
        justifyContent: 'center',
        alignItems: 'center',
    }
})