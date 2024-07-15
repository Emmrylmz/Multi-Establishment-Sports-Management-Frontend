import React from 'react';
import { View } from 'react-native';
import PaymentItem from './PaymentItem';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DuesPaymentView = ({ annualPayment, isSelectionMode, selectedMonths, toggleMonthSelection }) => (
  <View>
    {annualPayment.map((payment, index) => (
      <PaymentItem
        key={index}
        month={monthNames[payment.month]}
        amount={payment.amount}
        paid={payment.paid}
        isSelected={selectedMonths.includes(index)}
        isSelectionMode={isSelectionMode}
        onPress={isSelectionMode ? () => toggleMonthSelection(index) : null}
      />
    ))}
  </View>
);

export default DuesPaymentView;