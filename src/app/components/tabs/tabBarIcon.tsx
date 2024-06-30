import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import React from 'react';


type TabBarIconProps = {
  routeName: string;
  color: string;
  size?: number;
}

const TabBarIcon = ({ routeName, color, size = 22 }: TabBarIconProps) => {
  let iconName: string;
  let IconComponent: typeof FontAwesome5 | typeof MaterialIcons;

  switch (routeName) {
    case 'CoachHomePageStack':
      iconName = 'home';
      IconComponent = FontAwesome5;
      break;
    case 'CoachSchedulePage':
      iconName = 'calendar';
      IconComponent = FontAwesome5;
      break;
    case 'AddUserPage':
      iconName = 'user-plus';
      IconComponent = FontAwesome5;
      break;
    case 'CoachProfilePage':
      iconName = 'user';
      IconComponent = FontAwesome5;
      break;
    default:
      return null;
  }

  return <IconComponent name={iconName} size={size} color={color} />;
};

export default TabBarIcon;
