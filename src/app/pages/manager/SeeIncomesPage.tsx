import React, { useRef, useState, useEffect } from 'react';
import {SafeAreaView, View, Text, ScrollView, useColorScheme, Animated, Dimensions } from 'react-native';
import RevenueCharts from '../../components/ui/Charts/RevenueCharts';
import {useGetRevenueByMonthRangeQuery} from '../../../features/query/paymentQueryService';

const { width, height } = Dimensions.get('window');

const SeeIncomesPage = () => {
  const [rangelyRevenueState] = useState({
    year: new Date().getFullYear(),
    start_month: 0,
    end_month: 11
  });
  // const { data, isLoading, isError } = useGetRevenueByMonthRangeQuery(rangelyRevenueState);
  // console.log('ranglelyRevenueData:', data);

  // Dummy data for rangely (quarterly) revenue
  const dummyRangelyData = {
    months: [
      { month: 0, revenue: 5000 },
      { month: 1, revenue: 6000 },
      { month: 2, revenue: 4500 },
      { month: 3, revenue: 7000 },
      { month: 4, revenue: 8000 },
      { month: 5, revenue: 7500 },
      { month: 6, revenue: 9000 },
      { month: 7, revenue: 10000 },
      { month: 8, revenue: 9500 },
      { month: 9, revenue: 11000 },
      { month: 10, revenue: 12000 },
      { month: 11, revenue: 13000 }
    ]
  };

  const isDark = useColorScheme() === 'dark';
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });

  const getMonthName = (monthNumber) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[monthNumber];
  };

  const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{ data: [20, 45, 28, 80, 99, 43] }]
  };

  const yearlyData = {
    labels: ["2019", "2020", "2021", "2022", "2023"],
    datasets: [{ data: [300, 450, 280, 800, 990] }]
  };

  const quarterlyData = {
    labels: dummyRangelyData.months.map(item => getMonthName(item.month)),
    datasets: [{ data: dummyRangelyData.months.map(item => item.revenue) }]
  };

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Animated.View 
        className={`${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}
        style={{ transform: [{ translateY: headerTranslateY }] }}
      >
        <View className="px-5">
          <Text className={`text-2xl font-bold text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Financial Overview
          </Text>
        </View>
      </Animated.View>

      <ScrollView
        className="flex-1"
        scrollEventThrottle={16}
      >
        <Animated.View 
          className=""
          style={{ opacity: fadeAnim }}
        >
          <RevenueCharts title="Monthly Income" chartData={monthlyData} chartType="line" />
          <RevenueCharts 
            title="Quarterly Income" 
            chartData={quarterlyData} 
            chartType="line" 
            isRangely={true} 
            allMonthsData={dummyRangelyData.months}
          />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SeeIncomesPage;