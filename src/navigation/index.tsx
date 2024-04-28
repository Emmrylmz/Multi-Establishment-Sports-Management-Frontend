import React from 'react';
import { useSelector } from 'react-redux';
import { getAuthUser } from '../features/auth/auth.slice';
import CoachNavigation from './CoachNavigation';
import PlayerNavigation from './userNavigation/PlayerNavigation';
import LoginNavigation from './LoginNavigation';

export default function AppNavigator() {
	const user = useSelector(getAuthUser);

	let NavigationComponent;

	switch (user?.role) {
		case 'Player':
			NavigationComponent = <PlayerNavigation />;
			break;
		case 'Coach':
			NavigationComponent = <CoachNavigation />;
			break;
		default:
			NavigationComponent = <LoginNavigation />;
			break;
	}

	return <>{NavigationComponent}</>;
}
