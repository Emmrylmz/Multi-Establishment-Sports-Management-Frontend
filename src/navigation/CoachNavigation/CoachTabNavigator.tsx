import React from 'react';
import CoachHomeStack from './CoachHomeStack';
import {useTranslation} from 'react-i18next';
import AddUserPage from '../../app/pages/coach/AddUserPage';
import { TabBarIcon } from '../../app/components';
import {  Tab } from '../StackNavigators';
import { CommonProfileStackNavigator } from '../Common/CommonProfileStack';
import { CommonTeamStackNavigator } from '../Common/CommonTeamStack';

const CoachTabNavigator = () => {
  const { t } = useTranslation();
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
      <Tab.Screen 
        name="CoachHomeStack" 
        component={CoachHomeStack} 
        options={{ title: t("tabNavigator.home") }} 
      />
      <Tab.Screen 
        name="CommonTeamStack" 
        component={CommonTeamStackNavigator} 
        options={{ title: t("tabNavigator.teams") }} 
      />
      <Tab.Screen 
        name="AddUserPage" 
        component={AddUserPage} 
        options={{ title: t("tabNavigator.addUser") 

      }} />
      <Tab.Screen 
        name="CommonProfileStack" 
        component={CommonProfileStackNavigator} 
        options={{ title: t("tabNavigator.profile") }} 
      />
    </Tab.Navigator>
  );
};

export default CoachTabNavigator;
