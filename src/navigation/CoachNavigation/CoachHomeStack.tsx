import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoachHomePage from '../../app/pages/coach/CoachHomePage';
import CoachAddTrainingPage from '../../app/pages/coach/CoachAddTrainingPage';
import EventDetailPage from '../../app/pages/common/EventDetailPage';
import NotificationPage from '../../app/pages/common/NotificationPage';
import UserProfile from '../../app/components/profile/UserProfile';
import TeamCreationPage from '../../app/pages/common/TeamCreationPage';
import EventHistoryPage from '../../app/pages/common/EventHistoryPage';
import TakeAttendance from '../../app/components/ui/attendance/TakeAttendance';
import CoachNotesPage from '../../app/pages/common/CoachNotesPage';
const HomeStack = createNativeStackNavigator();

const CoachHomeStack = () => (
	<HomeStack.Navigator
		screenOptions={{
			headerShown: false,
		}}
	>
		<HomeStack.Screen
			name="CoachHomePage"
			options={{ title: 'Home Page' }}
			component={CoachHomePage}
		/>
		
		<HomeStack.Screen
			name="CoachAddTrainingPage"
			options={{ title: 'Add Training' }}
			component={CoachAddTrainingPage}
		/>
		<HomeStack.Screen
			name="EventDetailPage"
			options={{ title: 'Event Detail' }}
			component={EventDetailPage}
		/>
		<HomeStack.Screen
			name="CoachNotificationPage"
			options={{ title: 'Send Notification' }}
			component={NotificationPage}
		/>
		<HomeStack.Screen
			name="TeamCreationPage"
			options={{ title: 'Create Team' }}
			component={TeamCreationPage}
		/>
		<HomeStack.Screen
			name="UserProfile"
			options={{ title: 'User Profile' }}
			component={UserProfile}
		/>
		<HomeStack.Screen
			name="EventHistory"
			options={{ title: 'Event History' }}
			component={EventHistoryPage}
		/>

		<HomeStack.Screen
			name="TakeAttendance"
			options={{ title: 'Attendance Section' }}
			component={TakeAttendance}
		/>
		<HomeStack.Screen
			name="CoachNotesPage"
			options={{ title: 'Coach Notes Page' }}
			component={CoachNotesPage}
		/>
	</HomeStack.Navigator>
);

export default CoachHomeStack;
