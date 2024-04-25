import React from 'react';
import CoachNavigation from './CoachNavigation';
import LoginNavigation from './LoginNavigation';
import PlayerNavigation from './PlayerNavigation';
import { useSelector } from 'react-redux';
import { getAuthUser } from '../features/auth/auth.slice';
export default function AppNavigator() {
	const user = useSelector(getAuthUser);

	switch (user?.role) {
		case 'Player':
			return <PlayerNavigation />;
		case 'Coach':
			return <CoachNavigation />;
		default:
			return <LoginNavigation />;
	}
}
