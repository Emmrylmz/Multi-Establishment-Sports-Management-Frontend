import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import ExpenseCard from '../../components/ui/ExpenseCard';

// Define a type for the payment objects
type Payment = {
  item_id: number;
  item_name: string;
  type: string;
  date: string;
  price: number;
};

const PaymentPage = () => {
  const upcomingPayments: Payment[] = [
    { item_id: 1, item_name: "Store Purchase", type: 'store', date: '13-05-2024', price: 999 },
    { item_id: 2, item_name: "Ticket Purchase", type: 'ticket-alt', date: '15-05-2024', price: 39 },
    { item_id: 3, item_name: "Monthly Subscription", type: 'money-check-alt', date: "01-06-2024", price: 499 },
    { item_id: 4, item_name: "Jersey Purchase", type: 'tshirt', date: '20-05-2024', price: 18 },
    { item_id: 5, item_name: "Store Purchase", type: 'store', date: '13-05-2024', price: 999 },
    { item_id: 6, item_name: "Jersey Purchase", type: 'tshirt', date: '23-05-2024', price: 29 },
    { item_id: 7, item_name: "Store Purchase", type: 'store', date: '13-06-2024', price: 999 },
    { item_id: 8, item_name: "Monthly Subscription", type: 'money-check-alt', date: '01-06-2024', price: 999 },
    { item_id: 9, item_name: "Ticket Purchase", type: 'ticket-alt', date: '15-05-2024', price: 39 },
    { item_id: 10, item_name: "Store Purchase", type: 'store', date: '21-05-2024', price: 999 },
  ];

  const pastPayments: Payment[] = [
    { item_id: 1, item_name: "Store Purchase", type: 'store', date: '10-05-2024', price: 9 },
    { item_id: 2, item_name: "Ticket Purchase", type: 'ticket-alt', date: '15-04-2024', price: 3 },
    { item_id: 3, item_name: "Monthly Subscription", type: 'money-check-alt', date: "01-05-2024", price: 4 },
    { item_id: 4, item_name: "Jersey Purchase", type: 'tshirt', date: '8-05-2024', price: 29 },
    { item_id: 5, item_name: "Store Purchase", type: 'store', date: '6-05-2024', price: 999 },
    { item_id: 6, item_name: "Jersey Purchase", type: 'tshirt', date: '23-04-2024', price: 19 },
    { item_id: 7, item_name: "Store Purchase", type: 'store', date: '13-04-2024', price: 799 },
    { item_id: 8, item_name: "Monthly Subscription", type: 'money-check-alt', date: '01-03-2024', price: 1000 },
    { item_id: 9, item_name: "Ticket Purchase", type: 'ticket-alt', date: '15-04-2024', price: 329 },
    { item_id: 10, item_name: "Store Purchase", type: 'store', date: '21-04-2024', price: 999 },
  ];

  const allPayments: Payment[][] = [upcomingPayments, pastPayments];
  const [activePaymentTab, setActivePaymentTab] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>('');

  const changeActivePaymentTab = (listToDisplay: string) => {
    setActivePaymentTab(listToDisplay === 'upcoming' ? 0 : 1);
  };

  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };

  const filterPayments = (payments: Payment[]) => {
    return payments.filter(payment => payment.item_name.toLowerCase().includes(searchText.toLowerCase()));
  };

  const displayedPayments = filterPayments(allPayments[activePaymentTab]);

  return (
    <AppLayout>
      <View className='w-full h-full'>
        <TextInput
          placeholder='Search'
          placeholderTextColor="#919191"
          autoCapitalize="none"
          autoCorrect={false}
          className='text-white p-2 mb-3 border rounded-md border-[#424141] placeholder:text-base bg-dacka-dark-gray'
          onChangeText={handleSearchChange}
          value={searchText}
        />
        <View className='flex-row w-full'>
          <TouchableOpacity
            className={`w-1/2 py-2 bg-dacka-dark-gray ${activePaymentTab === 0 ? 'border-b border-dacka-gray' : ''}`}
            onPress={() => changeActivePaymentTab('upcoming')}
          >
            <Text className={`text-center text-base ${activePaymentTab === 0 ? 'text-white' : 'text-dacka-gray'}`}>
              Upcoming Payments
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`w-1/2 py-2 bg-dacka-dark-gray ${activePaymentTab === 1 ? 'border-b border-dacka-gray' : ''}`}
            onPress={() => changeActivePaymentTab('past')}
          >
            <Text className={`text-center text-base ${activePaymentTab === 1 ? 'text-white' : 'text-dacka-gray'}`}>
              Past Payments
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView className='mt-3'>
          {displayedPayments.map((payment, index) => (
            <ExpenseCard key={payment.item_id} date={payment.date} type={payment.type} name={payment.item_name} price={payment.price} />
          ))}
        </ScrollView>
      </View>
    </AppLayout>
  );
};

export default PaymentPage;
