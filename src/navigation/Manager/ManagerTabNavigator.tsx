import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Tab } from '../StackNavigators';
import { TabBarIcon } from '../../app/components';
import ManagerHomeStackNavigator from './ManagerHomeStackNavigator';
import { CommonTeamStackNavigator } from '../Common/CommonTeamStackNavigator';
import { CommonProfileStackNavigator } from '../Common/CommonProfileStack';
import ManagerPaymentStackNavigator from './ManagerPaymentStackNavigator';

const ManagerTabNavigator = () => (
	<Tab.Navigator
		initialRouteName="CoachHomeStack"
		screenOptions={({ route }) => ({
			tabBarIcon: ({ color, size }) => (
				<TabBarIcon routeName={route.name} color={color} size={size} />
			),
			tabBarActiveTintColor: '#fff',
			tabBarInactiveTintColor: '#919191',
			tabBarStyle: {
				backgroundColor: '#101010',
				borderTopWidth: 0,
				elevation: 0,
				shadowOpacity: 0,
			},
			headerShown: false,
		})}
	>
		<Tab.Screen
			name="CoachHomeStack"
			component={ManagerHomeStackNavigator}
			options={{ title: 'Home' }}
		/>
		<Tab.Screen
			name="CommonTeamStackNavigator"
			component={CommonTeamStackNavigator}
			options={{ title: 'Teams' }}
		/>

		<Tab.Screen
			name="ManagerPaymentStackNavigator"
			options={{ title: 'See Payments' }}
			component={ManagerPaymentStackNavigator}
		/>

		<Tab.Screen
			name="CommonProfileStack"
			component={CommonProfileStackNavigator}
			options={{ title: 'Profile' }}
		/>
	</Tab.Navigator>
);

export default ManagerTabNavigator;
