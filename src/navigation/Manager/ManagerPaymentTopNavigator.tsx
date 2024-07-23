// ManagerPaymentTopNavigator.js
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ManagerPlayerPaymentDetailPage from '../../app/pages/manager/MangerPlayerPaymentDetailPage';
import ManagerOthersPayment from '../../app/pages/manager/ManagerOthersPayment';
import { SafeAreaView, Text, View } from 'react-native';

const Tab = createMaterialTopTabNavigator();

export default function TopTabs({ route }) {
	const { player_id, team_id, discount, monthlyPaymentAmount } = route.params;

	return (
			<Tab.Navigator>
				<Tab.Screen
					name="MonthlyPayments"
					component={ManagerPlayerPaymentDetailPage}
					initialParams={{ player_id, team_id, discount, monthlyPaymentAmount }}
					options={{ title: 'Monthly Payments' }}
				/>
				<Tab.Screen
					name="OtherPayments"
					component={ManagerOthersPayment}
					options={{ title: 'Other Payments' }}
				/>
			</Tab.Navigator>
	);
}
