import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoachAttendanceTeamsListPage from '../../app/pages/coach/CoachAttendanceTeamsListPage';
import CoachAttendanceFormPage from '../../app/pages/coach/CoachAttendanceFormPage';
import CoachAttendanceEventSelectionPage from '../../app/pages/coach/CoachAttendanceEventSelectionPage';
import AttendancePage from '../../app/pages/coach/AttendancePage';

const AttendanceStack = createNativeStackNavigator();

const CoachAttendanceStack = () => (
  <AttendanceStack.Navigator
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
    <AttendanceStack.Screen name="CoachAttendanceTeamsListPage" options={{ title: 'Select Team to Attend' }} component={CoachAttendanceTeamsListPage} />
    <AttendanceStack.Screen name="CoachAttendanceFormPage" options={{ title: 'Send Attendances' }} component={CoachAttendanceFormPage} />
    <AttendanceStack.Screen name="CoachAttendanceEventSelectionPage" options={{ title: 'Select Event' }} component={CoachAttendanceEventSelectionPage} />
    <AttendanceStack.Screen name="AttendancePage" options={{ title: 'Attendance Page' }} component={AttendancePage} />
  </AttendanceStack.Navigator>
);

export default CoachAttendanceStack;
