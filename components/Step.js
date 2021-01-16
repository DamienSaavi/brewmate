import React, { Component, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card, ListItem, Image, Button, Icon } from 'react-native-elements'

export default function Step(props) {
    return (
        <Card containerStyle={props.style}>
            <Card.Title>{props.step.description}</Card.Title>
            {props.step.ingredient ? props.step.ingredient.map((ingredient, index) => {
                return (
                    <Text key={index}>{ingredient.name + '  ' + String(ingredient.amount) + ingredient.unit}</Text>
                )
            }) : null}
        </Card>)
}