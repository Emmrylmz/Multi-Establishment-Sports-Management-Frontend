import React from 'react';
import CoachHomeStack from './CoachHomeStack';
import CoachSchedulePage from '../../app/pages/common/TeamListPage';
import AddUserPage from '../../app/pages/coach/AddUserPage';
import { TabBarIcon } from '../../app/components';
import {  Tab } from '../StackNavigators';
import { CommonProfileStackNavigator } from '../Common/CommonProfileStack';
import { CommonTeamStackNavigator } from '../Common/CommonTeamStack';

const CoachTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="CoachHomeStack"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <TabBarIcon routeName={route.name} color={color} size={size} />
        ),
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#919191',
        tabBarStyle: {
          backgroundColor: '#101010',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="CoachHomeStack" component={CoachHomeStack} options={{ title: 'Home' }} />
      <Tab.Screen name="CommonTeamStack" component={CommonTeamStackNavigator} options={{ title: 'Teams' }} />
      <Tab.Screen name="AddUserPage" component={AddUserPage} options={{ title: 'Add User' }} />
      <Tab.Screen name="CommonProfileStack" component={CommonProfileStackNavigator} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
};

export default CoachTabNavigator;
