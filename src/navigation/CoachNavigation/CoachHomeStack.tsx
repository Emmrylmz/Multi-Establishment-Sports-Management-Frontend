import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoachHomePage from '../../app/pages/coach/CoachHomePage';
import CoachAddTrainingPage from '../../app/pages/coach/CoachAddTrainingPage';
import CoachTeamsPage from '../../app/pages/coach/CoachTeamsPage';
import EventDetailPage from '../../app/pages/common/EventDetailPage';
import PaymentPage from '../../app/pages/common/PaymentPage';
import NotificationPage from '../../app/pages/common/NotificationPage';
import PlayerDetailPage from '../../app/pages/common/PlayerDetailPage';
import AttendancePage from '../../app/pages/coach/AttendancePage';
import TeamDetail from '../../app/pages/common/TeamDetailPage';

const HomeStack = createNativeStackNavigator();

const CoachHomeStack = () => (
  <HomeStack.Navigator
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
    }}
  >
    <HomeStack.Screen name="CoachHomePage" options={{ title: 'Home Page' }} component={CoachHomePage} />
    <HomeStack.Screen name="CoachTeamDetail" options={{ title: 'Team Detail Page' }} component={TeamDetail} />
    <HomeStack.Screen name="CoachAddTrainingPage" options={{ title: 'Add Training' }} component={CoachAddTrainingPage} />
    {/* <HomeStack.Screen name="TeamDetailPage" options={{ title: 'Team Detail' }} component={TeamDetailPage} /> */}
    <HomeStack.Screen name="CoachTeamsPage" options={{ title: 'All Teams' }} component={CoachTeamsPage} />
    <HomeStack.Screen name="EventDetailPage" options={{ title: 'Event Detail' }} component={EventDetailPage} />
    <HomeStack.Screen name="PaymentPage" options={{ title: 'Payment History' }} component={PaymentPage} />
    <HomeStack.Screen name="CoachNotificationPage" options={{ title: 'Send Notification' }} component={NotificationPage} />
    <HomeStack.Screen name="PlayerDetailPage" options={{ title: 'See Player Detail' }} component={PlayerDetailPage} />
    <HomeStack.Screen name="CoachAttendancePage" options={{ title: 'Attendance Page' }} component={AttendancePage} />
  </HomeStack.Navigator>
);

export default CoachHomeStack;
