import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabBarIcon from '../app/components/tabs/tabBarIcon';
import CoachHomePage from '../app/pages/coach/CoachHomePage';
import CoachSchedulePage from '../app/pages/coach/CoachSchedulePage';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoachTeamDetail from '../app/pages/coach/CoachTeamDetail';
import ProfilePage from '../app/pages/common/ProfilePage';
import OnboardingScreen from '../app/pages/OnBoarding/OnBoardingScreen';

const HomeStack = createNativeStackNavigator();

function CoachHomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name='OnBoardingScreen' component={OnboardingScreen}/>

      <HomeStack.Screen name="CoachHomePage" component={CoachHomePage} />
      <HomeStack.Screen name="CoachTeamDetail" component={CoachTeamDetail} /> 
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
        tabBarActiveTintColor: '#242424',
        tabBarInactiveTintColor: '#919191',
        headerShown: false,
      })} >
        
        <Tab.Screen name='CoachHomePageStack' component={CoachHomeStackScreen} options={{ title: 'Home' }} />
        <Tab.Screen name='CoachSchedulePage' component={CoachSchedulePage} options={{ title: 'Schedule Training' }} />
        <Tab.Screen name='CoachProfilePage' component={ProfilePage} options={{ title: 'Profile' }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default CoachNavigation