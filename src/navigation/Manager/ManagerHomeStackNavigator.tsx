import React from 'react';
import Home from '../../app/pages/manager/Home';	
import { ManagerHomeStack } from '../StackNavigators';
import AddUserPage from '../../app/pages/coach/AddUserPage';
import EventDetailPage from '../../app/pages/common/EventDetailPage';
import TeamDetailPage from '../../app/pages/common/TeamDetailPage';
import PlayerDetailPage from '../../app/pages/common/PlayerDetailPage';
import ManagerPlayerPaymentDetailPage from '../../app/pages/manager/MangerPlayerPaymentDetailPage';
import CreateTeamPage from '../../app/pages/manager/AddTeamPage';
import UserProfile from '../../app/components/profile/UserProfile';
import SeeIncomesPage from '../../app/pages/manager/SeeIncomesPage';
import CreateComponentPage from '../../app/pages/manager/CreateComponentPage';

const ManagerHomeStackNavigator = () => (
	<ManagerHomeStack.Navigator screenOptions={{headerShown:false}} >
		<ManagerHomeStack.Screen
			name="ManagerHomePage"
			component={Home}
		/>

    <ManagerHomeStack.Screen
			name='EventDetailPage'
			options={{title: 'Event Detail'}}
			component={EventDetailPage}
		/>
		<ManagerHomeStack.Screen 
			name='TeamDetailPage'
			options={{title: 'Team Details'}} 
			component={TeamDetailPage} 
		/>
		<ManagerHomeStack.Screen 
			name='PlayerDetailPage'
			options={{title: 'Player Details'}} 
			component={PlayerDetailPage} 
		/>
		<ManagerHomeStack.Screen 
			name='AddTeamPage'
			options={{title: 'Add New Team'}}
			component={CreateTeamPage} 
		/>
		<ManagerHomeStack.Screen 
			name='AddUserPage'
			options={{title: 'Add New User'}}
			component={AddUserPage} 
		/>
		<ManagerHomeStack.Screen 
			name='ManagerPlayerPaymentDetailPage'
			options={{title: 'Player Payment Detail'}}
			component={ManagerPlayerPaymentDetailPage}
		/>
		<ManagerHomeStack.Screen
			name='UserProfile'
			options={{title: 'User Profile'}}
			component={UserProfile}
		/>
		<ManagerHomeStack.Screen
			name='SeeIncomesPage'
			options={{title: 'Incomes',headerShown:false}}
			component={SeeIncomesPage}
		/>

		<ManagerHomeStack.Screen
			name='CreateComponentPage'
			options={{title: 'Create Component'}}
			component={CreateComponentPage}
		/>
		{/* Add manager-specific screens here */}
	</ManagerHomeStack.Navigator>
);

export default ManagerHomeStackNavigator;
