import React from 'react'
import { View, Dimensions, useColorScheme } from 'react-native'
import { Card, Title } from 'react-native-paper';
import { LineChart, BarChart } from 'react-native-chart-kit';
import SelectBox from '../SelectBox';

type ChartData = {
  labels: string[];
  datasets: { data: number[] }[];
};

type RevenueChartsProps = {
  isRangely?: boolean;
  title: string;
  chartData: ChartData;
  chartType: 'line' | 'bar';
};

const { width } = Dimensions.get('window');
const chartWidth = width - 64;

const RevenueCharts: React.FC<RevenueChartsProps> = ({ title, chartData, chartType,isRangely }) => {
  const isDark = useColorScheme() === 'dark';
  const chartConfig = {
    backgroundGradientFrom: isDark ? '#1E1E1E' : '#FFF',
    backgroundGradientTo: isDark ? '#1E1E1E' : '#FFF',
    color: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
  };

  const ChartComponent = chartType === 'line' ? LineChart : BarChart;
  const [selectedValue, setSelectedValue] = React.useState('');

  const data = [
    { label: 'Ocak', value: 0 },
    { label: 'Şubat', value: 1 },
    { label: 'Mart', value: 2 },
    { label: 'Nisan', value: 3 },
    { label: 'Mayıs', value: 4 },
    { label: 'Haziran', value: 5 },
    { label: 'Temmuz', value: 6 },
    { label: 'Ağustos', value: 7 },
    { label: 'Eylül', value: 8 },
    { label: 'Ekim', value: 9 },
    { label: 'Kasım', value: 10 },
    { label: 'Aralık', value: 11 },
  ];

  return (
    <Card className="mx-4 mb-4 bg-gray-300 rounded-lg dark:bg-gray-900 elevation-4">
      <Card.Content className="px-4">
        <Title className="mb-2 text-lg text-center text-dacka-black dark:text-white">{title}</Title>
        <View className="items-center">
          <ChartComponent
            data={chartData}
            width={chartWidth}
            height={180}
            chartConfig={chartConfig}
            bezier={chartType === 'line'}
            style={{ marginVertical: 8, borderRadius: 16 }}
            yAxisLabel="$"
            yAxisSuffix=""
          />
          {isRangely && (
            <View className='flex-row w-full'>
              <SelectBox
                data={data}
                placeholder="Select an item"
                onSelect={(item) => setSelectedValue(item.value)}
                value={selectedValue}
              />
              <SelectBox
                data={data}
                placeholder="Select an item"
                onSelect={(item) => setSelectedValue(item.value)}
                value={selectedValue}
              />
            </View>
          )}
        </View>
      </Card.Content>
    </Card>
  )
};

export default RevenueCharts