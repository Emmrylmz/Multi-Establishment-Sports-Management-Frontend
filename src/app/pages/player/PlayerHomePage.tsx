import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../../components/ui/Footer';

const ManagerDashboard = ({ navigation }) => {
  const dashboardOptions = [
    { title: 'Monthly Revenue', icon: 'bar-chart', route: 'MonthlyRevenue' },
    { title: 'Revenue by Month Range', icon: 'calendar', route: 'RevenueByMonthRange' },
    { title: 'Revenue by Team ID', icon: 'people', route: 'RevenueByTeamId' },
    { title: 'Yearly Revenue', icon: 'pie-chart', route: 'YearlyRevenue' },
  ];

  const handleOptionPress = (route) => {
    navigation.navigate(route);
  };

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView>
        <View className="bg-white pt-12 pb-6 px-4 rounded-b-3xl shadow-md">
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-1">
              <Text className="text-sm text-gray-500">Financial Dashboard</Text>
              <Text className="text-2xl font-bold text-gray-800">Manager Overview</Text>
            </View>
            <TouchableOpacity
              className="bg-teal-100 rounded-full p-3"
              onPress={() => {/* Handle press */}}
            >
              <Ionicons name="settings-outline" size={24} color="#0D9488" />
            </TouchableOpacity>
          </View>
        </View>
        
        <View className="px-4 mt-6 mb-8">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</Text>
          <View className="flex-row flex-wrap justify-between">
            {dashboardOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                className="bg-white rounded-xl p-4 mb-4 shadow-sm w-[48%]"
                onPress={() => handleOptionPress(option.route)}
              >
                <View className="bg-teal-100 rounded-full p-2 w-12 h-12 items-center justify-center mb-2">
                  <Ionicons name={option.icon} size={24} color="#0D9488" />
                </View>
                <Text className="text-sm font-medium text-gray-800">{option.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      
    </View>
  );
};

export default ManagerDashboard;