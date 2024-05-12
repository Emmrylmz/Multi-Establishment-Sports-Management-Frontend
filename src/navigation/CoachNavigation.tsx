import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabBarIcon from '../app/components/tabs/tabBarIcon';
import CoachHomePage from '../app/pages/coach/CoachHomePage';
import CoachSchedulePage from '../app/pages/coach/CoachSchedulePage';
import AddUserPage from '../app/pages/common/AddUserPage';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoachTeamDetail from '../app/pages/coach/CoachTeamDetail';
import ProfilePage from '../app/pages/common/ProfilePage';
import CoachAddTrainingPage from '../app/pages/coach/CoachAddTrainingPage';
import CoachTeamsPage from '../app/pages/coach/CoachTeamsPage';
import EventDetailPage from '../app/pages/common/EventDetailPage';
import PaymentPage from '../app/pages/common/PaymentPage';
import NotificationPage from '../app/pages/common/NotificationPage';

const HomeStack = createNativeStackNavigator();

function CoachHomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="CoachHomePage" component={CoachHomePage} />
      <HomeStack.Screen name="CoachTeamDetail" component={CoachTeamDetail} /> 
      <HomeStack.Screen name="CoachAddTrainingPage" component={CoachAddTrainingPage} />
      <HomeStack.Screen name="CoachTeamsPage" component={CoachTeamsPage} />
      <HomeStack.Screen name="EventDetailPage" component={EventDetailPage} />
      <HomeStack.Screen name='PaymentPage' component={PaymentPage} />
      <HomeStack.Screen name='CoachNotificationPage' component={NotificationPage} />
    </HomeStack.Navigator>
  );
}


const CoachNavigation = () => {
  const Tab = createBottomTabNavigator()
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Coach'screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, }) =>
          TabBarIcon({ routeName: route.name, color, size }),
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#919191',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#101010',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
      })} >
        <Tab.Screen name='CoachHomePageStack' component={CoachHomeStackScreen} options={{ title: 'Home'}} />
        <Tab.Screen name='CoachSchedulePage' component={CoachSchedulePage} options={{ title: 'Schedule Training' }} />
        <Tab.Screen name='AddUserPage' component={AddUserPage} options={{ title: 'Add User' }} />
        <Tab.Screen name='CoachProfilePage' component={ProfilePage} options={{ title: 'Profile' }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default CoachNavigation