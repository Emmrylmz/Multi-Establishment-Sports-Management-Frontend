import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { AppLayout } from '../../components';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PaymentOverview from '../../components/ui/payments/PaymentOverview';
import ConfirmOrCancelView from '../../components/ui/payments/ConfirmOrCancelView';
import PaymentItem from '../../components/ui/payments/PaymentItem';
import { useGetPaymentQuery } from '../../../features/query/paymentQueryService';

type Payment = {
  month: number;
  amount: number;
  paid: boolean;
};

const ManagerPlayerPaymentDetailPage = ({ route, navigation }) => {
  const { player_id } = route.params;
  console.log('player_id:', player_id);
  const { data, error, isLoading } = useGetPaymentQuery(player_id);
  console.log('data:', data);

  const insets = useSafeAreaInsets();
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedMonths, setSelectedMonths] = useState<number[]>([]);

  const generateAnnualPayment = (data: Payment[]) => {
    const monthsInYear = 12;
    const paymentMap = new Map(data.map((payment) => [payment.month, payment]));

    const fullAnnualPayment = Array.from({ length: monthsInYear }, (_, month) => {
      return paymentMap.get(month) || { month, amount: 2000, paid: false };
    });

    return fullAnnualPayment;
  };

  const annualPayment = data ? generateAnnualPayment(data) : [];
  const totalPaid = annualPayment.reduce((acc, payment) => payment.paid ? acc + payment.amount : acc, 0);
  const totalPayment = annualPayment.reduce((acc, payment) => acc + payment.amount, 0);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    setSelectedMonths([]);
  };

  const toggleMonthSelection = (index: number) => {
    if (annualPayment[index].paid) return;
    
    setSelectedMonths(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const markAsPaid = () => {
    // Ideally, update the backend to mark these months as paid
    setSelectedMonths([]);
    setIsSelectionMode(false);
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    console.error('Error fetching payment:', error);
    return <Text>Error loading payment data.</Text>;
  }

  return (
    <AppLayout>
      <View className={`flex-1 bg-slate-200 dark:bg-dacka-black pt-${insets.top}`}>
        <PaymentOverview totalPayment={totalPayment} totalPaid={totalPaid} />
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          className="flex-1 px-4 pt-6 bg-white dark:bg-dacka-black rounded-t-3xl"
        >
          {annualPayment.map((payment, index) => (
            <PaymentItem
              key={index}
              month={monthNames[payment.month]}
              amount={payment.amount}
              paid={payment.paid}
              isSelected={selectedMonths.includes(index)}
              isSelectionMode={isSelectionMode}
              onPress={() => toggleMonthSelection(index)}
            />
          ))}
        </ScrollView>
        <View className="p-4 bg-white dark:bg-dacka-black">
          {isSelectionMode ? (
            <ConfirmOrCancelView toggleSelectionMode={toggleSelectionMode} markAsPaid={markAsPaid} />
          ) : (
            <TouchableOpacity 
              onPress={toggleSelectionMode}
              className="py-4 bg-green-200 rounded-full dark:bg-green-800"
            >
              <Text className="font-semibold text-center text-black dark:text-white">Click to Select Months to Mark as Paid</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </AppLayout>
  );
};

export default ManagerPlayerPaymentDetailPage;