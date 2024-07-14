import React, { useState, useEffect } from 'react'
import { View, Dimensions, useColorScheme } from 'react-native'
import { Card, Title } from 'react-native-paper';
import { LineChart, BarChart } from 'react-native-chart-kit';
import MonthSelector from './MonthSelector';

type ChartData = {
  labels: string[];
  datasets: { data: number[] }[];
};

type RevenueChartsProps = {
  isRangely?: boolean;
  title: string;
  chartData: ChartData;
  chartType: 'line' | 'bar';
  allMonthsData?: { month: number; revenue: number }[];
};

const { width } = Dimensions.get('window');
const chartWidth = width - 64;

const RevenueCharts: React.FC<RevenueChartsProps> = ({ title, chartData, chartType, isRangely, allMonthsData }) => {
  const isDark = useColorScheme() === 'dark';
  const [startMonth, setStartMonth] = useState(0);
  const [endMonth, setEndMonth] = useState(11);
  const [filteredChartData, setFilteredChartData] = useState(chartData);

  const chartConfig = {
    backgroundGradientFrom: isDark ? '#1E1E1E' : '#FFF',
    backgroundGradientTo: isDark ? '#1E1E1E' : '#FFF',
    color: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
  };

  const ChartComponent = chartType === 'line' ? LineChart : BarChart;

  const data = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  useEffect(() => {
    if (isRangely && allMonthsData) {
      const filteredData = allMonthsData.filter(
        item => item.month >= startMonth && item.month <= endMonth
      );
      setFilteredChartData({
        labels: filteredData.map(item => data[item.month].substring(0, 3)),
        datasets: [{ data: filteredData.map(item => item.revenue) }]
      });
    }
  }, [startMonth, endMonth, allMonthsData, isRangely]);

  const handleOnSelectRange = (range: number[]) => {
    setStartMonth(range[0]);
    setEndMonth(range[range.length - 1]);
  }

  return (
    <Card className="mx-4 mb-4 bg-gray-300 rounded-lg dark:bg-gray-900 elevation-4">
      <Card.Content className="px-4">
        <Title className="mb-2 text-lg text-center text-dacka-black dark:text-white">{title}</Title>
        <View className="items-center">
          <ChartComponent
            data={isRangely ? filteredChartData : {
              ...chartData,
              labels: chartData.labels.map(label => label.substring(0, 3))
            }}
            width={chartWidth}
            height={180}
            chartConfig={chartConfig}
            bezier={chartType === 'line'}
            style={{ marginVertical: 8, borderRadius: 16 }}
            yAxisLabel="$"
            yAxisSuffix=""
          />
          {isRangely && (
            <View className='w-full mt-4'>
              <MonthSelector onSelectRange={handleOnSelectRange} />
            </View>
          )}
        </View>
      </Card.Content>
    </Card>
  )
};

export default RevenueCharts;