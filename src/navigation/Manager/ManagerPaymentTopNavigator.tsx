// ManagerPaymentTopNavigator.js
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ManagerPlayerPaymentDetailPage from '../../app/pages/manager/MangerPlayerPaymentDetailPage';
import ManagerOthersPayment from '../../app/pages/manager/ManagerOthersPayment';
import { SafeAreaView, View, Platform, StatusBar, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

const Tab = createMaterialTopTabNavigator();

export default function TopTabs({ route }) {
  const { t } = useTranslation();
  const { player_id, team_id, discount, monthlyPaymentAmount } = route.params;
  const insets = useSafeAreaInsets();

  const isDark = useColorScheme() === 'dark';
  

  // Minimal top padding for iOS
  const iosTopPadding = 5;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ 
        paddingTop: Platform.OS === 'ios' 
          ? Math.min(insets.top, iosTopPadding) 
          : StatusBar.currentHeight,
        flex: 1,
      }}>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: { 
              backgroundColor: isDark ? '#121212' : '#fff',
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 1,
              borderBottomColor: '#e0e0e0',
            },
            tabBarIndicatorStyle: {
              backgroundColor: '#ccc',
            },
            tabBarLabelStyle: {
              fontWeight: 'bold',
              fontSize: 14,
              color: isDark ? '#fff' : '#000',
            },
            tabBarItemStyle: {
              paddingVertical: 8, // Reduced vertical padding
              height: 40, // Fixed height for the tab bar
            },
          }}
        >
          <Tab.Screen
            name="MonthlyPayments"
            component={ManagerPlayerPaymentDetailPage}
            initialParams={{ player_id, team_id, discount, monthlyPaymentAmount }}
            options={{ title: t("managerPaymentPage.topBar.monthlyPayments") }}
          />
          <Tab.Screen
            name="OtherPayments"
            component={ManagerOthersPayment}
            initialParams={{ player_id, team_id, discount, monthlyPaymentAmount }}
            options={{ title: t("managerPaymentPage.topBar.otherPayments") }}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}