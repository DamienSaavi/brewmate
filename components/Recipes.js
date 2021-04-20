import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
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
                setRecipes(sample_recipes.recipes)
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

        <KeyboardAvoidingView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{paddingBottom:200}}>
                {recipes.map((recipe, index) => {
                    return (
                        <Card key={index}>
                            <Card.Title>{recipe.name}</Card.Title>
                            <Card.Divider />
                            <Text style={{ marginBottom: 10 }}>
                                {recipe.description}
                            </Text>
                            <Button
                                title='View'
                                buttonStyle={{ width: 60, height: 60 }}
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
            </ScrollView>
            <Button
                title='+'
                containerStyle={styles.add_container}
                buttonStyle={styles.add_button}
                titleStyle={{ fontSize: 36 }}
                onPress={() => addRecipe(recipes.length)}
            />
        </KeyboardAvoidingView>
    )
}


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