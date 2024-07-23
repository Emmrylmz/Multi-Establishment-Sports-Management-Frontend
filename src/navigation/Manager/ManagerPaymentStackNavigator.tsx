import React from 'react';
import ManagerHomePage from '../../app/pages/manager/ManagerHomePage';

import { ManagerPaymentStack } from '../StackNavigators';
import AddUserPage from '../../app/pages/coach/AddUserPage';
import ManagerPaymentPage from '../../app/pages/manager/ManagerPaymentPage';
import TopTabs from './ManagerPaymentTopNavigator';

const ManagerPaymentStackNavigator = () => (
	<ManagerPaymentStack.Navigator screenOptions={{ headerShown: false }}>
		<ManagerPaymentStack.Screen
			name="ManagerPaymentPage"
			component={ManagerPaymentPage}
		/>
		<ManagerPaymentStack.Screen  name="PlayerPayments" component={TopTabs} />
		{/* Add manager-specific screens here */}
	</ManagerPaymentStack.Navigator>
);

export default ManagerPaymentStackNavigator;
