import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../../app/components/tabs/tabBarIcon';
import PlayerProgressPage from '../../app/pages/player/PlayerProgressPage';
import PlayerPaymentPage from '../../app/pages/player/PlayerPaymentPage';
import ProfilePage from '../../app/pages/common/ProfilePage';
// import PushToken from '../../app/pages/PushToken/PushToken';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventDetailPage from '../../app/pages/common/EventDetailPage';
import PaymentPage from '../../app/pages/common/PaymentPage';
import PlayerHomePage from '../../app/pages/player/PlayerHomePage';
import AttendancePage from '../../app/pages/coach/AttendancePage';
import TeamsPage from '../../app/pages/common/TeamsPage';
import TeamDetailPage from '../../app/pages/common/TeamDetailPage';
import PushToken from '../../app/pages/PushToken/PushToken';


const SStack = createNativeStackNavigator();

function PlayerHomeStackScreen() {
  return (
    <SStack.Navigator 
      initialRouteName='PlayerHomePage'
      screenOptions={{
        headerBackTitleVisible: true,
        headerBackTitle: 'Back',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#101010',
        },
        headerTitleStyle: {
          color: '#fff',
        },
      }}>
      <SStack.Screen name="PlayerHomePage" options={{title: 'Home Page'}} component={PlayerHomePage} />
      <SStack.Screen name="EventDetailPage" options={{title: 'Event Detail'}} component={EventDetailPage} />
      <SStack.Screen name='PaymentPage' options={{title: 'Payment History'}} component={PaymentPage} />
      <SStack.Screen name='AttendancePage' options={{title: 'Attendance Page'}} component={AttendancePage} />
      <SStack.Screen name='TeamsPage' options={{title: 'All Teams'}} component={TeamsPage} />
      <SStack.Screen name='TeamDetailPage' options={{title: 'Team Detail'}} component={TeamDetailPage} />
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
          TabBarIcon({ routeName: route.name, color, size, }),
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
      <Tab.Screen
        name="PushNotifications"
        component={PushToken}
        options={{ title: 'Notifications' }}
      />
    </Tab.Navigator>
  );
};

export default PlayerNavigation;
