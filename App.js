import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Recipes from './components/Recipes'
import Step from './components/Step'
import Recipe from './components/Recipe'
import { } from 'react-native';

export default function App() {

  return (
    <ScrollView>
      <Recipes/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
