import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabBarIcon from '../app/components/tabs/tabBarIcon';
import CoachHomePage from '../app/pages/coach/CoachHomePage';
import CoachSchedulePage from '../app/pages/common/TeamListPage';
import AddUserPage from '../app/pages/coach/AddUserPage';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfilePage from '../app/pages/common/ProfilePage';
import CoachAddTrainingPage from '../app/pages/coach/CoachAddTrainingPage';
import EventDetailPage from '../app/pages/common/EventDetailPage';
import PaymentPage from '../app/pages/common/PaymentPage';
import NotificationPage from '../app/pages/common/NotificationPage';
import PlayerDetailPage from '../app/pages/common/PlayerDetailPage';
import AttendancePage from '../app/pages/coach/AttendancePage';
import CoachAttendanceTeamsListPage from '../app/pages/coach/CoachAttendanceTeamsListPage';
import CoachAttendanceFormPage from '../app/pages/coach/CoachAttendanceFormPage';
import CoachAttendanceEventSelectionPage from '../app/pages/coach/CoachAttendanceEventSelectionPage';
import TeamCreationPage from '../app/pages/common/TeamCreationPage';
import TeamDetail from '../app/pages/common/TeamDetailPage';
import ProfileContainer from '../app/components/profile/ProfileContainer';
import EventHistory from '../app/components/ui/Home/EventHistory';
import EventHistoryPage from '../app/pages/common/EventHistoryPage';
import TeamListPage from '../app/pages/common/TeamListPage';
import UserProfile from '../app/components/profile/UserProfile';
import TakeAttendance from '../app/components/ui/attendance/TakeAttendance';
const HomeStack = createNativeStackNavigator();
function CoachHomeStackScreen() {
  return (
    <HomeStack.Navigator
    screenOptions={{
      // headerBackTitleVisible: true,
      // headerBackTitle: 'Back',
      // headerTintColor: '#fff',
      // headerStyle: {
      //   backgroundColor: '#101010',
      // },
      // headerTitleStyle: {
      //   color: '#fff',
      // },
      headerShown: false
    }}

    >
      <HomeStack.Screen name="CoachHomePage" options={{title: 'Home Page'}} component={CoachHomePage}  />
      <HomeStack.Screen name="TeamDetail" options={{title: 'Team Detail Page'}} component={TeamDetail} /> 
      <HomeStack.Screen name="CoachAddTrainingPage" options={{title: 'Add Training'}} component={CoachAddTrainingPage} />
      <HomeStack.Screen name="EventDetailPage" options={{title: 'Event Detail'}} component={EventDetailPage} />
      <HomeStack.Screen name='PaymentPage' options={{title: 'Payment History'}} component={PaymentPage} />
      <HomeStack.Screen name='CoachNotificationPage' options={{title: 'Send Notification'}} component={NotificationPage} />
      <HomeStack.Screen name='PlayerDetailPage' options={{title: 'See Player Detail'}} component={PlayerDetailPage} />
      <HomeStack.Screen name='CoachAttendancePage' options={{title: 'Attendance Page'}} component={AttendancePage} />
      <HomeStack.Screen name='CoachAttendanceTeamsListPage' options={{title: 'Select team to Addend'}} component={CoachAttendanceTeamsListPage} />
      <HomeStack.Screen name='CoachAttendanceFormPage' options={{title: 'Send Attendances'}} component={CoachAttendanceFormPage}/>
      <HomeStack.Screen name='CoachAttendanceEventSelectionPage' options={{title: 'Select event'}} component={CoachAttendanceEventSelectionPage}/>
      <HomeStack.Screen name='TeamCreationPage' options={{title: 'Create Team'}} component={TeamCreationPage} /> 
      <HomeStack.Screen name='ProfileContainer' options={{title: 'Profile Container'}} component={ProfileContainer} /> 
      <HomeStack.Screen name='UserProfile' options={{title: 'User Profile'}} component={UserProfile} /> 
      <HomeStack.Screen name='EventHistory' options={{title: 'Event History'}} component={EventHistory} /> 
      <HomeStack.Screen name='EventHistoryPage' options={{title: 'Event History Page'}} component={EventHistoryPage} /> 
      <HomeStack.Screen name='TakeAttendance' options={{title: 'Attendance Section'}} component={TakeAttendance} /> 
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
    <Tab.Screen name='CoachHomePageStack' component={CoachHomeStackScreen} options={{ title: 'Home',headerShown:false}} />
    <Tab.Screen name='CoachSchedulePage' component={TeamListPage} options={{ title: 'Teams',headerShown:false }} />
    <Tab.Screen name='AddUserPage' component={AddUserPage} options={{ title: 'Add User',headerShown:false }} />
    <Tab.Screen name='CoachProfilePage' component={ProfilePage} options={{ title: 'Profile',headerShown:false }} />
  </Tab.Navigator>
  )
}

export default CoachNavigation