import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

type PaymentItemProps = {
  month: string;
  amount: number | { _id: string; dues: number };
  status: 'paid' | 'pending' | 'overdue' | undefined;
  isSelected: boolean;
  isSelectionMode: boolean;
  onPress: () => void;
  onAmountChange: (newAmount: number) => void;
};

const PaymentItem: React.FC<PaymentItemProps> = ({
  month,
  amount,
  status,
  isSelected,
  isSelectionMode,
  onPress,
  onAmountChange,
}) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedAmount, setEditedAmount] = useState(
    (typeof amount === 'object' ? amount.dues : amount).toString()
  );

  const handleAmountPress = () => {
    if (status !== 'paid') {
      setIsEditing(true);
    }
  };

  const handleAmountChange = (text: string) => {
    setEditedAmount(text);
  };

  const handleAmountBlur = () => {
    setIsEditing(false);
    const newAmount = parseFloat(editedAmount);
    const currentAmount = typeof amount === 'object' ? amount.dues : amount;
    if (!isNaN(newAmount) && newAmount !== currentAmount) {
      onAmountChange(newAmount);
    } else {
      setEditedAmount(currentAmount.toString());
    }
  };

  const getBackgroundColor = () => {
    if (isSelected) return 'bg-blue-100';
    switch (status) {
      case 'paid': return 'bg-green-100';
      case 'pending': return 'bg-yellow-100';
      default: return 'bg-red-100'; // for overdue and undefined (unpaid)
    }
  };

  const getTextColor = () => {
    if (isSelected) return 'text-blue-800';
    switch (status) {
      case 'paid': return 'text-green-800';
      case 'pending': return 'text-yellow-800';
      default: return 'text-red-800'; // for overdue and undefined (unpaid)
    }
  };

  const getIconColor = () => {
    switch (status) {
      case 'paid': return '#10B981';
      case 'pending': return '#F59E0B';
      default: return '#EF4444'; // for overdue and undefined (unpaid)
    }
  };

  const getIconName = () => {
    switch (status) {
      case 'paid': return 'checkmark-circle';
      case 'pending': return 'time';
      default: return 'close-circle'; // for overdue and undefined (unpaid)
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'paid': return t('paymentStatus.paid');
      case 'pending': return t('paymentStatus.pending');
      case 'overdue': return t('paymentStatus.unpaid');
      default: return t('paymentStatus.unpaid');
    }
  };

  const displayAmount = typeof amount === 'object' ? amount.dues : amount;

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row justify-between items-center p-4 mb-3 rounded-xl shadow-sm ${getBackgroundColor()}`}
      disabled={isSelectionMode && status === 'paid'}
    >
      <View className="flex-row items-center">
        <View className={`w-12 h-12 rounded-full ${
          status === 'paid' ? 'bg-green-500' : 
          status === 'pending' ? 'bg-yellow-500' :
          isSelected ? 'bg-blue-500' : 'bg-red-500'
        } items-center justify-center mr-4`}>
          <Text className="font-bold text-white">{month.slice(0, 3)}</Text>
        </View>
        <View>
          <Text className={`text-lg font-semibold ${getTextColor()}`}>
            {month}
          </Text>
          <Text className={`text-sm ${getTextColor()}`}>
            {getStatusText()}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center">
        {isEditing ? (
          <TextInput
            value={editedAmount}
            onChangeText={handleAmountChange}
            onBlur={handleAmountBlur}
            keyboardType="numeric"
            autoFocus
            className={`text-xl font-bold mr-2 ${getTextColor()}`}
          />
        ) : (
          <TouchableOpacity onPress={handleAmountPress}>
            <Text className={`text-xl font-bold mr-2 ${getTextColor()}`}>
              {displayAmount}₺
            </Text>
          </TouchableOpacity>
        )}
        {isSelectionMode && status !== 'paid' ? (
          <Ionicons
            name={isSelected ? "checkmark-circle" : "ellipse-outline"}
            size={24}
            color={isSelected ? "#3B82F6" : "#9CA3AF"}
          />
        ) : (
          <Ionicons
            name={getIconName()}
            size={24}
            color={getIconColor()}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PaymentItem;