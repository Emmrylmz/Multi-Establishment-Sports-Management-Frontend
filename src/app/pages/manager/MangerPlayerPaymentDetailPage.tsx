import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated,SafeAreaView, ActivityIndicator } from 'react-native';
import { AppLayout } from '../../components';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PaymentOverview from '../../components/ui/payments/PaymentOverview';
import ConfirmOrCancelView from '../../components/ui/payments/ConfirmOrCancelView';
import PaymentItem from '../../components/ui/payments/PaymentItem';
import { useGetPaymentQuery, useCreatePaymentMutation } from '../../../features/query/paymentQueryService';
import PaymentAnimation from '../../components/ui/payments/PaymentAnimation';

type Payment = {
  _id: string;
  amount: number;
  created_at: Date;
  description: string | null;
  due_date: Date;
  month: number;
  paid_date: Date;
  payment_type: 'monthly' | 'annual';
  payment_with: 'credit_card' | 'cash' | 'bank_transfer' | 'mobile_payment' | 'other';
  province: string;
  status: 'paid' | 'pending' | 'overdue';
  user_id: string;
  year: number;
};

type MonthsAndAmounts = {
  [key: number]: number;
};

type FormState = {
  user_id: string;
  months_and_amounts: MonthsAndAmounts;
  payment_with: 'credit_card' | 'cash' | 'bank_transfer' | 'mobile_payment' | 'other';
  year: number;
  status: 'paid' | 'pending' | 'overdue';
  paid_date: string;
  province: string;
};

const ManagerPlayerPaymentDetailPage = ({ route, navigation }) => {
  const [paymentType, setPaymentType] = useState('dues');
  const { player_id,dues } = route.params;
  const { data, error:errorLoadingPayments, isLoading: isLoadingPayments, refetch } = useGetPaymentQuery(player_id);
  const [createPayment, { isLoading: isCreatingPayment, isError: isCreatePaymentError }] = useCreatePaymentMutation();

  const insets = useSafeAreaInsets();
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedMonths, setSelectedMonths] = useState<number[]>([]);
  
  data?.forEach((item) => console.log(item._id))
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



  const [annualPayment, setAnnualPayment] = useState<Payment[]>([]);
  
  useEffect(() => {
    // if data statement removed
    setAnnualPayment(generateAnnualPayment(data));
  }, [data]);
  

  // added undefined to data to prevent error
  const generateAnnualPayment = (data: Payment[] | undefined) => {
    const monthsInYear = 12;
    const paymentMap = new Map(data?.map((payment) => [payment.month, payment]) || []);
  
    return Array.from({ length: monthsInYear }, (_, month) => {
      return paymentMap.get(month) || { 
        month, 
        amount: 2000, // Default amount
        status: 'pending', // Default status
        paid: false 
      };
    });
  };
  const handleAmountChange = (index: number, newAmount: number) => {
    setAnnualPayment(prevPayments => {
      const newPayments = [...prevPayments];
      newPayments[index] = { ...newPayments[index], amount: newAmount };
      return newPayments;
    });
  };


  const totalPaid = annualPayment.reduce((acc, payment) => (payment.status === 'paid' ? acc + payment.amount : acc), 0);
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
  
    const months_and_amounts: { [key: number]: number } = {};
    selectedMonths.forEach(monthIndex => {
      const payment = annualPayment[monthIndex];
      months_and_amounts[payment.month] = payment.amount;
    });
  
    const newPayment: FormState = {
      user_id: player_id,
      months_and_amounts: months_and_amounts,
      payment_with: "credit_card",
      year: new Date().getFullYear(),
      status: "paid",
      paid_date: new Date().toISOString(),
      province: "Izmir"
    };
  
    try {
      console.log('Sending payment data:', JSON.stringify(newPayment, null, 2));
      const response = await createPayment(newPayment).unwrap();
      console.log('Payment created successfully:', response);
      if(response.status === 'success'){
        return refetch();
      }
    } catch (error: any) {
      console.error('Error creating payment:', error);
      let errorMessage = 'An unexpected error occurred';
      if (error.data) {
        errorMessage = typeof error.data === 'string' ? error.data : JSON.stringify(error.data);
      }
      console.error('Error message to show user:', errorMessage);
      // Consider adding a state to show this error message in the UI
      // setErrorMessage(errorMessage);
    }
  };

  if (isLoadingPayments) {
    return <SafeAreaView>
      <ActivityIndicator size="large" color="#ccc" />
      <Text className='text-xl text-center'>Loading payment data...</Text>
    </SafeAreaView>;
  }

  // removed to load monthly payments
  // if (errorLoadingPayments) {
  //   return <Text>Error loading payment data.</Text>
  // }

  return (
    <SafeAreaView>
      <View className={`w-full h-full bg-white dark:bg-dacka-black pt-${insets.top}`}>
        <View className='px-4'>
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View className='flex-row w-full px-4 py-2 bg-white dark:bg-dacka-black'>
          <TouchableOpacity 
            className={`flex-1 py-3 rounded-l-full ${
              paymentType === 'dues' 
                ? 'bg-green-500 dark:bg-green-700' 
                : 'bg-gray-200 dark:bg-gray-700'
            }`} 
            onPress={() => setPaymentType('dues')}
          >
            <Text className={`font-semibold text-center ${
              paymentType === 'dues'
                ? 'text-white'
                : 'text-gray-700 dark:text-gray-300'
            }`}>
              Dues Payment
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`flex-1 py-3 rounded-r-full ${
              paymentType === 'pt' 
                ? 'bg-green-500 dark:bg-green-700' 
                : 'bg-gray-200 dark:bg-gray-700'
            }`} 
            onPress={() => setPaymentType('pt')}
          >
            <Text className={`font-semibold text-center ${
              paymentType === 'pt'
                ? 'text-white'
                : 'text-gray-700 dark:text-gray-300'
            }`}>
              Personal Training
            </Text>
          </TouchableOpacity>
        </View>
        <PaymentOverview  title='Payment Overview' leftSubtitle='Total Paid' rightSubtitle='Remaining' totalPayment={totalPayment} totalPaid={totalPaid} />
        <Text className={`text-xl text-center ${dues ? 'text-red-400' : 'text-green-400'}`}>{dues ? `you have overdued ${dues}₺` : 'You dont haave overdued payments'}</Text>
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          className="flex-1 px-4 pt-6 bg-white dark:bg-dacka-black rounded-t-3xl"
        >
          {paymentType === 'dues' ? (
            annualPayment.map((payment:Payment, index:number) => (
              <PaymentItem
                key={index}
                month={monthNames[payment.month]}
                amount={payment.amount}
                status={payment.status || 'pending'}
                isSelected={selectedMonths.includes(index)}
                isSelectionMode={isSelectionMode}
                onPress={isSelectionMode ? () => toggleMonthSelection(index) : null}
                onAmountChange={(newAmount) => handleAmountChange(index, newAmount)}
            />
      
            ))
          ) : (
            <Text className="py-4 text-center">Personal Training Payment data will be displayed here.</Text>
          )}
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
    </SafeAreaView>
  );
};

export default ManagerPlayerPaymentDetailPage;