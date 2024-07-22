import { Tab } from '../StackNavigators';
import { View, Text } from 'react-native'
import React from 'react'
import ManagerPlayerPaymentDetailPage from '../../app/pages/manager/MangerPlayerPaymentDetailPage';

const ManagerPaymentTabNavigator = () => {
  return (
   <Tab.Navigator>
      <Tab.Screen
        name='PaymentPage'
        component={ManagerPlayerPaymentDetailPage}
        initialParams={{player_id: '123'}}
        options={{ title: 'Payment'}}
      />
   </Tab.Navigator>
  )
}

export default ManagerPaymentTabNavigator