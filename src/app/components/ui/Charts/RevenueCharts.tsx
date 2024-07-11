import React from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const RevenueChart = () => {
  // Dummy data - replace with actual revenue data
  const currentMonthRevenue = 75000;
  const lastMonthRevenue = 65000;

  const data = [
    {
      name: 'Current Month',
      revenue: currentMonthRevenue,
      color: '#0D9488',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Last Month',
      revenue: lastMonthRevenue,
      color: '#99F6E4',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  return (
    <View className="bg-white rounded-xl p-4 mb-6 shadow-sm">
      <Text className="text-xl font-bold text-gray-800 mb-4">Monthly Revenue</Text>
      <View className="items-center">
        <PieChart
          data={data}
          width={300}
          height={200}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="revenue"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
      <View className="mt-4">
        <Text className="text-2xl font-bold text-center text-gray-800">
          ${currentMonthRevenue.toLocaleString()}
        </Text>
        <Text className="text-sm text-center text-gray-600">
          This Month's Revenue
        </Text>
      </View>
    </View>
  );
};

export default RevenueChart;