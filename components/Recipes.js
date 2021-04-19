import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'
import { Card, Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Recipe from './Recipe'
import { ScrollView } from 'react-native-gesture-handler';

// used to reset local db
const sample_recipes = require('./sample-recipe.json')

export default function Recipes({ navigation }) {
    const [recipes, setRecipes] = useState([]);

    // sync shown recipes with local storage
    useEffect(() => {
        (async () => {
            const db = await AsyncStorage.getItem('@recipes')
            if (db) {
                const db_init = JSON.parse(db)
                setRecipes(db_init.recipes)
            }
        })()
    }, [])

    // save to local storage everytime recipes change
    useEffect(() => {
        (async () => {
            const db = JSON.stringify({ recipes })
            await AsyncStorage.setItem('@recipes', db)
        })()
    }, [recipes])

    // add new recipe
    const addRecipe = (i) => {
        const new_recipe = {
            name: 'new recipe ' + i,
            description: 'anoter one',
            ingredients: null,
            steps: []
        }
        setRecipes([...recipes, new_recipe])
    }

    // update recipe 
    const updateRecipe = (recipe, i) => {
        const updated = [...recipes]
        updated[i] = recipe
        setRecipes(updated)
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
                                    index: index,
                                    recipe: recipes[index],
                                    updateRecipe: updateRecipe
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
                    addRecipe(recipes.length)
                }}
            />
        </ScrollView>
    )
}