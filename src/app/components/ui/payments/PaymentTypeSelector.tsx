import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const PaymentTypeSelector = ({ paymentType, setPaymentType }) => (
  <View className='flex-row w-full px-2 py-2 bg-white dark:bg-dacka-black'>
    {['dues', 'pt', 'store'].map((type) => (
      <TouchableOpacity 
        key={type}
        className={`flex-1 py-3 ${
          type === 'dues' ? 'rounded-l-full' : type === 'store' ? 'rounded-r-full' : ''
        } ${
          paymentType === type 
            ? 'bg-green-500 dark:bg-green-700' 
            : 'bg-gray-200 dark:bg-gray-700'
        } mx-1`} 
        onPress={() => setPaymentType(type)}
      >
        <Text className={`font-semibold text-center text-xs ${
          paymentType === type
            ? 'text-white'
            : 'text-gray-700 dark:text-gray-300'
        }`}>
          {type === 'dues' ? 'Dues Payment' : type === 'pt' ? 'Personal Training' : 'Store Payment'}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

export default PaymentTypeSelector;