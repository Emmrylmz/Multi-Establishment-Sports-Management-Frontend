// components/QueryInput.js
import React, { useState, useCallback } from 'react';
import { View, TextInput } from 'react-native';
import { debounce } from 'lodash';

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

  return (
    <View className="mb-4">
      <TextInput
        className="p-2 text-base border border-gray-300 rounded-md"
        value={inputValue}
        onChangeText={handleInputChange}
        placeholder={placeholder}
      />
    </View>
  );
};

export default QueryInput;