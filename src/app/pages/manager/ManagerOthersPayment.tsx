import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Modal,
  StatusBar,
  TextInput,
  Alert,
  useColorScheme,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';
import {
  useGetPaymentByYearQueryQuery,
  useMakeSinglePaymentMutation,
  useUpdatePaymentMutation,
} from '../../../features/query/paymentQueryService';

const PaymentItem = ({ item, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="p-4 mb-4 bg-white shadow-md dark:bg-dacka-dark-gray rounded-xl"
  >
    <View className="flex-row items-center justify-between">
      <View>
        <Text className="text-lg font-bold text-gray-800 dark:text-gray-100">
          {item.description || 'Payment'}
        </Text>
        <Text className="text-sm text-gray-600 dark:text-gray-50">
          Due: {new Date(item.due_date).toLocaleDateString()}
        </Text>
      </View>
      <View className="items-end">
        <Text className="text-xl font-semibold text-green-600">
          {item.amount.toFixed(2)}₺
        </Text>
        <Text
          className={`text-sm ${item.status === 'paid' ? 'text-green-500' : 'text-red-500'}`}
        >
          {item.status}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const ManagerOthersPayment = ({ navigation, route }) => {
  const isDark = useColorScheme() === 'dark';
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPaymentType, setSelectedPaymentType] = useState('private_lesson');
  const [paymentData, setPaymentData] = useState({
    user_id: route.params.player_id,
    payment_type: 'private_lesson',
    payment_with: 'cash',
    due_date: new Date().toISOString(),
    amount: 0,
    status: 'pending',
    month: new Date().getMonth() + 1,
    year: selectedYear,
    province: 'Izmir',
    description: '',
  });

  const {
    data: payments,
    error: paymentError,
    isLoading: isLoadingPayments,
    refetch,
  } = useGetPaymentByYearQueryQuery({
    userId: route.params.player_id,
    year: selectedYear,
  });

  const [makeSinglePayment, { isLoading: isCreating }] = useMakeSinglePaymentMutation();
  const [updatePayment, { isLoading: isUpdating }] = useUpdatePaymentMutation();

  const filteredPayments = useMemo(
    () =>
      payments?.filter(
        (payment) =>
          payment.payment_type !== 'monthly' &&
          payment.payment_type === selectedPaymentType
      ) || [],
    [payments, selectedPaymentType]
  );

  const paymentTypes = [
    { label: 'Private Lessons', value: 'private_lesson' },
    { label: 'Store Purchases', value: 'store_purchase' },
    { label: 'Other', value: 'other' },
  ];

  const handleItemPress = useCallback((item) => {
    setPaymentData({
      ...item,
      amount: parseFloat(item.amount),
    });
    setModalVisible(true);
  }, []);

  const handleCreatePayment = useCallback(() => {
    setPaymentData({
      user_id: route.params.player_id,
      payment_type: selectedPaymentType,
      payment_with: 'cash',
      due_date: new Date().toISOString(),
      amount: 0,
      status: 'pending',
      month: new Date().getMonth() + 1,
      year: selectedYear,
      province: 'Izmir',
      description: '',
    });
    setModalVisible(true);
  }, [route.params.player_id, selectedPaymentType, selectedYear]);

  const handleSave = useCallback(async () => {
    try {
      let result;
      if (paymentData._id) {
        // Update existing payment
        const updatePayload = {
          _id: paymentData._id,
          amount: paymentData.amount,
          due_date: paymentData.due_date,
          status: paymentData.status,
          province: paymentData.province,
        };
        result = await updatePayment(updatePayload).unwrap();
      } else {
        // Create new payment
        const newPayment = {
          user_id: paymentData.user_id,
          payment_type: paymentData.payment_type,
          payment_with: paymentData.payment_with,
          due_date: paymentData.due_date,
          amount: paymentData.amount,
          status: paymentData.status,
          month: paymentData.month,
          year: paymentData.year,
          province: paymentData.province,
          description: paymentData.description,
        };
        result = await makeSinglePayment(newPayment).unwrap();
      }
      console.log('Payment saved:', JSON.stringify(result, null, 2));
      refetch();
      setModalVisible(false);
    } catch (error) {
      console.error('Failed to save payment:', error);
      if (error.data) {
        console.error('Error data:', JSON.stringify(error.data, null, 2));
      }
      Alert.alert('Error', 'Failed to save payment. Please try again.');
    }
  }, [paymentData, updatePayment, makeSinglePayment, refetch]);

  const updatePaymentField = useCallback((field, value) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }));
  }, []);

  if (isLoadingPayments) {
    return (
      <SafeAreaView className="items-center justify-center flex-1 bg-gray-50">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (paymentError) {
    return (
      <SafeAreaView className="items-center justify-center flex-1 bg-gray-50">
        <Text>Error loading data</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-dacka-black">
      <StatusBar barStyle={isDark ? 'dark-content' : 'light-content'} />
      <View className="px-4 py-6 bg-white shadow-sm dark:bg-dacka-black">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 bg-gray-200 rounded-full"
          >
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-800 dark:text-gray-100 dark:">
            Payment Management
          </Text>
          <TouchableOpacity
            onPress={handleCreatePayment}
            className="p-2 rounded-full bg-dacka-light-green"
          >
            <Ionicons name="add-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View className="flex-row space-x-2">
          <View className="flex-1">
            <Dropdown
              data={paymentTypes}
              labelField="label"
              valueField="value"
              value={selectedPaymentType}
              onChange={(item) => setSelectedPaymentType(item.value)}
              placeholder="Select payment type"
              className="p-3 bg-gray-200 rounded-xl"
            />
          </View>
          <View className="w-1/3">
            <Dropdown
              data={[2023, 2024, 2025].map((year) => ({
                label: year.toString(),
                value: year,
              }))}
              labelField="label"
              valueField="value"
              value={selectedYear}
              onChange={(item) => setSelectedYear(item.value)}
              placeholder="Year"
              className="p-3 bg-gray-200 rounded-xl"
            />
          </View>
        </View>
      </View>

      <FlatList
        data={filteredPayments}
        renderItem={({ item }) => (
          <PaymentItem item={item} onPress={() => handleItemPress(item)} />
        )}
        keyExtractor={(item) => item._id}
        contentContainerClassName="px-4 py-4"
        ListEmptyComponent={() => (
          <View className="items-center justify-center p-4">
            <Text className="text-lg text-gray-500">No payments found</Text>
          </View>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="justify-end flex-1 bg-black bg-opacity-50">
          <View className="p-6 bg-white rounded-t-3xl">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-2xl font-bold text-gray-800">
                {paymentData._id ? 'Edit Payment' : 'Create Payment'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close-circle" size={32} color="#3b82f6" />
              </TouchableOpacity>
            </View>
            <TextInput
              value={paymentData.description}
              onChangeText={(text) => updatePaymentField('description', text)}
              placeholder="Description"
              className="p-3 mb-4 bg-gray-100 rounded-xl"
            />
            <TextInput
              value={paymentData.amount.toString()}
              onChangeText={(text) =>
                updatePaymentField('amount', parseFloat(text) || 0)
              }
              placeholder="Amount"
              keyboardType="numeric"
              className="p-3 mb-4 bg-gray-100 rounded-xl"
            />
            <Dropdown
              data={[
                { label: 'Pending', value: 'pending' },
                { label: 'Paid', value: 'paid' },
                { label: 'Overdue', value: 'overdue' },
              ]}
              labelField="label"
              valueField="value"
              value={paymentData.status}
              onChange={(item) => updatePaymentField('status', item.value)}
              placeholder="Select status"
              className="p-3 mb-4 bg-gray-100 rounded-xl"
            />
            {!paymentData._id && (
              <Dropdown
                data={[
                  { label: 'Cash', value: 'cash' },
                  { label: 'Credit Card', value: 'credit_card' },
                  { label: 'Bank Transfer', value: 'bank_transfer' },
                ]}
                labelField="label"
                valueField="value"
                value={paymentData.payment_with}
                onChange={(item) =>
                  updatePaymentField('payment_with', item.value)
                }
                placeholder="Payment method"
                className="p-3 mb-4 bg-gray-100 rounded-xl"
              />
            )}
            <TouchableOpacity
              onPress={handleSave}
              disabled={isCreating || isUpdating}
              className={`py-3 rounded-xl ${
                isCreating || isUpdating ? 'bg-gray-400' : 'bg-blue-500'
              }`}
            >
              <Text className="text-lg font-bold text-center text-white">
                {isCreating || isUpdating ? 'Saving...' : 'Save'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ManagerOthersPayment;
