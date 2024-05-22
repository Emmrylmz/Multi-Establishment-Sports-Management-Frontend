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
    case 'PlayerHomePage':
      iconName = 'home';
      IconComponent = FontAwesome5;
      break;
    case 'PlayerProgressPage':
      iconName = 'progress';
      IconComponent = FontAwesome5;
      break;
    case 'PlayerProfilePage':
      iconName = 'user';
      IconComponent = FontAwesome5;
      break;
    case 'PlayerPaymentPage':
      iconName = 'payment';
      IconComponent = MaterialIcons;
      break;
    default:
      return null; // If no icon is applicable, return null
  }

  return <IconComponent size={size} name={iconName} color={color} />;
};

export default TabBarIcon;
