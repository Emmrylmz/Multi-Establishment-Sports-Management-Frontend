import React from 'react';
import { useSelector } from 'react-redux';
import { getAuthUser } from '../features/auth/auth.slice';
import CoachNavigation from './CoachNavigation';
import ManagerNavigation from './ManagerNavigation';
import PlayerNavigation from './UserNavigation/PlayerNavigation';
import LoginNavigation from './LoginNavigation';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootState } from '../../store';
import { useAuthStatus } from '../hooks/useAuthStatus';
import EventDetailPage from '../app/pages/common/EventDetailPage';
import { navigationRef } from './rootNavigation';
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
          user.role === 'Coach' ? (
            <Stack.Screen name="Coach" component={CoachNavigation} />
          ) : user.role === 'Manager' ? (
            <Stack.Screen name="Manager" component={ManagerNavigation} />
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
