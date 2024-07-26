import React, { useState } from 'react';
import { View, Text, Dimensions, useColorScheme } from 'react-native';
import { useTranslation } from 'react-i18next';
import { PieChart, BarChart, LineChart } from 'react-native-chart-kit';
import { Dropdown } from 'react-native-element-dropdown';
import { useGetMonthlyRevenueQuery } from '../../../../features/query/paymentQueryService';

const { width } = Dimensions.get('window');
const chartWidth = width - 40;

const RevenueCard = () => {
  const { t } = useTranslation();
  const [chartType, setChartType] = useState('pie');
  const { data: monthlyRevenue } = useGetMonthlyRevenueQuery({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const isDark = useColorScheme() === 'dark';

  console.log(monthlyRevenue);

  // Dummy data - replace with actual revenue data
  const weeklyData = [
    { week: 'Week 1', revenue: 18000 },
    { week: 'Week 2', revenue: 22000 },
    { week: 'Week 3', revenue: 17000 },
    { week: 'Week 4', revenue: 23000 },
  ];

  const totalRevenue = weeklyData.reduce((sum, week) => sum + week.revenue, 0);
  const lastWeekRevenue = weeklyData[weeklyData.length - 1].revenue;

  const pieData = [
    {
      name: 't("revenueCard.thisWeek")',
      revenue: lastWeekRevenue,
      color: '#1E8449', // A darker green
      legendFontColor: '#64748B',
      legendFontSize: 12,
    },
    {
      name: 't("revenueCard.lastMonth")',
      revenue: totalRevenue - lastWeekRevenue,
      color: '#82E0AA', // A much lighter green
      legendFontColor: '#64748B',
      legendFontSize: 12,
    },
  ];
  const barData = {
    labels: weeklyData.map(item => item.week),
    datasets: [{ data: weeklyData.map(item => item.revenue) }],
  };

  const lineData = {
    labels: weeklyData.map(item => item.week),
    datasets: [{ data: weeklyData.map(item => item.revenue) }],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(30, 132, 73, 0.8)`, // Fixed higher opacity
    labelColor: (opacity = 1) => `rgba(39, 174, 96, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.6,
    useShadowColorFromDataset: false,
    propsForLabels: {
      fontSize: 10,
    },
  };
  const chartTypes = [
    { label: 'Pie Chart', value: 'pie' },
    { label: 'Bar Chart', value: 'bar' },
    { label: 'Line Chart', value: 'line' },
  ];

  const renderChart = () => {
    switch (chartType) {
      case 'pie':
        return (
          <PieChart
            data={pieData}
            width={chartWidth}
            height={200}
            chartConfig={chartConfig}
            accessor="revenue"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        );
      case 'bar':
        return (
          <BarChart
            data={barData}
            width={chartWidth}
            height={200}
            yAxisLabel="$"
            chartConfig={chartConfig}
            fromZero
            showBarTops={false}
          />
        );
      case 'line':
        return (
          <LineChart
            data={lineData}
            width={chartWidth}
            height={200}
            yAxisLabel="$"
            chartConfig={chartConfig}
            bezier
          />
        );
      default:
        return null;
    }
  };
  

  return (
    <View className="p-6 mb-6 bg-white shadow-lg dark:bg-gray-800 rounded-2xl">
      <Text className="mb-6 text-2xl font-semibold text-gray-800 dark:text-gray-200">{t("revenueCard.title")}</Text>
      <View className="mb-6">
      <Dropdown
        data={chartTypes}
        labelField="label"
        valueField="value"
        value={chartType}
        onChange={item => setChartType(item.value)}
        placeholder="Select Chart Type"
        className="p-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
        placeholderStyle={{
          color: '#9ca3af',
        }}
        selectedTextStyle={{
          color: isDark ? '#e5e7eb' : '#1f2937',
          fontWeight: '500',
        }}
        containerStyle={{
          backgroundColor: isDark ? '#1f2937' : '#ffffff',
          borderColor: isDark ? '#374151' : '#e5e7eb',
          borderWidth: 1,
          borderRadius: 8,
        }}
        activeColor={isDark ? '#374151' : '#EEF2FF'}
        itemTextStyle={{
          color: isDark ? '#e5e7eb' : '#1f2937',
        }}
        style={{
          backgroundColor: isDark ? '#1f2937' : '#ffffff',
        }}
      />

      </View>
      <View className="items-center mb-6">{renderChart()}</View>
      <View className="mt-4">
        <Text className="text-3xl font-bold text-center text-dacka-green dark:text-dacka-light-green">
          ${totalRevenue.toLocaleString()}
        </Text>
        <Text className="mt-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          { t("revenueCard.totalRevenue")}
        </Text>
      </View>
    </View>
  );
};

export default RevenueCard;