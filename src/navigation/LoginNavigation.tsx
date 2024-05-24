import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginPage from '../app/pages/login/LoginPage'

const Stack = createNativeStackNavigator()

export default function LoginNavigation() {
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown:false}}>
      <Stack.Screen name="LoginPage" component={LoginPage}/>
    </Stack.Navigator>
  )
}