import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const PersonalTrainingView = ({ ptSessions, isSelectionMode, selectedSessions, toggleSessionSelection }) => {
  console.log('PT Sessions:', ptSessions);
  
  if (!ptSessions || ptSessions.length === 0) {
    return <Text className="mt-6 text-center text-gray-600">No personal training sessions available.</Text>;
  }

  return (
    <ScrollView className="px-4 py-6">
      <Text className="mb-6 text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
        Personal Training History
      </Text>
      {ptSessions.map((session) => (
        <TouchableOpacity 
          key={session.id}
          className={`mb-4 rounded-lg shadow-md overflow-hidden ${
            isSelectionMode && selectedSessions.includes(session.id)
              ? 'bg-blue-100 dark:bg-blue-900'
              : session.paid
                ? 'bg-gray-100 dark:bg-gray-700'
                : 'bg-white dark:bg-gray-800'
          }`}
          onPress={() => {
            if (isSelectionMode && !session.paid) {
              toggleSessionSelection(session.id);
            }
          }}
          disabled={session.paid}
        >
          <View className="p-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {new Date(session.date).toLocaleDateString()}
              </Text>
              <View className={`px-2 py-1 rounded-full ${
                session.paid 
                  ? 'bg-green-200 dark:bg-green-700' 
                  : 'bg-red-200 dark:bg-red-700'
              }`}>
                <Text className={`text-xs font-medium ${
                  session.paid
                    ? 'text-green-800 dark:text-green-200'
                    : 'text-red-800 dark:text-red-200'
                }`}>
                  {session.paid ? 'Paid' : 'Unpaid'}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-600 dark:text-gray-400">
                Duration: {session.duration} min
              </Text>
              <Text className="text-lg font-bold text-green-600 dark:text-green-400">
                ${session.amount}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default PersonalTrainingView;