import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type OptionSelectorProps = {
  options: string[];
  selectedOption: string;
  onOptionChange: (option: string) => void;
  className?: string;
};

const OptionSelector: React.FC<OptionSelectorProps> = ({
  options,
  selectedOption,
  onOptionChange,
  className = '',
}) => {
  const getIconName = (option: string) => {
    switch (option) {
      case 'Training':
        return 'whistle';
      case 'Match':
      case 'Game':
        return 'basketball';
      case 'Meeting':
        return 'account-group';
      case 'Main Field':
        return 'stadium';
      case 'Practice Field':
        return 'soccer-field';
      case 'Gym':
        return 'dumbbell';
      case 'Meeting Room':
        return 'meeting-room';
      default:
        return 'calendar';
    }
  };

  return (
    <View className={`flex-row flex-wrap justify-start mb-6 ${className}`}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          className={`flex-row items-center bg-gray-200 py-3 px-4 rounded-full m-1 ${
            selectedOption === option ? 'bg-teal-600' : ''
          }`}
          onPress={() => onOptionChange(option)}
        >
          <Icon
            name={getIconName(option)}
            size={24}
            color={selectedOption === option ? '#fff' : '#00897B'}
          />
          <Text
            className={`ml-2 font-bold ${
              selectedOption === option ? 'text-white' : 'text-teal-600'
            }`}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default OptionSelector;