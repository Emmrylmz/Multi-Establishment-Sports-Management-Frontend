import React from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import CoachTabNavigator from './CoachNavigation/CoachTabNavigator';
import ManagerTabNavigator from './Manager/ManagerTabNavigator';
import PlayerTabNavigator from './Player/PlayerTabNavigator';

// Define the type for your route params
type RoleNavigatorParams = {
  Role: {
    role: 'Coach' | 'Manager' | 'Player';
  };
};

const RoleNavigator = () => {
  const route = useRoute<RouteProp<RoleNavigatorParams, 'Role'>>();
  const { role } = route.params;

  if (role === 'Coach') return <CoachTabNavigator />;
  if (role === 'Manager') return <ManagerTabNavigator />;
  return <PlayerTabNavigator />;
};

export default RoleNavigator;
