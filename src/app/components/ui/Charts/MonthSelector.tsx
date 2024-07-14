import React, { useState, useEffect } from 'react';
import { View, Text,useColorScheme } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

interface MonthSliderProps {
  onSelectRange: (range: number[]) => void;
}

const MonthSlider: React.FC<MonthSliderProps> = ({ onSelectRange }) => {
  const isDark = useColorScheme() === 'dark';
  const [range, setRange] = useState([0, 11]);
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  useEffect(() => {
    const start = Math.min(range[0], range[1]);
    const end = Math.max(range[0], range[1]);
    onSelectRange(Array.from({length: end - start + 1}, (_, i) => start + i));
  }, [range, onSelectRange]);

  const onValuesChange = (values: number[]) => {
    setRange(values.map(Math.round));
  };

  return (
    <View className="dark:bg-gray-900">
      <View className="items-center">
        <MultiSlider
          values={range}
          min={0}
          max={11}
          step={1}
          onValuesChange={onValuesChange}
          sliderLength={300}
          selectedStyle={{backgroundColor: isDark ? '#fff': '#000000'}}
          unselectedStyle={{backgroundColor: isDark ? '#000000': '#fff'}}
          markerStyle={{
            height: 24,
            width: 24,
            borderRadius: 12,
            backgroundColor: '#FFFFFF',
            borderWidth: 2,
            borderColor: '#000000',
          }}
          containerStyle={{
            height: 40,
          }}
          trackStyle={{
            height: 4,
          }}
        />
      </View>
      <View className="flex-row justify-between mt-3 px-2.5">
        {months.map((month, index) => (
          <Text key={month} className="text-xs text-gray-500 dark:text-gray-400">
            {month}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default MonthSlider;