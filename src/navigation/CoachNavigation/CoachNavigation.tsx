import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CoachHomeStack from './CoachHomeStack';
import CoachAttendanceStack from './CoachAttendanceStack';
import CoachSchedulePage from '../../app/pages/coach/CoachSchedulePage';
import AddUserPage from '../../app/pages/coach/AddUserPage';
import ProfilePage from '../../app/pages/common/ProfilePage';

const Tab = createBottomTabNavigator();

const CoachNavigation = () => {
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
        headerBackTitleVisible: true,
        headerBackTitle: 'Back',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#101010',
        },
        headerTitleStyle: {
          color: '#fff',
        },
      })}
    >
      <Tab.Screen name="CoachHomeStack" component={CoachHomeStack} options={{ title: 'Home' }} />
      <Tab.Screen name="CoachAttendanceStack" component={CoachAttendanceStack} options={{ title: 'Attendance' }} />
      <Tab.Screen name="CoachSchedulePage" component={CoachSchedulePage} options={{ title: 'Schedule' }} />
      <Tab.Screen name="AddUserPage" component={AddUserPage} options={{ title: 'Add User' }} />
      <Tab.Screen name="CoachProfilePage" component={ProfilePage} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
};

export default CoachNavigation;
