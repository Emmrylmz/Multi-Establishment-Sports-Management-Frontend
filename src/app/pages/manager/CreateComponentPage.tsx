import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo

const ExpenseManager = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalExpenses(total);
  }, [expenses]);

  const addExpense = () => {
    if (description && amount) {
      const newExpense = {
        id: Date.now(),
        description,
        amount: parseFloat(amount),
        date: new Date().toLocaleDateString()
      };
      setExpenses([newExpense, ...expenses]);
      setDescription('');
      setAmount('');
    }
  };

  const renderExpenseItem = ({ item }) => (
    <View className="flex-row items-center justify-between py-4 border-b border-gray-200">
      <View className="flex-1">
        <Text className="text-lg font-medium text-gray-800">{item.description}</Text>
        <Text className="text-sm text-gray-500">{item.date}</Text>
      </View>
      <Text className="text-lg font-semibold text-indigo-600">${item.amount.toFixed(2)}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 px-6 pt-8">
        <Text className="mb-8 text-3xl font-bold text-gray-800">Expense Manager</Text>
        
        <View className="p-6 mb-8 bg-white shadow-md rounded-xl">
          <TextInput
            className="p-4 mb-4 text-gray-800 bg-gray-100 rounded-lg"
            placeholder="Expense description"
            placeholderTextColor="#a0aec0"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            className="p-4 mb-6 text-gray-800 bg-gray-100 rounded-lg"
            placeholder="Amount"
            placeholderTextColor="#a0aec0"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <TouchableOpacity 
            className="flex-row items-center justify-center px-6 py-4 bg-indigo-600 rounded-lg"
            onPress={addExpense}
          >
            <Ionicons name="add-circle-outline" size={24} color="white" />
            <Text className="ml-2 text-lg font-semibold text-white">Add Expense</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-2xl font-semibold text-gray-800">Recent Expenses</Text>
          <Text className="text-lg font-semibold text-indigo-600">
            Total: ${totalExpenses.toFixed(2)}
          </Text>
        </View>

        <FlatList
          data={expenses}
          renderItem={renderExpenseItem}
          keyExtractor={(item) => item.id.toString()}
          className="p-4 bg-white shadow-md rounded-xl"
          ListEmptyComponent={
            <Text className="py-4 text-center text-gray-500">No expenses added yet.</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default ExpenseManager;