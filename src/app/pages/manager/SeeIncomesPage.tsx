import React, { useRef, useState, useEffect } from 'react';
import {SafeAreaView, View, Text, ScrollView, useColorScheme, Animated, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RevenueCharts from '../../components/ui/Charts/RevenueCharts';
import {useGetRevenueByMonthRangeQuery} from '../../../features/query/paymentQueryService';

const { width, height } = Dimensions.get('window');

const SeeIncomesPage = () => {
  const [rangelyRevenueState, setRangelyRevenueState] = useState({
    year: new Date().getFullYear(),
    start_month: 0,
    end_month: new Date().getMonth()
  });
  const { data, isLoading, isError } = useGetRevenueByMonthRangeQuery(rangelyRevenueState);
  console.log(data)
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

  const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{ data: [20, 45, 28, 80, 99, 43] }]
  };

  const yearlyData = {
    labels: ["2019", "2020", "2021", "2022", "2023"],
    datasets: [{ data: [300, 450, 280, 800, 990] }]
  };

  const quarterlyData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [{ data: [150, 230, 180, 340] }]
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
          <RevenueCharts title="Yearly Income" chartData={yearlyData} chartType="bar" />
          <RevenueCharts title="Rangely Income" chartData={quarterlyData} chartType="line" isRangely={true} />

        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SeeIncomesPage;