import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

interface MonthSliderProps {
  onSelectRange: (range: number[]) => void;
}

const MonthSlider: React.FC<MonthSliderProps> = ({ onSelectRange }) => {
  const [range, setRange] = useState([0, 11]);

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  useEffect(() => {
    const start = Math.min(range[0], range[1]);
    const end = Math.max(range[0], range[1]);
    onSelectRange(Array.from({ length: end - start + 1 }, (_, i) => start + i));
  }, [range, onSelectRange]);

  const onValuesChange = (values: number[]) => {
    setRange(values.map(Math.round));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Selected: {months[Math.min(...range)]} - {months[Math.max(...range)]}
      </Text>
      <View style={styles.sliderContainer}>
        <MultiSlider
          values={range}
          min={0}
          max={11}
          step={1}
          onValuesChange={onValuesChange}
          sliderLength={300}
          selectedStyle={{backgroundColor: '#3498db'}}
          unselectedStyle={{backgroundColor: '#bdc3c7'}}
          markerStyle={styles.marker}
        />
      </View>
      <View style={styles.monthLabels}>
        {months.map((month, index) => (
          <Text key={month} style={styles.monthLabel}>
            {month}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  sliderContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  monthLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  monthLabel: {
    fontSize: 10,
    color: '#7f8c8d',
  },
  marker: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: '#3498db',
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default MonthSlider;