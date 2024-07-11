import AttendancePage from '../../app/pages/coach/AttendancePage';
import EventDetailPage from '../../app/pages/common/EventDetailPage';
import PlayerHomePage from '../../app/pages/player/PlayerHomePage';
import { PlayerHomeStack } from '../StackNavigators';
function PlayerHomeStackNavigator() {
	return (
		<PlayerHomeStack.Navigator
			initialRouteName="PlayerHomePage"
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
			<PlayerHomeStack.Screen
				name="PlayerHomePage"
				options={{ title: 'Home Page' }}
				component={PlayerHomePage}
			/>
			<PlayerHomeStack.Screen
				name="EventDetailPage"
				options={{ title: 'Event Detail' }}
				component={EventDetailPage}
			/>
			<PlayerHomeStack.Screen
				name="AttendancePage"
				options={{ title: 'Attendance Page' }}
				component={AttendancePage}
			/>
		</PlayerHomeStack.Navigator>
	);
}

export default PlayerHomeStackNavigator;
