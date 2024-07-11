import { FontAwesome5, MaterialIcons, FontAwesome6 } from '@expo/vector-icons';
import React from 'react';


type TabBarIconProps = {
  routeName: string;
  color: string;
  size?: number;
}

const TabBarIcon = ({ routeName, color, size = 20 }: TabBarIconProps) => {
  let iconName: string;
  let IconComponent: typeof FontAwesome5 | typeof MaterialIcons | typeof FontAwesome6;

  switch (routeName) {
    case 'CoachHomeStack' || 'PlayerHomeStack' || 'CoachHomeStack':
      iconName = 'home';
      IconComponent = FontAwesome5;
      break;
    case 'CommonTeamStackNavigator':
      iconName = 'people-group';
      IconComponent = FontAwesome6;
      break;
    case 'AddUserPage':
      iconName = 'user-plus';
      IconComponent = FontAwesome5;
      break;
    case 'CommonProfileStack':
      iconName = 'user-alt';
      IconComponent = FontAwesome5;
      break;
    case 'ManagerPaymentStackNavigator':
      iconName = 'money-bill';
      IconComponent = FontAwesome5;
      break;
    default:
      return null;
  }

  return <IconComponent name={iconName} size={size} color={color} />;
};

export default TabBarIcon;
