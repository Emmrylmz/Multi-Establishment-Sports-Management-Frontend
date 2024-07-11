import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Tab } from '../StackNavigators';
import { TabBarIcon } from '../../app/components';
import { CommonTeamStackNavigator } from '../Common/CommonTeamStackNavigator';
import { CommonProfileStackNavigator } from '../Common/CommonProfileStack';
import PlayerHomeStackNavigator from './PlayerHomeStackNavigator';
import PlayerPaymentPage from '../../app/pages/player/PlayerPaymentPage';

const PlayerTabNavigator = () => {
    return (
      <Tab.Navigator
        initialRouteName="PlayerProgressPage"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) =>
            TabBarIcon({ routeName: route.name, color, size, }),
          tabBarActiveTintColor: '#A8FF97',
          tabBarInactiveTintColor: '#828282',
          headerShown: false,
        })}
      >
        <Tab.Screen
            name="PlayerHomeStackScreen"
          component={PlayerHomeStackNavigator}
          options={{title:"Home"}} />
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