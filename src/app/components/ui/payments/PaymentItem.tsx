import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type PaymentItemProps = {
  month: string;
  amount: number;
  paid: boolean;
  isSelected: boolean;
  isSelectionMode: boolean;
  onPress: () => void;
};

const PaymentItem: React.FC<PaymentItemProps> = ({
  month,
  amount,
  paid,
  isSelected,
  isSelectionMode,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row justify-between items-center p-4 mb-3 rounded-xl shadow-sm
        ${paid ? 'bg-green-100' : isSelected ? 'bg-blue-100' : 'bg-red-100'}`}
    >
      <View className="flex-row items-center">
        <View className={`w-12 h-12 rounded-full ${paid ? 'bg-green-500' : isSelected ? 'bg-blue-500' : 'bg-red-500'} items-center justify-center mr-4`}>
          <Text className="font-bold text-white">{month.slice(0, 3)}</Text>
        </View>
        <View>
          <Text className={`text-lg font-semibold ${paid ? 'text-green-800' : isSelected ? 'text-blue-800' : 'text-red-800'}`}>
            {month}
          </Text>
          <Text className={`text-sm ${paid ? 'text-green-600' : isSelected ? 'text-blue-600' : 'text-red-600'}`}>
            {paid ? 'Paid' : 'Unpaid'}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center">
        <Text className={`text-xl font-bold mr-2 ${paid ? 'text-green-800' : isSelected ? 'text-blue-800' : 'text-red-800'}`}>
          {amount}₺
        </Text>
        {isSelectionMode && !paid ? (
          <Ionicons
            name={isSelected ? "checkmark-circle" : "ellipse-outline"}
            size={24}
            color={isSelected ? "#3B82F6" : "#9CA3AF"}
          />
        ) : (
          <Ionicons
            name={paid ? "checkmark-circle" : "close-circle"}
            size={24}
            color={paid ? "#10B981" : "#EF4444"}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PaymentItem;