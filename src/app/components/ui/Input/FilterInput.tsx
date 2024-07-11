// components/ui/Input/FilterInput.js
import React from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FilterInput = ({ value, onChangeText, placeholder = "Filter..." }) => {
  return (
    <View className="mb-4 bg-white rounded-2xl shadow-sm">
      <View className="flex-row items-center px-4 py-3">
        <Ionicons name="filter-outline" size={20} color="#9CA3AF" />
        <TextInput
          className="flex-1 ml-3 text-base text-gray-800"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
        />
      </View>
    </View>
  );
};

export default FilterInput;