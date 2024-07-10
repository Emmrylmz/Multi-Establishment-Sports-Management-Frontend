import { View, Text,Dimensions, useColorScheme,ActivityIndicator } from 'react-native'
import { Card, Title, Paragraph, IconButton } from 'react-native-paper';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { Dropdown } from 'react-native-element-dropdown';
import React from 'react'
import DropDownRenderItem from './DropDownRenderItem';

type RevenueCardProps = {
  title: string;
  amount: number;
  icon: string;
  chartData: any;
  chartType: string;
  options?: boolean;
  onChange?: (item: {label: string, value: {start_month: number, end_month: number}}) => void;
  dropdownOptions?: Array<{ label: string,value:{start_month: number,end_month: number}}>
  isLoading: boolean;
};


const { width } = Dimensions.get('window');
const chartWidth = width - 64; // Adjusted to fit within the card content

const RevenueCard = ({ title, amount, icon, chartData, chartType,options,onChange, dropdownOptions,isLoading}: RevenueCardProps) => {
  const isDark = useColorScheme() === 'dark';
  const chartConfig = {
    backgroundGradientFrom: isDark ? '#1E1E1E' : '#FFF',
    backgroundGradientTo: isDark ? '#1E1E1E' : '#FFF',
    color: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.7,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
  };

  if (isLoading) {
    return (
      <View className="items-center justify-center" style={{ height: 180 }}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text className="mt-2 text-dacka-black dark:text-white">Loading...</Text>
      </View>
    );
  }

  if(options){
    return (
      <Card className="mx-4 mb-4 bg-gray-300 rounded-lg dark:bg-gray-900 elevation-4">
      <Card.Content className="px-4">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Title className="mb-2 text-lg text-dacka-black dark:text-white">{title}</Title>
            <Paragraph className="text-xl font-bold text-dacka-green">${amount}</Paragraph>
          </View>
          <View className='flex-col w-1/2'>
            <View className='flex-row justify-end w-full'>
              <IconButton icon={icon} color="#6200ee" size={24} />
            </View>
            <Dropdown
              className={`w-full p-2 bg-gray-400 shadow-md dark:bg-gray-800 rounded-lg`}
              data={dropdownOptions}
              onChange={onChange}
              renderItem={(item: { label: string, value: number }) => (
                <DropDownRenderItem item={item}/>
              )}
              labelField='label'
              valueField="value"
              placeholderStyle={{ color: isDark ? 'white' : 'black' }}
              placeholder='Select Range'
            />
            
          </View>
        </View>
        <View className="items-center">
          {chartType === 'line' ? (
            <LineChart
              data={chartData}
              width={chartWidth}
              height={180}
              chartConfig={chartConfig}
              bezier
              style={{ marginVertical: 8, borderRadius: 16 }}
              yAxisLabel="$"
              yAxisSuffix=""
            />
          ) : (
            <BarChart
              data={chartData}
              width={chartWidth}
              height={180}
              chartConfig={chartConfig}
              style={{ marginVertical: 8, borderRadius: 16 }}
              yAxisLabel="$"
              yAxisSuffix=""
              showValuesOnTopOfBars
            />
          )}
        </View>
      </Card.Content>
    </Card>
    )
  }
  return (
    <Card className="mx-4 mb-4 bg-gray-300 rounded-lg dark:bg-gray-900 elevation-4">
      <Card.Content className="px-4">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Title className="mb-2 text-lg text-dacka-black dark:text-white">{title}</Title>
            <Paragraph className="text-xl font-bold text-dacka-green">${amount}</Paragraph>
          </View>
          <IconButton icon={icon} color="#6200ee" size={24} />
        </View>
        <View className="items-center">
          {chartType === 'line' ? (
            <LineChart
              data={chartData}
              width={chartWidth}
              height={180}
              chartConfig={chartConfig}
              bezier
              style={{ marginVertical: 8, borderRadius: 16 }}
              yAxisLabel="$"
              yAxisSuffix=""
            />
          ) : (
            <BarChart
              data={chartData}
              width={chartWidth}
              height={180}
              chartConfig={chartConfig}
              style={{ marginVertical: 8, borderRadius: 16 }}
              yAxisLabel="$"
              yAxisSuffix=""
              showValuesOnTopOfBars
            />
          )}
        </View>
      </Card.Content>
    </Card>
  )
};

export default RevenueCard