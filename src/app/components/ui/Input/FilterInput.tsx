import React from 'react';
import { View, TextInput } from 'react-native';

const FilterInput = ({ value, onChangeText, placeholder = "Filter..." }) => {
  return (
    <View className="mb-4">
      <TextInput
        className="border border-gray-300 rounded-md p-2 text-base"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  );
};

export default FilterInput;