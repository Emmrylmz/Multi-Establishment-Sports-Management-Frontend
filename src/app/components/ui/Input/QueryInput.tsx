// components/QueryInput.js
import React, { useState, useCallback } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { debounce } from 'lodash';
import { Ionicons } from '@expo/vector-icons';

const QueryInput = ({ onQueryChange, placeholder = "Search...", debounceTime = 300 }) => {
  const [inputValue, setInputValue] = useState('');

  const debouncedQueryChange = useCallback(
    debounce((text) => {
      onQueryChange(text);
    }, debounceTime),
    [onQueryChange, debounceTime]
  );

  const handleInputChange = (text) => {
    setInputValue(text);
    debouncedQueryChange(text);
  };

  const handleClearInput = () => {
    setInputValue('');
    onQueryChange('');
  };

  return (
    <View className="mb-4 bg-white rounded-2xl shadow-sm">
      <View className="flex-row items-center px-4 py-3">
        <Ionicons name="search-outline" size={20} color="#9CA3AF" />
        <TextInput
          className="flex-1 ml-3 text-base text-gray-800"
          value={inputValue}
          onChangeText={handleInputChange}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
        />
        {inputValue.length > 0 && (
          <TouchableOpacity onPress={handleClearInput}>
            <Ionicons name="close-circle" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default QueryInput;