import React from 'react';
import ManagerHomePage from '../../app/pages/manager/ManagerHomePage';

import { ManagerPaymentStack } from '../StackNavigators';
import AddUserPage from '../../app/pages/coach/AddUserPage';
import ManagerPaymentPage from '../../app/pages/manager/ManagerPaymentPage';

const ManagerPaymentStackNavigator = () => (
	<ManagerPaymentStack.Navigator screenOptions={{ headerShown: false }}>
		<ManagerPaymentStack.Screen
			name="ManagerPaymentPage"
			component={ManagerPaymentPage}
		/>
		
        
		{/* Add manager-specific screens here */}
	</ManagerPaymentStack.Navigator>
);

export default ManagerPaymentStackNavigator;
