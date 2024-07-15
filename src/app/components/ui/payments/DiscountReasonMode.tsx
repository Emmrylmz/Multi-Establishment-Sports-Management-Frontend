import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import  InputField  from '../Form/InputField';
import ConfirmOrCancelView from './ConfirmOrCancelView';

const DiscountReasonMode = ({ isSelectionMode, toggleSelectionMode, markAsPaid, paymentType, setDiscountReason }) => (
  <View className="p-4 bg-white dark:bg-dacka-black">
    {isSelectionMode ? (
      <ConfirmOrCancelView toggleSelectionMode={toggleSelectionMode} markAsPaid={markAsPaid} />
    ) : (
      <>
        <InputField
          placeholder='If discounted, enter the reason'
          placeholderTextColor='light'
          handleInputChange={(name, text) => setDiscountReason(text)}
          name='discount_reason'
          keyboardType='default'
          autoCapitalize='none'
          additionalStyles='mb-8 mt-4'
          additionalInputStyles='py-3 px-2 rounded-lg text-black h-12'
          isLongText={false}
        />
        <TouchableOpacity 
          onPress={toggleSelectionMode}
          className={`py-4 rounded-full ${
            paymentType === 'pt' ? 'bg-blue-200 dark:bg-blue-800' : 'bg-green-200 dark:bg-green-800'
          }`}
        >
          <Text className="font-semibold text-center text-black dark:text-white">
            {paymentType === 'dues' 
              ? 'Click to Select Months to Mark as Paid'
              : paymentType === 'pt'
                ? 'Click to Select PT Sessions to Mark as Paid'
                : 'Click to Select Store Items to Purchase'}
          </Text>
        </TouchableOpacity>
      </>
    )}
  </View>
);

export default DiscountReasonMode;