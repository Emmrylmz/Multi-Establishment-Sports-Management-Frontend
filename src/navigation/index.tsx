import React from 'react';
import { useSelector } from 'react-redux';
import { getAuthUser } from '../features/auth/auth.slice';
import CoachNavigation from './CoachNavigation';
import PlayerNavigation from './userNavigation/PlayerNavigation';
import LoginNavigation from './LoginNavigation';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootState } from '../../store';
import { useAuthStatus } from '../hooks/useAuthStatus';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
	const { isLoading, user } = useAuthStatus();

	if (isLoading || user === undefined) { // Ensure we handle the case where user is not yet defined
		return (
		  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<ActivityIndicator size="large" color="#0000ff" />
		  </View>
		);
	  }
  
	return (
	  <NavigationContainer>
		<Stack.Navigator screenOptions={{ headerShown: false }}>
		  {user ? (
			user.role === 'Coach' ? (
			  <Stack.Screen name="Coach" component={CoachNavigation} />
			) : (
			  <Stack.Screen name="Player" component={PlayerNavigation} />
			)
		  ) : (
			<>
			  <Stack.Screen name="Login" component={LoginNavigation} />
			</>
		  )}
		</Stack.Navigator>
	  </NavigationContainer>
	);
  }