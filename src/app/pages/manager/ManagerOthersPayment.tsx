import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Modal, StatusBar } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';
import { useGetPersonalTrainingByPlayerIdQuery } from '../../../features/query/eventQueryService';
import { usePersonalTrainingResponseMutation } from '../../../features/query/paymentQueryService';

const PaymentItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} className="p-4 mb-4 bg-white shadow-md rounded-xl">
    <View className="flex-row items-center justify-between">
      <View>
        <Text className="text-lg font-bold text-gray-800">{item.description || 'Personal Training'}</Text>
        <Text className="text-sm text-gray-600">Coach ID: {item.coach_id}</Text>
      </View>
      <View className="items-end">
        <Text className="text-xl font-semibold text-green-600">{item.lesson_fee.toFixed(2)}₺</Text>
        <Text className="text-sm text-gray-500">{item.paid ? 'Paid' : 'Not Paid'}</Text>
      </View>
    </View>
    <View className={`mt-2 px-2 py-1 rounded-full self-start ${
      item.request_status === 'pending' ? 'bg-yellow-100' : 'bg-green-100'
    }`}>
      <Text className={`text-xs font-semibold ${
        item.request_status === 'pending' ? 'text-yellow-700' : 'text-green-700'
      }`}>{item.request_status}</Text>
    </View>
  </TouchableOpacity>
)

