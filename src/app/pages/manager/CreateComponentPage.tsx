import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Modal, StatusBar } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';

const PaymentItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} className="p-4 mb-4 bg-white shadow-md rounded-xl">
    <View className="flex-row items-center justify-between">
      <View>
        <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
        {item.coach && <Text className="text-sm text-gray-600">Coach: {item.coach}</Text>}
      </View>
      <View className="items-end">
        <Text className="text-xl font-semibold text-green-600">{item.amount.toFixed(2)}₺</Text>
        <Text className="text-sm text-gray-500">{item.paymentMethod || 'Not set'}</Text>
      </View>
    </View>
    {item.status && (
      <View className={`mt-2 px-2 py-1 rounded-full self-start ${
        item.status === 'Paid' ? 'bg-green-100' : 
        item.status === 'Pending' ? 'bg-yellow-100' : 'bg-red-100'
      }`}>
        <Text className={`text-xs font-semibold ${
          item.status === 'Paid' ? 'text-green-700' : 
          item.status === 'Pending' ? 'text-yellow-700' : 'text-red-700'
        }`}>{item.status}</Text>
      </View>
    )}
  </TouchableOpacity>
)

const CreateComponentPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Personal Training')
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const categoryData = [
    { label: 'Personal Training', value: 'Personal Training' },
    { label: 'Store', value: 'Store' },
    { label: 'Other', value: 'Other' },
  ]

  const [paymentData, setPaymentData] = useState({
    'Personal Training': [
      { id: '1', name: 'John Doe', amount: 10000, coach: 'Mike Johnson', position: 'Point Guard', paymentDate: '2024-07-15', status: 'Paid', paymentMethod: 'Credit Card' },
      { id: '2', name: 'Jane Smith', amount: 10000, coach: 'Sarah Williams', position: 'Shooting Guard', paymentDate: '2024-07-10', status: 'Pending', paymentMethod: 'Cash' },
      { id: '3', name: 'Bob Brown', amount: 10000, coach: 'Mike Johnson', position: 'Center', paymentDate: '2024-07-05', status: 'Paid', paymentMethod: 'Bank Transfer' },
      { id: '4', name: 'Alice Johnson', amount: 10000, coach: 'Tom Davis', position: 'Power Forward', paymentDate: '2024-07-20', status: 'Overdue', paymentMethod: 'Mobile Payment' },
    ],
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

  const updateItem = (field, value) => {
    const updatedData = paymentData[selectedCategory].map(item => 
      item.id === selectedItem.id ? { ...item, [field]: value } : item
    )
    setPaymentData(prevData => ({
      ...prevData,
      [selectedCategory]: updatedData
    }))
    setSelectedItem({ ...selectedItem, [field]: value })
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />
      <View className="px-6 pt-12 pb-6 bg-white shadow-sm">
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
        data={paymentData[selectedCategory]}
        renderItem={({ item }) => 
          <PaymentItem 
            item={item} 
            onPress={() => handleItemPress(item)}
          />
        }
        keyExtractor={item => item.id}
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
                  <Text className="text-2xl font-bold text-gray-800">{selectedItem.name}</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Ionicons name="close-circle" size={32} color="#3b82f6" />
                  </TouchableOpacity>
                </View>
                <Text className="mb-4 text-3xl font-bold text-green-600">{selectedItem.amount.toFixed(2)}₺</Text>
                {selectedItem.coach && <Text className="mb-2 text-lg">Coach: {selectedItem.coach}</Text>}
                {selectedItem.position && <Text className="mb-2 text-lg">Position: {selectedItem.position}</Text>}
                {selectedItem.paymentDate && <Text className="mb-4 text-lg">Payment Date: {selectedItem.paymentDate}</Text>}
                {selectedCategory === 'Personal Training' && (
                  <>
                    <Text className="mb-2 text-lg font-semibold">Status:</Text>
                    <Dropdown
                      data={statusData}
                      labelField="label"
                      valueField="value"
                      value={selectedItem.status}
                      onChange={item => handleStatusChange(item.value)}
                      placeholder="Select status"
                      className="p-3 mb-4 border border-gray-300 rounded-xl"
                      containerStyle={{ borderRadius: 12 }}
                      itemTextStyle={{ color: '#1e3a8a' }}
                      selectedTextStyle={{ color: '#1e3a8a', fontWeight: 'bold' }}
                    />
                  </>
                )}
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
                <TouchableOpacity 
                  onPress={() => setModalVisible(false)}
                  className="py-3 bg-blue-500 rounded-xl"
                >
                  <Text className="text-lg font-bold text-center text-white">Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default CreateComponentPage