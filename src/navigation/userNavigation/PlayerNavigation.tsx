import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../../app/components/tabs/tabBarIcon';
import PlayerProgressPage from '../../app/pages/player/PlayerProgressPage';
import PlayerPaymentPage from '../../app/pages/player/PlayerPaymentPage';
import ProfilePage from '../../app/pages/common/ProfilePage';
// import PushToken from '../../app/pages/PushToken/PushToken';
import CoachHomePage from '../../app/pages/coach/CoachHomePage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventDetailPage from '../../app/pages/common/EventDetailPage';
import EventList from '../../app/components/ui/Event/EventList';
import PaymentPage from '../../app/pages/common/PaymentPage';
import { navigationRef } from '../rootNavigation';
import PlayerHomePage from '../../app/pages/player/PlayerHomePage';
import AttendancePage from '../../app/pages/common/AttendancePage';


const SStack = createNativeStackNavigator();

function PlayerHomeStackScreen() {
  return (
    <SStack.Navigator initialRouteName='PlayerHomePage' screenOptions={{ headerShown: false }}>
      <SStack.Screen name="PlayerHomePage" component={PlayerHomePage} />
      <SStack.Screen name="EventDetailPage" component={EventDetailPage} />
      <SStack.Screen name="EventList" component={EventList} /> 
      <SStack.Screen name='PaymentPage' component={PaymentPage} />
      <SStack.Screen name='AttendancePage' component={AttendancePage} />
    </SStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const PlayerNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="PlayerProgressPage"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) =>
          TabBarIcon({ routeName: route.name, color, size }),
        tabBarActiveTintColor: '#A8FF97',
        tabBarInactiveTintColor: '#828282',
        headerShown: false,
      })}
    >
	  <Tab.Screen
	  	name="PlayerHomeStackScreen"
		component={PlayerHomeStackScreen}
		options={{title:"Home"}} />
      <Tab.Screen
        name="PlayerProgress"
        component={PlayerProgressPage}
        options={{ title: 'Progress' }}
      />
      <Tab.Screen
        name="PlayerPayments"
        component={PlayerPaymentPage}
        options={{ title: 'Payments' }}
      />
      <Tab.Screen
        name="PlayerProfile"
        component={ProfilePage}
        options={{ title: 'Profile' }}
      />
      {/* <Tab.Screen
        name="PushNotifications"
        component={PushToken}
        options={{ title: 'Notifications' }}
      /> */}
    </Tab.Navigator>
  );
};

export default PlayerNavigation;
