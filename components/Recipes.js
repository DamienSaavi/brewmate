import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { Card } from 'react-native-elements'

export default function Recipes() {
    const recipes = [require('./sample-recipe')]
    return (
        <View>
            {recipes.map((recipe, index) => {
                return (
                    <Card key={index}>
                        <Card.Title>{recipe.name}</Card.Title>
                        <Card.Divider />
                        <Text style={{ marginBottom: 10 }}>
                            {recipe.description}
                        </Text>
                    </Card>
                )
            })}
        </View>
    )
}