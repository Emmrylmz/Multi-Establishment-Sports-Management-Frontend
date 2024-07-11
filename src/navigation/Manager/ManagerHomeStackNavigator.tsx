import React from 'react';
import Home from '../../app/pages/manager/Home';	
import { ManagerHomeStack } from '../StackNavigators';
import AddUserPage from '../../app/pages/coach/AddUserPage';

const ManagerHomeStackNavigator = () => (
	<ManagerHomeStack.Navigator screenOptions={{ headerShown: false }}>
		<ManagerHomeStack.Screen
			name="ManagerHomePage"
			component={Home}
		/>
		<ManagerHomeStack.Screen
			name="AddUserPage"
			component={AddUserPage}
		/>
        
		{/* Add manager-specific screens here */}
	</ManagerHomeStack.Navigator>
);

export default ManagerHomeStackNavigator;