const ManagerOthersPayment = ({navigation, route}) => {
  const [selectedCategory, setSelectedCategory] = useState('Personal Training')
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const { player_id, team_id, discount, monthlyPaymentAmount } = route.params;

  const { data: personalTrainingData, isLoading, isError } = useGetPersonalTrainingByPlayerIdQuery(player_id);
  const [personalTrainingResponse] = usePersonalTrainingResponseMutation();

  const categoryData = [
    { label: 'Personal Training', value: 'Personal Training' },
    { label: 'Store', value: 'Store' },
    { label: 'Other', value: 'Other' },
  ]

  const [paymentData, setPaymentData] = useState({
    'Store': [
      { id: '1', name: 'Team Jersey', amount: 799.99, paymentMethod: 'Credit Card' },
      { id: '2', name: 'Basketball Shoes', amount: 1299.99, paymentMethod: 'Cash' },
      { id: '3', name: 'Gym Bag', amount: 399.99, paymentMethod: 'Bank Transfer' },
      { id: '4', name: 'Water Bottle', amount: 149.99, paymentMethod: 'Mobile Payment' },
    ],
    'Other': [
      { id: '1', name: 'Court Rental', amount: 1000.00, paymentMethod: 'Credit Card' },
      { id: '2', name: 'Equipment Maintenance', amount: 1500.00, paymentMethod: 'Bank Transfer' },
      { id: '3', name: 'Team Transportation', amount: 2000.00, paymentMethod: 'Cash' },
      { id: '4', name: 'First Aid Supplies', amount: 500.00, paymentMethod: 'Mobile Payment' },
    ],
  })

  const statusData = [
    { label: 'Paid', value: 'Paid' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Overdue', value: 'Overdue' },
  ];

  const paymentMethodData = [
    { label: 'Credit Card', value: 'Credit Card' },
    { label: 'Cash', value: 'Cash' },
    { label: 'Bank Transfer', value: 'Bank Transfer' },
    { label: 'Mobile Payment', value: 'Mobile Payment' },
  ];

  const paidStatusData = [
    { label: 'Paid', value: true },
    { label: 'Not Paid', value: false },
  ];

  const handleItemPress = (item) => {
    setSelectedItem(item)
    setModalVisible(true)
  }

  const handleStatusChange = (newStatus) => {
    updateItem('status', newStatus)
  }

  const handlePaymentMethodChange = (newMethod) => {
    updateItem('paymentMethod', newMethod)
  }

  const handlePaidStatusChange = (newPaidStatus) => {
    setSelectedItem(prevItem => ({
      ...prevItem,
      paid: newPaidStatus
    }));
  }

  const updateItem = (field, value) => {
    if (selectedCategory === 'Personal Training') {
      setSelectedItem({ ...selectedItem, [field]: value })
    } else {
      const updatedData = paymentData[selectedCategory].map(item => 
        item.id === selectedItem.id ? { ...item, [field]: value } : item
      )
      setPaymentData(prevData => ({
        ...prevData,
        [selectedCategory]: updatedData
      }))
      setSelectedItem({ ...selectedItem, [field]: value })
    }
  }

  const handleSave = async () => {
    if (selectedCategory === 'Personal Training') {
      try {
        const updateData = {
          lesson_id: selectedItem._id,
          status: selectedItem.paid ? 'paid' : 'unpaid'
        };
  
        console.log('Sending data:', updateData);
  
        const response = await personalTrainingResponse(updateData).unwrap();
        
        console.log('Personal training updated:', response);
        // You might want to update the local state or refetch the data here
      } catch (error) {
        console.error('Failed to update personal training:', error);
        if (error.data) {
          console.error('Error data:', error.data);
        }
        if (error.error) {
          console.error('Error details:', error.error);
        }
        if (error.response) {
          try {
            const text = await error.response.text();
            console.error('Raw server response:', text);
          } catch (e) {
            console.error('Could not read raw response:', e);
          }
        }
        // Handle the error (e.g., show an error message to the user)
      }
    } else {
      // Handle saving for other categories if needed
      console.log('Saving data for:', selectedCategory);
    }
    setModalVisible(false);
  };



  if (isLoading) {
    return (
      <SafeAreaView className="items-center justify-center flex-1 bg-gray-50">
        <Text>Loading...</Text>
      </SafeAreaView>
    )
  }

  if (isError) {
    return (
      <SafeAreaView className="items-center justify-center flex-1 bg-gray-50">
        <Text>Error loading data</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />
      <View className="flex-row items-center px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="p-2 bg-gray-100 rounded-full dark:bg-gray-800"
        >
          <Ionicons name="arrow-back-outline" size={24} color="black" className="dark:text-white" />
        </TouchableOpacity>
      </View>
      <View className="px-6 py-6 bg-white shadow-sm">
        <Text className="mb-4 text-3xl font-bold text-gray-800">Payment Management</Text>
        <View className="overflow-hidden bg-gray-100 rounded-xl">
          <Dropdown
            data={categoryData}
            labelField="label"
            valueField="value"
            value={selectedCategory}
            onChange={item => setSelectedCategory(item.value)}
            placeholder="Select category"
            className="p-3"
            containerStyle={{ borderRadius: 12 }}
            itemTextStyle={{ color: '#1e3a8a' }}
            selectedTextStyle={{ color: '#1e3a8a', fontWeight: 'bold' }}
            renderLeftIcon={() => <Ionicons name="menu-outline" size={24} color="#1e3a8a" />}
          />
        </View>
      </View>

      <FlatList
        data={selectedCategory === 'Personal Training' ? personalTrainingData : paymentData[selectedCategory]}
        renderItem={({ item }) => 
          <PaymentItem 
            item={item} 
            onPress={() => handleItemPress(item)}
          />
        }
        keyExtractor={item => item.id || item._id}
        contentContainerClassName="px-6 py-6"
      />

    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View className="justify-end flex-1 bg-black bg-opacity-50">
        <View className="p-6 bg-white rounded-t-3xl">
          {selectedItem && (
            <>
              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-2xl font-bold text-gray-800">
                  {selectedCategory === 'Personal Training' ? (selectedItem.description || 'Personal Training') : selectedItem.name}
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close-circle" size={32} color="#3b82f6" />
                </TouchableOpacity>
              </View>
              <Text className="mb-4 text-3xl font-bold text-green-600">
                {(selectedCategory === 'Personal Training' ? selectedItem.lesson_fee : selectedItem.amount).toFixed(2)}₺
              </Text>
              {selectedCategory === 'Personal Training' ? (
                <>
                  <Text className="mb-2 text-lg">Coach ID: {selectedItem.coach_id}</Text>
                  <Text className="mb-2 text-lg">Start: {new Date(selectedItem.start_datetime).toLocaleString()}</Text>
                  <Text className="mb-2 text-lg">End: {new Date(selectedItem.end_datetime).toLocaleString()}</Text>
                  <Text className="mb-2 text-lg">Status: {selectedItem.request_status}</Text>
                  <Text className="mb-2 text-lg font-semibold">Paid Status:</Text>
                  <Dropdown
                    data={paidStatusData}
                    labelField="label"
                    valueField="value"
                    value={selectedItem.paid}
                    onChange={item => handlePaidStatusChange(item.value)}
                    placeholder="Select paid status"
                    className="p-3 mb-4 border border-gray-300 rounded-xl"
                    containerStyle={{ borderRadius: 12 }}
                    itemTextStyle={{ color: '#1e3a8a' }}
                    selectedTextStyle={{ color: '#1e3a8a', fontWeight: 'bold' }}
                  />
                  <Text className="mb-4 text-lg">Place: {selectedItem.place}</Text>
                </>
              ) : (
                <>
                  <Text className="mb-2 text-lg font-semibold">Payment Method:</Text>
                  <Dropdown
                    data={paymentMethodData}
                    labelField="label"
                    valueField="value"
                    value={selectedItem.paymentMethod}
                    onChange={item => handlePaymentMethodChange(item.value)}
                    placeholder="Select payment method"
                    className="p-3 mb-6 border border-gray-300 rounded-xl"
                    containerStyle={{ borderRadius: 12 }}
                    itemTextStyle={{ color: '#1e3a8a' }}
                    selectedTextStyle={{ color: '#1e3a8a', fontWeight: 'bold' }}
                  />
                </>
              )}
              <TouchableOpacity 
                onPress={handleSave}
                className="py-3 bg-green-500 rounded-xl"
              >
                <Text className="text-lg font-bold text-center text-white">Save</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
    </SafeAreaView>
  )
}

export default ManagerOthersPayment