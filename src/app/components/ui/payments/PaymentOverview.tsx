import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
type PaymentOverviewProps = {
  totalPaid: number;
  totalPayment: number;
}
const PaymentOverview = ({totalPaid,totalPayment}: PaymentOverviewProps) => {
  return (
    <LinearGradient
    colors={['#10B981', '#059669', '#047857']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    className="p-6 m-4 shadow-lg rounded-3xl"
  >
    <Text className="mb-6 text-2xl font-bold text-white">Payment Overview</Text>
    <View className="flex-row items-center justify-between">
      <View className="items-center">
        <MaterialCommunityIcons name="cash-check" size={32} color="#ffffff" />
        <Text className="mt-2 text-white opacity-80">Total Paid</Text>
        <Text className="mt-1 text-2xl font-bold text-white">{totalPaid}₺</Text>
      </View>
      <View className="w-px h-16 bg-white opacity-50" />
      <View className="items-center">
        <MaterialCommunityIcons name="credit-card-clock" size={32} color="#ffffff" />
        <Text className="mt-2 text-white opacity-80">Remaining</Text>
        <Text className="mt-1 text-2xl font-bold text-white">{totalPayment - totalPaid}₺</Text>
      </View>
    </View>
  </LinearGradient>
  )
}

export default PaymentOverview