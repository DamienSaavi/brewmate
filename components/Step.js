import React, { Component, useState } from 'react'
import { Text, View, TextInput, TouchableWithoutFeedback } from 'react-native'
import { Card, ListItem, Image, Button, Icon } from 'react-native-elements'
import { State, PanGestureHandler } from 'react-native-gesture-handler';

export default function Step(props) {
    const [editable, setEditable] = useState(false)
    const [description, setDescription] = useState(props.step.description)
    const [ingredient, setIngredient] = useState(props.step.ingredient)
    const [timer, setTimer] = useState(props.step.timer)

    return (
        <TouchableWithoutFeedback
            onLongPress={() => { setEditable(!editable) }}>
            <View style={props.style.container}>
                <View style={props.style.descing}>
                    {editable ? (
                        <TextInput
                            style={props.style.description}
                            defaultValue={description}
                            onChangeText={(text) => setDescription(text)}
                        />
                    ) : (
                            <Text style={props.style.description}>{description}</Text>
                        )}
                    {ingredient ?
                        (<View style={props.style.ingredients}>
                            {ingredient.map((ingredient, index) => {
                                return (
                                    <Text style={{ color: 'white', paddingHorizontal: 12 }} key={index}>{ingredient.name + '  ' + String(ingredient.amount) + ingredient.unit}</Text>
                                )
                            })}
                        </View>) : (null)}
                </View>
                {timer ?
                    <View style={props.style.timer}>
                        <Text>{timer.name}</Text>
                        <Icon
                            name='timer'
                            type='Ionicons'
                            color='#000'
                        />
                        <Text>{String(timer.time.minute).padStart(2, '0') + ':' + String(timer.time.second).padStart(2, '0')}</Text>
                    </View> : null}
            </View>
        </TouchableWithoutFeedback>
    )
}