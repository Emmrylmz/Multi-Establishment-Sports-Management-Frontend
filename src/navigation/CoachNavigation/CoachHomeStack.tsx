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
import ApprovePtRequestsPage from '../../app/pages/coach/ApprovePtRequestsPage';
import CoachPtPage from '../../app/pages/coach/CoachPtPage';
import PtHistoryPage from '../../app/pages/common/PtHistoryPage';
import ApprovedPtRequestsPage from '../../app/pages/coach/ApprovedPtRequestsPage';
import DeclinedPtRequestsPage from '../../app/pages/coach/DeclinedPtRequestsPage';
import TodaysPtPage from '../../app/pages/coach/TodaysPtPage';
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
		
		<HomeStack.Screen
			name='ApprovePtRequestsPage'
			options={{ title: 'Approve PT Requests' }}
			component={ApprovePtRequestsPage}
		/>

		<HomeStack.Screen
			name='CoachPtPage'
			options={{ title: 'Coach PT Page' }}
			component={CoachPtPage}
		/>

		<HomeStack.Screen
			name='CoachPtHistoryPage'
			options={{ title: 'PT History' }}
			component={PtHistoryPage}
		/>

		<HomeStack.Screen
			name='ApprovedPtRequestsPage'
			options={{ title: 'Approved Requests' }}
			component={ApprovedPtRequestsPage}
		/>

		<HomeStack.Screen
			name='DeclinedPtRequestsPage'
			options={{ title: 'Declined Requests' }}
			component={DeclinedPtRequestsPage}
		/>
		
		<HomeStack.Screen
			name='CoachTodaysPtPage'
			options={{ title: 'Today\'s PT' }}
			component={TodaysPtPage}
		/>
	</HomeStack.Navigator>
);

export default CoachHomeStack;
