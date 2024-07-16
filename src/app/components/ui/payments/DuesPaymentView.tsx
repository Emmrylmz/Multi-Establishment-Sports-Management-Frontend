import React from 'react';
import { View } from 'react-native';
import PaymentItem from './PaymentItem';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

type DuesPaymentViewProps = {
  annualPayment: Array<{ month: number; amount: number; paid: boolean }>;
  isSelectionMode: boolean;
  selectedMonths: number[];
  toggleMonthSelection: (index: number) => void;
  updateMonthAmount: (index: number, newAmount: number) => void;
};

const DuesPaymentView: React.FC<DuesPaymentViewProps> = ({
  annualPayment,
  isSelectionMode,
  selectedMonths,
  toggleMonthSelection,
  updateMonthAmount
}) => {
  const handleForceSelect = (index: number) => {
    if (!selectedMonths.includes(index)) {
      toggleMonthSelection(index);
    }
  };

  return (
    <View className="py-4">
      {annualPayment.map((payment, index) => (
        <PaymentItem
          key={index}
          month={monthNames[payment.month]}
          amount={payment.amount}
          status={payment.status}
          isSelected={selectedMonths.includes(index)}
          isSelectionMode={isSelectionMode}
          onPress={() => isSelectionMode && toggleMonthSelection(index)}
          onAmountChange={(newAmount) => updateMonthAmount(index, newAmount)}
          onForceSelect={() => handleForceSelect(index)}
        />
      ))}
    </View>
  );
};

export default DuesPaymentView;