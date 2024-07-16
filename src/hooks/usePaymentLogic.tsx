import { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import { useGetPaymentQuery, useCreatePaymentMutation } from '../features/query/paymentQueryService';
import { usePlayer_private_lessonsQuery } from '../features/query/personalTrainingService';
import { useAuthStatus } from './useAuthStatus';

const usePaymentLogic = (player_id, team_id, paymentType) => {
	const { user } = useAuthStatus(); 
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [selectedStoreItems, setSelectedStoreItems] = useState([]);
  const [discountReason, setDiscountReason] = useState('');
  const [ptTotalPayment, setPtTotalPayment] = useState(0);
  const [ptTotalPaid, setPtTotalPaid] = useState(0);
  const [annualPayment, setAnnualPayment] = useState([]);

  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.5));

  const { data, error, isLoading: isLoadingPayments, refetch } = useGetPaymentQuery(player_id);
  const [createPayment, { isLoading: isCreatingPayment, isError: isCreatePaymentError }] = useCreatePaymentMutation();

  const {data: paymentData} = usePlayer_private_lessonsQuery(player_id)
  console.log('Data:',paymentData)

  const [ptSessions, setPtSessions] = useState([
    { id: 1, date: '2024-07-10', duration: 60, paid: true, amount: 50 },
    { id: 2, date: '2024-07-15', duration: 90, paid: true, amount: 75 },
    { id: 3, date: '2024-07-20', duration: 60, paid: false, amount: 50 },
    { id: 4, date: '2024-07-25', duration: 120, paid: true, amount: 100 },
    { id: 5, date: '2024-07-30', duration: 60, paid: false, amount: 50 },
  ]);

  const storeItems = ['T-Shirt', 'Hoodie', 'Training Jersey', 'Game Jersey', 'Backpack'];

  useEffect(() => {
    const total = ptSessions.reduce((sum, session) => sum + session.amount, 0);
    const paid = ptSessions.reduce((sum, session) => session.paid ? sum + session.amount : sum, 0);
    
    setPtTotalPayment(total);
    setPtTotalPaid(paid);
  }, [ptSessions]);

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

  const generateAnnualPayment = (data) => {
    const monthsInYear = 12;
    const paymentMap = new Map(data.map((payment) => [payment.month, payment]));

    const fullAnnualPayment = Array.from({ length: monthsInYear }, (_, month) => {
      return paymentMap.get(month) || { month, amount: 2000, paid: false };
    });

    setAnnualPayment(fullAnnualPayment);
    return fullAnnualPayment;
  };

  useEffect(() => {
    if (data) {
      generateAnnualPayment(data);
    }
  }, [data]);

  const updateMonthAmount = (monthIndex, newAmount) => {
    setAnnualPayment(prev => {
      const newPayment = [...prev];
      newPayment[monthIndex] = { ...newPayment[monthIndex], amount: parseInt(newAmount) || 0 };
      return newPayment;
    });
  };

  const totalPaid = annualPayment.reduce((acc, payment) => payment.paid ? acc + payment.amount : acc, 0);
  const totalPayment = annualPayment.reduce((acc, payment) => acc + payment.amount, 0);

  const toggleSelectionMode = () => {
    setIsSelectionMode(prev => !prev);
    if (paymentType === 'dues') {
      setSelectedMonths([]);
    } else if (paymentType === 'pt') {
      setSelectedSessions([]);
    } else if (paymentType === 'store') {
      setSelectedStoreItems([]);
    }
  };

  const toggleMonthSelection = (index) => {
    if (annualPayment[index].paid || !isSelectionMode) return;

    setSelectedMonths(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const toggleSessionSelection = (sessionId) => {
    setSelectedSessions(prev => 
      prev.includes(sessionId) 
        ? prev.filter(id => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const toggleStoreItemSelection = (item) => {
    setSelectedStoreItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item) 
        : [...prev, item]
    );
  };

  const markAsPaid = async () => {
    setIsSelectionMode(false);

  let newPayment;

  if (paymentType === 'dues') {
    const totalAmount = selectedMonths.reduce((sum, monthIndex) => sum + annualPayment[monthIndex].amount, 0);
    const months_and_amounts = {};
    
    selectedMonths.forEach(monthIndex => {
      months_and_amounts[monthIndex] = {
        month: monthIndex,
        amount: annualPayment[monthIndex].amount
      };
    });

    newPayment = {
      user_id: player_id,
      amount: totalAmount,
      months_and_amounts: months_and_amounts,
      year: new Date().getFullYear(),
      status: 'pending',
      paid_date: new Date().toISOString(),
      province: user?.province || '' // Provide a default value if province is missing
    };
    
      console.log('New Payment Object:', JSON.stringify(newPayment, null, 2));
    } else if (paymentType === 'pt') {
      const selectedPTSessions = ptSessions.filter(session => selectedSessions.includes(session.id));
      const totalAmount = selectedPTSessions.reduce((sum, session) => sum + session.amount, 0);
  
      newPayment = {
        user_id: player_id,
        team_id: team_id,
        amount: totalAmount,
        months: [],
        year: new Date().getFullYear(),
        paid: true,
        paid_date: new Date().toISOString(),
        discount_reason: discountReason
      };

      setPtSessions(prevSessions => 
        prevSessions.map(session => 
          selectedSessions.includes(session.id) ? {...session, paid: true} : session
        )
      );
    } else if (paymentType === 'store') {
      newPayment = {
        user_id: player_id,
        team_id: team_id,
        amount: 0, // Calculate based on selected items
        months: [],
        year: new Date().getFullYear(),
        paid: true,
        paid_date: new Date().toISOString(),
        discount_reason: discountReason
      };

      
    }
  
    try {
      const response = await createPayment(newPayment).unwrap();
      console.log('Payment creation successful:', response);
      refetch();
      setSelectedMonths([]);
      setSelectedSessions([]);
      setSelectedStoreItems([]);
    }catch (error) {
      console.error('Payment creation failed:', error);
      if (error.data && error.data.detail) {
        console.error('Error details:', JSON.stringify(error.data.detail, null, 2));
      }
    }
  };

  return {
    isSelectionMode,
    toggleSelectionMode,
    markAsPaid,
    isCreatingPayment,
    isCreatePaymentError,
    scaleAnim,
    fadeAnim,
    paymentData: {
      totalPayment: paymentType === 'pt' ? ptTotalPayment : totalPayment,
      totalPaid: paymentType === 'pt' ? ptTotalPaid : totalPaid,
      annualPayment,
      ptSessions,
      storeItems,
      selectedMonths,
      selectedSessions,
      selectedStoreItems,
      toggleMonthSelection,
      toggleSessionSelection,
      toggleStoreItemSelection,
      setDiscountReason,
      updateMonthAmount,
    },
  };
};

export default usePaymentLogic;