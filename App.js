import { StatusBar } from 'expo-status-bar';
import React, { Component, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import Constants from 'expo-constants';
import { Card, ListItem, Image, Button, Icon } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient';
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';
import Step from './components/Step.js';
import Register from './components/Register.js';
import Login from './components/Login.js';
import { ScrollView } from 'react-native';
import styles from './styles.js'

class Recipe {
  constructor(name, description = null, ingredient = null, image = null) {
    this.name = name                  // string
    this.description = description    // string
    this.ingredient = ingredient      // [{name, amount, unit}, ...]
    this.image = image                // string (uri)
    this.steps = []
  }

  addStep(step, index = -1) {
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
        { name: 'Coffee', amount: 17, unit: 'g' },
        { name: 'Water', amount: 180, unit: 'g' }
      ],
    description: 'Basic Aeropress coffee recipe using the inverted method.',
    timer: null
  },
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
    description: 'Add water just off the boil and stir once and let bloom.',
    timer: { name: 'Bloom', time: { minute: 0, second: 15 }, synced: true }
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
    timer: { name: 'Brew', time: { minute: 1, second: 0 }, synced: true }
  },
  {
    ingredient: null,
    description: 'Flip container and press into cup.',
    timer: { name: 'Press', time: { minute: 0, second: 20 }, synced: true }
  }
])

export default function App(props) {

  return (
    <ScrollView contentContainerStyle={styles.container} indicatorStyle='black'>
      <StatusBar style='dark' />
      {/* <Register />
      <Login /> */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
        style={{alignSelf:'stretch'}}>
        {recipe.steps.map((step, index) => {
          return (
            <Step
              style={{
                container: styles.step,
                description: styles.description,
                ingredients: styles.ingredients,
                descing: styles.descing,
                timer: styles.timer
              }}
              key={index} step={step}>
            </Step>
          )
        })}
      </KeyboardAvoidingView>
    </ScrollView>
  );
}