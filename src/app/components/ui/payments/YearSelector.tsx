// YearSelector.tsx
import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface YearSelectorProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
  startYear?: number;
  endYear?: number;
}

const YearSelector: React.FC<YearSelectorProps> = ({ 
  selectedYear, 
  onYearChange, 
  startYear = new Date().getFullYear() - 5,
  endYear = new Date().getFullYear() + 5 
}) => {
  const flatListRef = useRef<FlatList>(null);

  const years = useMemo(() => 
    Array.from(
      { length: endYear - startYear + 1 },
      (_, index) => startYear + index
    ),
    [startYear, endYear]
  );

  useEffect(() => {
    if (flatListRef.current) {
      const selectedIndex = years.indexOf(selectedYear);
      flatListRef.current.scrollToIndex({ index: selectedIndex, animated: true, viewPosition: 0.5 });
    }
  }, [selectedYear, years]);

  const renderYear = useCallback(({ item: year }) => (
    <TouchableOpacity
      onPress={() => onYearChange(year)}
      className={`mx-2 px-6 py-3 rounded-2xl ${
        selectedYear === year
          ? 'bg-teal-600 shadow-lg'
          : 'bg-white border border-gray-200'
      }`}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
      }}
    >
      <Text
        className={`text-base font-semibold ${
          selectedYear === year ? 'text-white' : 'text-gray-700'
        }`}
      >
        {year}
      </Text>
    </TouchableOpacity>
  ), [selectedYear, onYearChange]);

  const keyExtractor = useCallback((item: number) => item.toString(), []);

  return (
    <View className="py-4">
      <LinearGradient
        colors={['rgba(255,255,255,0.8)', 'transparent', 'transparent', 'rgba(255,255,255,0.8)']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        className="absolute inset-0 z-10"
      />
      <FlatList
        ref={flatListRef}
        data={years}
        renderItem={renderYear}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        className="z-0"
        getItemLayout={(data, index) => ({
          length: 100,
          offset: 100 * index,
          index,
        })}
        initialScrollIndex={years.indexOf(selectedYear)}
      />
    </View>
  );
};

export default YearSelector;