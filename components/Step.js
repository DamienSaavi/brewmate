import React, { Component, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { Card, ListItem, Image, Button, Icon } from 'react-native-elements'

export default function Step(props) {
    return (
        <View style={props.style.container}>
            <View style={props.style.descing}>
                {props.step.editable ? (
                    <TextInput
                        style={props.style.description}
                        defaultValue={props.step.description}
                        onEndEditing={(value) => {props.step.description=value}}
                    />
                ):(
                    <Text style={props.style.description}>{props.step.description}</Text>
                )}
                {props.step.ingredient ?
                    (<View style={props.style.ingredients}>
                        {props.step.ingredient.map((ingredient, index) => {
                            return (
                                <Text style={{ color: 'white', paddingHorizontal: 12 }} key={index}>{ingredient.name + '  ' + String(ingredient.amount) + ingredient.unit}</Text>
                            )
                        })}
                    </View>) : (null)}
            </View>
            {props.step.timer ?
                <View style={props.style.timer}>
                    <Text>{props.step.timer.name}</Text>
                    <Icon
                        name='timer'
                        type='Ionicons'
                        color='#000'
                    />
                    <Text>{String(props.step.timer.time.minute).padStart(2,'0') + ':' + String(props.step.timer.time.second).padStart(2,'0')}</Text>
                </View> : null}
        </View>
    )
}