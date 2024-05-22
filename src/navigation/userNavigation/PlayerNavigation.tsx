import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import PlayerHomePage from '../../app/pages/player/PlayerHomePage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../../app/components/tabs/tabBarIcon';
import PlayerProgressPage from '../../app/pages/player/PlayerProgressPage';
import PlayerPaymentPage from '../../app/pages/player/PlayerPaymentPage';
import ProfilePage from '../../app/pages/common/ProfilePage';
// import OnboardingScreen from '../../app/pages/OnBoarding/OnBoardingScreen';
import PushToken from '../../app/pages/PushToken/PushToken';
const PlayerNavigation = () => {
	const Tab = createBottomTabNavigator();
	return (
				<Tab.Navigator
					initialRouteName="Login"
					screenOptions={({ route }) => ({
						tabBarIcon: ({ color, size }) =>
							TabBarIcon({ routeName: route.name, color, size }),
						tabBarActiveTintColor: '#A8FF97',
						tabBarInactiveTintColor: '#828282',
						headerShown: false,
					})}
				>
					<Tab.Screen
						name="PlayerHomePage"
						component={PlayerHomePage}
						options={{ title: 'Home' }}
					/>
					<Tab.Screen
						name="PlayerPaymentPage"
						component={PlayerPaymentPage}
						options={{ title: 'Profile' }}
					/>
					<Tab.Screen
						name="PlayerProgressPage"
						component={PlayerProgressPage}
						options={{ title: 'Profile' }}
					/>
					<Tab.Screen
						name="PlayerProfilePage"
						component={ProfilePage}
						options={{ title: 'Profile' }}
					/>
					<Tab.Screen
						name="PushToken"
						component={PushToken}
						options={{ title: 'token' }}
					/>
				</Tab.Navigator>
	);
};

export default PlayerNavigation;
