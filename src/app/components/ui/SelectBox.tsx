import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

type SelectBoxProps = {
  data: Array<{ label: string; value: number }>;
  placeholder?: string;
  onSelect: (item: { label: string; value: string }) => void;
  value?: string;
  labelField?: string;
  valueField?: string;
};

const SelectBox: React.FC<SelectBoxProps> = ({
  data,
  placeholder = 'Select item',
  onSelect,
  value,
  labelField = 'label',
  valueField = 'value',
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View className="w-1/2">
      <Dropdown
        className={`p-2 bg-white border rounded-md ${
          isFocus ? 'border-blue-500' : 'border-gray-300'
        }`}
        placeholderStyle="text-gray-500"
        selectedTextStyle="text-gray-800"
        iconStyle="w-5 h-5"
        data={data}
        maxHeight={300}
        renderItem={(item) => {
          return (
            <View className='flex-row items-center justify-between w-full'>
              <Text>{item.label}</Text>
            </View>
          )
        }}
        labelField={labelField}
        valueField={valueField}
        placeholder={!isFocus ? placeholder : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          onSelect(item);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default SelectBox;