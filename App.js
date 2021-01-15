import { StatusBar } from 'expo-status-bar';
import React, { Component, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { Card, ListItem, Image, Button, Icon } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient';
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';
import './hors.png'
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import { ScrollView } from 'react-native';

class Recipe {
  constructor(name, description=null, ingredient=null, image=null) {
    this.name = name                  // string
    this.description = description    // string
    this.ingredient = ingredient      // [{name, amount, unit}, ...]
    this.image = image                // string (uri)
    this.steps = []
  }

  addStep(step, index=-1) {
    this.steps.push(...step)
  }
}

const name = 'Inverted Aeropress Coffee'
const description = 'Sed non viverra dolor.'
const ingredient = [
  {
    name: 'Coffee (medium-fine)',
    amount: 17,
    unit: 'g'
  },
  {
    name: 'Water (Boiling)',
    amount: 180,
    unit: 'g'
  }
]

const recipe = new Recipe(name, description, ingredient)
recipe.addStep([
  {
    ingredient:
    [
      { name: 'Coffee', amount: 17, unit: 'g' }
    ],
    description: 'Grind coffee to medium-fine and add to container.',
    timer: null
  },
  {
    ingredient: [
      { name: 'Water', amount: 90, unit: 'g' }
    ],
    description: 'Add water just off the boil and stir once.',
    timer: null
  },
  {
    ingredient: null,
    description: 'Let the coffee bloom.',
    timer: {name:'Bloom', time:{minute:0, second:15}, synced:true}
  },
  {
    ingredient: [
      { name: 'Water', amount: 90, unit: 'g' }
    ],
    description: 'Add the remaining water and stir once.',
    timer: null
  },
  {
    ingredient: null,
    description: 'Let the coffee brew.',
    timer: {name:'Brew', time:{minute:1, second:0}, synced:true}
  },
  {
    ingredient: null,
    description: 'Flip container and press into cup.',
    timer: {name:'Press', time:{minute:0, second:20}, synced:true}
  }
])

export default function App(props) {

  return (
    <ScrollView contentContainerStyle={styles.container} indicatorStyle='black'>
      <StatusBar style='dark' />
      <LinearGradient
        colors={['#fff', '#fff']}
        style={styles.background}
      >
        {recipe.steps.map((step, index) => {
          return (
            <Card containerStyle={styles.step}>
              <Card.Title>{step.description}</Card.Title>
              {step.ingredient ? step.ingredient.map((ingredient, index) => {
                return (
                  <Text>{ingredient.name+'  '+String(ingredient.amount) + ingredient.unit}</Text>
                )
              }) : null}
            </Card>
          )
        })}
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6f4e37',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  step: {
    alignSelf: 'stretch',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 30,
    borderWidth: .2,
    borderColor: '#aaa',
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 3},
    shadowRadius: 5,
    shadowOpacity: .5
  },
  background: {
    width:'100%',
    height: '100%',
    paddingTop: Constants.statusBarHeight,
    margin: 0,
  }
});
