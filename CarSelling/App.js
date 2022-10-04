import { View, Text, Button } from 'react-native'
import React from 'react'
import Login from './screens/Login'
import Home from './screens/Home'
import SignUp from './screens/SignUp'
//import Home from './screens/Home'
//import AddData from './screens/AddData'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}