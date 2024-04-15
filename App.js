import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Slider from '@react-native-community/slider';


import DatesScreen from './screens/Dates/DatesScreen';
import BudgetScreen from './screens/Budget/BudgetScreen';
import HousingScreen from './screens/Housing/HousingScreen';
import FoodScreen from './screens/Food/FoodScreen';
import ActivitiesScreen from './screens/Activities/ActivitiesScreen';
import SolutionScreen from './screens/Solution/SolutionScreen';


import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Let's Start now Bitches!</Text>
    //   <StatusBar style="auto" />


    // </View>
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Dates">
      <Stack.Screen
        name="Dates"
        component={DatesScreen}
        />
      <Stack.Screen name="Budget" component={BudgetScreen} />
      <Stack.Screen name="Housing" component={HousingScreen} />
      <Stack.Screen name="Food" component={FoodScreen} />
      <Stack.Screen name="Activities" component={ActivitiesScreen} />
      <Stack.Screen name="Solution" component={SolutionScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
