import { View, Text } from 'react-native'
import React from 'react'
import { styled } from 'nativewind'
import { useSelector } from 'react-redux'
import { getAuthStatus, getAuthUser } from '../features/auth/auth.slice'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import LoginPage from '../app/pages/login/LoginPage'
import OnboardingScreen from '../app/pages/OnBoarding/OnBoardingScreen'

export default function LoginNavigation() {
  const Stack = createNativeStackNavigator()
  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown:false}}>
      <Stack.Screen name='OnBoardingScreen' component={OnboardingScreen}/>
      <Stack.Screen name="LoginPage" component={LoginPage}/>
    </Stack.Navigator>
   </NavigationContainer>
  )
}