import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tab } from '../StackNavigators';
import { TabBarIcon } from '../../app/components';
import ManagerHomeStackNavigator from './ManagerHomeStackNavigator';
import { CommonTeamStackNavigator } from '../Common/CommonTeamStack';
import { CommonProfileStackNavigator } from '../Common/CommonProfileStack';
import ManagerPaymentStackNavigator from './ManagerPaymentStackNavigator';
import AdminPanelPage from '../../app/pages/manager/AdminPanelPage';
import ManagerPaymentTabNavigator from './ManagerPaymentTabNavigator';

const ManagerTabNavigator = () => {
	const { t } = useTranslation();
	return (
		<Tab.Navigator
		initialRouteName="CoachHomeStack"
		screenOptions={({ route }) => ({
			tabBarIcon: ({ color, size }) => (
				<TabBarIcon routeName={route.name} color={color} size={size} />
			),
			tabBarActiveTintColor: '#fff',
			tabBarInactiveTintColor: '#919191',
			headerShown: false,
			tabBarStyle: {
				backgroundColor: '#101010',
				borderTopWidth: 0,
				elevation: 0,
				shadowOpacity: 0,
			},
		})}
	>
		<Tab.Screen
			name="CoachHomeStack"
			component={ManagerHomeStackNavigator}
			options={{ title: t("tabNavigator.home") }}
		/>
		<Tab.Screen
			name="Teams"
			component={CommonTeamStackNavigator}
			options={{ title: t("tabNavigator.teams") }}
		/>

		<Tab.Screen
			name="ManagerPaymentStackNavigator"
			options={{ title: t("tabNavigator.payments") }}
			initialParams={{ player_id: '123' }}
			component={ManagerPaymentTabNavigator}
		/>

		<Tab.Screen
			name="CommonProfileStack"
			component={CommonProfileStackNavigator}
			options={{ title: t("tabNavigator.profile") }}
		/>

		<Tab.Screen
			name="AdminPanelPage"
			component={AdminPanelPage}
			options={{ title: "admin Panel" }}
		/>
	</Tab.Navigator>
	)
};

export default ManagerTabNavigator;
