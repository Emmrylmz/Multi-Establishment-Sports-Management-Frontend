import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Title } from 'react-native-paper';

import RevenueCard from '../../components/ui/payments/RevenueCard';
import {useGetMonthlyRevenueQuery, useGetYearlyRevenueQuery, useGetRevenueByMonthRangeQuery} from '../../../features/query/paymentQueryService';


const ManagerHomePage = () => {

  const [monthlyRevenueData, setMonthlyRevenueData] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth()
  });
  const [yearlyRevenueData, setYearlyRevenueData] = useState({
    year: new Date().getFullYear()
  });
  const [rangeRevenueData, setRangeRevenueData] = useState({
    start_month: 1,
    end_month: 3,
    year: new Date().getFullYear()
  });

  const { data: monthlyRevenue, isLoading:isLoadingMonthly } = useGetMonthlyRevenueQuery(monthlyRevenueData);
  const { data: yearlyRevenue, isLoading: isLoadingYearly } = useGetYearlyRevenueQuery(yearlyRevenueData);
  const { data: rangeRevenue, isLoading: isLoadingRange, refetch: refetchRangeRevenue } = useGetRevenueByMonthRangeQuery(rangeRevenueData);

  useEffect(() => {
    refetchRangeRevenue();
  }, [rangeRevenueData, refetchRangeRevenue]);

  console.log(monthlyRevenue, yearlyRevenue, rangeRevenue)

  const defaultYearlyRevenue = 24000;
  const defaultRangeRevenue = 14000;

  const yearlyData = {
    labels: ['Jan', 'Mar', 'Jun', 'Sep', 'Dec'],
    datasets: [
      {
        data: [1800, 2200, 1900, 2100, 2400],
      },
    ],
  };

  const monthlyData = {
    labels: ['W1', 'W2', 'W3', 'W4'],
    datasets: [
      {
        data: [450, 500, 600, 450],
      },
    ],
  };


  const rangeData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        data: [
          defaultRangeRevenue * 0.8,
          defaultRangeRevenue * 0.9,
          defaultRangeRevenue * 1.1,
          defaultRangeRevenue
        ],
      },
    ],
  };

  const selectDropDownOptions = [
    {
      label: 'Q1',
      value:{
        start_month: 0,
        end_month: 2
      }
    },
    {
      label: 'Q2',
      value:{
        start_month: 3,
        end_month: 5
      }
    },
    {
      label: 'Q3',
      value:{
        start_month: 6,
        end_month: 8
      }
    },
    {
      label: 'Q4',
      value:{
        start_month: 9,
        end_month: 11
      }
    }
  ]

  const handleRangeRevenueChange = (item: {label: string, value: {start_month: number, end_month: number}}) => {
    const { start_month, end_month } = item.value;
    console.log('from parameters: ', start_month, end_month);
    
    setRangeRevenueData(prevState => {
      const newState = {
        ...prevState,
        start_month: start_month, // Adding 1 because months are 0-indexed
        end_month: end_month
      };
      console.log('new state: ', newState);
      return newState;
    });
  };

  return (
      <ScrollView contentContainerStyle={{ paddingBottom: 16 }} className='bg-white dark:bg-dacka-black'>
        <View className="flex-row items-center justify-between px-4 mb-4">
          <Title className="text-2xl font-bold text-dacka-black dark:text-white">Financial Dashboard</Title>
        </View>

        <RevenueCard
          title="Yearly Revenue"
          amount={yearlyRevenue}
          icon="chart-line"
          chartData={yearlyData}
          chartType="line"
          isLoading={isLoadingYearly}
        />

        <RevenueCard
          title="Monthly Revenue"
          amount={monthlyRevenue}
          icon="chart-bar"
          chartData={monthlyData}
          chartType="bar"
          isLoading={isLoadingMonthly}
        />

        <RevenueCard
          title="Range Revenue"
          amount={rangeRevenue}
          icon="chart-areaspline"
          chartData={rangeData}
          chartType="line"
          options={true}
          onChange={(item: {label: string, value: {start_month: number, end_month: number}}) => handleRangeRevenueChange(item)}
          dropdownOptions={selectDropDownOptions}
          isLoading={isLoadingRange}
        />
      </ScrollView>
  );
};

export default ManagerHomePage;