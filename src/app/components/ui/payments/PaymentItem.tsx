import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type PaymentItemProps = {
  month: string;
  amount: number;
  status: 'pending' | 'paid';
  isSelected: boolean;
  isSelectionMode: boolean;
  onPress: () => void;
  onAmountChange: (newAmount: number) => void;
  onForceSelect: () => void;
};

const PaymentItem: React.FC<PaymentItemProps> = ({
  month,
  amount,
  status,
  isSelected,
  isSelectionMode,
  onPress,
  onAmountChange,
  onForceSelect,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableAmount, setEditableAmount] = useState(amount.toString());

  const isPaid = status === 'paid';

  const handleAmountPress = () => {
    if (isSelectionMode && !isPaid) {
      setIsEditing(true);
    }
  };

  const handleAmountChange = (text: string) => {
    setEditableAmount(text);
  };

  const handleAmountBlur = () => {
    setIsEditing(false);
    const newAmount = parseInt(editableAmount) || amount;
    onAmountChange(newAmount);
    if (newAmount !== amount && !isSelected) {
      onForceSelect();
    }
  };

  const getBgColor = () => {
    if (isPaid) return 'bg-green-100';
    if (isSelected) return 'bg-blue-100';
    return 'bg-red-100';
  };

  const getTextColor = () => {
    if (isPaid) return 'text-green-800';
    if (isSelected) return 'text-blue-800';
    return 'text-red-800';
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row justify-between items-center p-4 mb-3 rounded-xl shadow-sm ${getBgColor()}`}
    >
      <View className="flex-row items-center">
        <View className={`w-12 h-12 rounded-full ${isPaid ? 'bg-green-500' : isSelected ? 'bg-blue-500' : 'bg-red-500'} items-center justify-center mr-4`}>
          <Text className="font-bold text-white">{month.slice(0, 3)}</Text>
        </View>
        <View>
          <Text className={`text-lg font-semibold ${getTextColor()}`}>
            {month}
          </Text>
          <Text className={`text-sm ${isPaid ? 'text-green-600' : isSelected ? 'text-blue-600' : 'text-red-600'}`}>
            {status === 'paid' ? 'Paid' : 'Pending'}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center">
        {isEditing ? (
          <TextInput
            value={editableAmount}
            onChangeText={handleAmountChange}
            onBlur={handleAmountBlur}
            keyboardType="numeric"
            autoFocus
            className={`text-xl font-bold mr-2 px-2 py-1 rounded ${isPaid ? 'text-green-800 bg-green-200' : isSelected ? 'text-blue-800 bg-blue-200' : 'text-red-800 bg-red-200'}`}
          />
        ) : (
          <TouchableOpacity onPress={handleAmountPress} disabled={!isSelectionMode || isPaid}>
            <Text className={`text-xl font-bold mr-2 ${getTextColor()}`}>
              {amount}₺
            </Text>
          </TouchableOpacity>
        )}
        {isSelectionMode && !isPaid ? (
          <Ionicons
            name={isSelected ? "checkmark-circle" : "ellipse-outline"}
            size={24}
            color={isSelected ? "#3B82F6" : "#9CA3AF"}
          />
        ) : (
          <Ionicons
            name={isPaid ? "checkmark-circle" : "close-circle"}
            size={24}
            color={isPaid ? "#10B981" : "#EF4444"}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PaymentItem;