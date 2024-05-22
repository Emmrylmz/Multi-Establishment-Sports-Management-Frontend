import { View, Text } from 'react-native'
import React from 'react'
import { styled } from 'nativewind'
import { useSelector } from 'react-redux'
import { getAuthStatus, getAuthUser } from '../features/auth/auth.slice'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import LoginPage from '../app/pages/login/LoginPage'

const Stack = createNativeStackNavigator()

export default function LoginNavigation() {
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown:false}}>
      <Stack.Screen name="LoginPage" component={LoginPage}/>
    </Stack.Navigator>
  )
}