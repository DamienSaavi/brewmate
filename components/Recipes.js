import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'
import { Card, Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Recipe from './Recipe'
import { ScrollView } from 'react-native-gesture-handler';


export default function Recipes({ navigation }) {
    const [recipes, updateRecipes] = useState([]);

    useEffect(() => {
        (async () => {
            const db = await AsyncStorage.getItem('@recipes')
            if (db) {
                const db_init = JSON.parse(db)
                updateRecipes(db_init.recipes)
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const db = JSON.stringify({ recipes })
            await AsyncStorage.setItem('@recipes', db)
        })()
    }, [recipes])

    const add_recipe = (i) => {
        const new_recipe = {
            name: 'new recipe ' + i,
            description: 'anoter one',
            ingredients: null,
            steps: []
        }
        updateRecipes([...recipes, new_recipe])
    }

    return (
        <ScrollView>
            { recipes.map((recipe, index) => {
                return (
                    <Card key={index}>
                        <Card.Title>{recipe.name}</Card.Title>
                        <Card.Divider />
                        <Text style={{ marginBottom: 10 }}>
                            {recipe.description + index}
                        </Text>
                        <Button
                            title='View'
                            buttonStyle={{ width: 60, height:60 }}
                            onPress={() => {
                                navigation.push('Recipe', {
                                    recipe: recipes[index]
                                })
                            }}
                        />
                    </Card>
                )
            })}
            <Button
                title='Recipe'
                buttonStyle={{ width: 150, height: 150, alignSelf:'center' }}
                onPress={() => {
                    add_recipe(recipes.length)
                }}
            />
        </ScrollView>
    )
}