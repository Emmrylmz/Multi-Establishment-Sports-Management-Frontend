import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Tab } from '../StackNavigators';
import { TabBarIcon } from '../../app/components';
import { CommonTeamStackNavigator } from '../Common/CommonTeamStack';
import { CommonProfileStackNavigator } from '../Common/CommonProfileStack';
import PlayerHomeStackNavigator from './PlayerHomeStackNavigator';
import PlayerPaymentPage from '../../app/pages/player/PlayerPaymentPage';
import { useColorScheme } from 'react-native';

const PlayerTabNavigator = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const colors = {
    background: isDarkMode ? '#101010' : '#FFFFFF',
    border: isDarkMode ? '#333333' : '#E0E0E0',
    activeTab: '#fff',  // A more vibrant green for active tab
    inactiveTab: isDarkMode ? '#777777' : '#BBBBBB',
  };

  return (
    <Tab.Navigator
      initialRouteName="PlayerProgressPage"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) =>
          TabBarIcon({ routeName: route.name, color: focused ? colors.activeTab : color, size }),
        tabBarActiveTintColor: colors.activeTab,
        tabBarInactiveTintColor: colors.inactiveTab,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen
        name="PlayerHomeStackScreen"
        component={PlayerHomeStackNavigator}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="Teams"
        component={CommonTeamStackNavigator}
        options={{ title: 'Progress' }}
      />
      <Tab.Screen
        name="PlayerPayments"
        component={PlayerPaymentPage}
        options={{ title: 'Payments' }}
      />
      <Tab.Screen
        name="PlayerProfile"
        component={CommonProfileStackNavigator}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default PlayerTabNavigator;