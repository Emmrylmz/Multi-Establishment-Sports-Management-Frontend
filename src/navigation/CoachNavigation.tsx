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
import EventList from '../app/components/ui/Event/EventList';
import TeamDetailPage from '../app/pages/common/TeamDetailPage';
import PlayerDetailPage from '../app/pages/common/PlayerDetailPage';

const HomeStack = createNativeStackNavigator();

function CoachHomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="CoachHomePage" component={CoachHomePage} />
      <HomeStack.Screen name="CoachTeamDetail" component={CoachTeamDetail} /> 
      <HomeStack.Screen name="CoachAddTrainingPage" component={CoachAddTrainingPage} />
      <HomeStack.Screen name="TeamDetailPage" component={TeamDetailPage} /> 
      <HomeStack.Screen name="CoachTeamsPage" component={CoachTeamsPage} />
      <HomeStack.Screen name="EventDetailPage" component={EventDetailPage} />
      <HomeStack.Screen name="EventList" component={EventList} /> 
      <HomeStack.Screen name='PaymentPage' component={PaymentPage} />
      <HomeStack.Screen name='CoachNotificationPage' component={NotificationPage} />
      <HomeStack.Screen name='PlayerDetailPage' component={PlayerDetailPage} />
    </HomeStack.Navigator>
  );
}


const CoachNavigation = () => {
  const Tab = createBottomTabNavigator()
  return (
    <Tab.Navigator 
    initialRouteName='CoachHomePageStack'
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => (
        <TabBarIcon routeName={route.name} color={color} size={size} />
      ),
      tabBarActiveTintColor: '#fff',
      tabBarInactiveTintColor: '#919191',
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#101010',
        borderTopWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
      },
    })}
  >
    <Tab.Screen name='CoachHomePageStack' component={CoachHomeStackScreen} options={{ title: 'Home'}} />
    <Tab.Screen name='CoachSchedulePage' component={CoachSchedulePage} options={{ title: 'Schedule' }} />
    <Tab.Screen name='AddUserPage' component={AddUserPage} options={{ title: 'Add User' }} />
    <Tab.Screen name='CoachProfilePage' component={ProfilePage} options={{ title: 'Profile' }} />
  </Tab.Navigator>
  )
}

export default CoachNavigation