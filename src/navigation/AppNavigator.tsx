import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { navigationRef } from './rootNavigation';
import RoleNavigator from './RoleNavigator';
import AuthNavigator from './AuthNavigator';
import { usePushNotifications } from '../hooks/usePushNotifications';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
	const { expoPushToken, notification } = usePushNotifications();
	const { isLoading, user } = useAuthStatus();

	if (isLoading || user === undefined) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" color="#919191" />
			</View>
		);
	}

	return (
		<NavigationContainer ref={navigationRef}>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				{user ? (
					<Stack.Screen
						name="Role"
						component={RoleNavigator}
						initialParams={{ role: user.role }}
					/>
				) : (
					<Stack.Screen name="Auth" component={AuthNavigator} />
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
