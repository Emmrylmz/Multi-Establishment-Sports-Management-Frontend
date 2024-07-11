import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { AppLayout } from '../../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PaymentOverview from '../../components/ui/payments/PaymentOverview';
import ConfirmOrCancelView from '../../components/ui/payments/ConfirmOrCancelView';
import PaymentItem from '../../components/ui/payments/PaymentItem';
import { useGetPaymentQuery, useCreatePaymentMutation } from '../../../features/query/paymentQueryService';
import PaymentAnimation from '../../components/ui/payments/PaymentAnimation';

type Payment = {
  month: number;
  amount: number;
  paid: boolean;
};

type FormState = {
  user_id: string;
  team_id: string;
  amount: number;
  months: number[];
  year: number;
  paid: boolean;
  paid_date: string;
};

const ManagerPlayerPaymentDetailPage = ({ route, navigation }) => {
  const { player_id, team_id } = route.params;
  const { data, error, isLoading: isLoadingPayments, refetch } = useGetPaymentQuery(player_id);
  const [createPayment, { isLoading: isCreatingPayment, isError: isCreatePaymentError }] = useCreatePaymentMutation();

  const insets = useSafeAreaInsets();
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedMonths, setSelectedMonths] = useState<number[]>([]);

  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.5));

  useEffect(() => {
    if (isCreatingPayment || isCreatePaymentError) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isCreatingPayment, isCreatePaymentError]);

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
    if (annualPayment[index].paid || !isSelectionMode) return;

    setSelectedMonths(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };


  const markAsPaid = async () => {
    setSelectedMonths([]);
    setIsSelectionMode(false);

    const existingMonths = data.filter(payment => payment.paid).map(payment => payment.month);
    const uniqueMonths = Array.from(new Set([...existingMonths, ...selectedMonths]));

    const newPayment: FormState = {
      user_id: player_id,
      team_id: team_id,
      amount: 2000,
      months: selectedMonths,
      year: new Date().getFullYear(),
      paid: true,
      paid_date: new Date().toISOString()
    };

    try {
      await createPayment(newPayment).unwrap();
      refetch();
    } catch (error) {
    }
  };

  if (isLoadingPayments) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading payment data.</Text>;
  }

  return (
    <AppLayout>
      <View className={`flex-1 bg-white dark:bg-dacka-black pt-${insets.top}`}>
        <PaymentOverview  title='Payment Overview' leftSubtitle='Total Paid' rightSubtitle='Remaining' totalPayment={totalPayment} totalPaid={totalPaid} />
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
              onPress={isSelectionMode ? () => toggleMonthSelection(index) : null}
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
        {(isCreatingPayment || isCreatePaymentError) && (
          <PaymentAnimation
            truthyState={isCreatingPayment}
            falsyState={isCreatePaymentError}
            scaleAnim={scaleAnim}
            fadeAnim={fadeAnim}
            onRetry={() => {/* Add retry logic here */}}
          />
        )}
      </View>
    </AppLayout>
  );
};

export default ManagerPlayerPaymentDetailPage;