import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tab } from '../StackNavigators';
import { TabBarIcon } from '../../app/components';
import { CommonTeamStackNavigator } from '../Common/CommonTeamStack';
import { CommonProfileStackNavigator } from '../Common/CommonProfileStack';
import PlayerHomeStackNavigator from './PlayerHomeStackNavigator';
import PlayerPaymentPage from '../../app/pages/player/PlayerPaymentPage';
import { useColorScheme } from 'react-native';
import ManagerPlayerPaymentDetailPage from '../../app/pages/manager/MangerPlayerPaymentDetailPage';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { getAuthUser } from '../../features/auth/auth.slice';
import PlayerProgressPage from '../../app/pages/player/PlayerProgressPage';

const PlayerTabNavigator = () => {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const colors = {
    background: isDarkMode ? '#101010' : '#FFFFFF',
    border: isDarkMode ? '#333333' : '#E0E0E0',
    activeTab: isDarkMode ? '#fff' : '#101010' ,  // A more vibrant green for active tab
    inactiveTab: isDarkMode ? '#777777' : '#BBBBBB',
  };
  const user = useSelector((state: RootState) => getAuthUser(state));
  return (
    <Tab.Navigator
      initialRouteName="PlayerProgressPage"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) =>
          TabBarIcon({ routeName: route.name, color: focused ? colors.activeTab : color, size }),
        tabBarActiveTintColor: colors.activeTab,
        tabBarInactiveTintColor: colors.inactiveTab,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen
        name="PlayerHomeStackScreen"
        component={PlayerHomeStackNavigator}
        options={{ title: t("tabNavigator.home") }}
      />
      <Tab.Screen
        name="Teams"
        component={PlayerProgressPage}
        options={{ title: t("tabNavigator.progress") }}
      />
      <Tab.Screen
        name="PlayerPayments"
        component={ManagerPlayerPaymentDetailPage}
        initialParams={{player_id: user?._id,dues: 2000}}
        options={{ title: t("tabNavigator.payments")}}
      />
      <Tab.Screen
        name="PlayerProfile"
        component={CommonProfileStackNavigator}
        options={{ title: t("tabNavigator.profile") }}
      />
    </Tab.Navigator>
  );
};

export default PlayerTabNavigator;