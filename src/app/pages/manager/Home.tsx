import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/ui/Home/Header';
import QuickActions from '../../components/ui/Home/QuickActions';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { getAuthUser } from '../../../features/auth/auth.slice';
import RevenueCharts from '../../components/ui/Charts/RevenueCharts';
import RevenueCard from '../../components/ui/payments/RevenueCard';

const ManagerHomePage = () => {
  const navigation = useNavigation();
    const user = useSelector((state: RootState) => getAuthUser(state));
    const chartData = {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43]
        }
      ]
    };
  return (
    <ScrollView className="bg-gray-100">
      <Header user={user} navigation={navigation} />
      <RevenueCard />
      <View className="px-4 py-6">
        <QuickActions user={user} />
      </View>
    </ScrollView>
  );
};

export default ManagerHomePage;