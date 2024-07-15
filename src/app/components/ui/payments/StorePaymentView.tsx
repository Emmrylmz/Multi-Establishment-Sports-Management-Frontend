import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const StorePaymentView = ({ storeItems, selectedStoreItems, toggleStoreItemSelection, isSelectionMode }) => {
  return (
    <View className="py-4">
      <Text className="mb-6 text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
        Store Items
      </Text>
      {storeItems.map((item, index) => (
        <TouchableOpacity 
          key={index}
          className={`flex-row items-center justify-between px-4 py-3 mb-3 rounded-lg ${
            isSelectionMode && selectedStoreItems.includes(item)
              ? 'bg-green-500 dark:bg-green-700'
              : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
          }`}
          onPress={() => isSelectionMode && toggleStoreItemSelection(item)}
          disabled={!isSelectionMode}
        >
          <View className="flex-row items-center">
            <View className={`w-10 h-10 mr-3 rounded-full items-center justify-center ${
              isSelectionMode && selectedStoreItems.includes(item)
                ? 'bg-white'
                : 'bg-green-100 dark:bg-green-900'
            }`}>
              <Text className={`text-lg font-bold ${
                isSelectionMode && selectedStoreItems.includes(item)
                  ? 'text-green-500 dark:text-green-700'
                  : 'text-green-500 dark:text-green-400'
              }`}>
                {item[0]}
              </Text>
            </View>
            <Text className={`font-semibold ${
              isSelectionMode && selectedStoreItems.includes(item)
                ? 'text-white'
                : 'text-gray-800 dark:text-gray-200'
            }`}>
              {item}
            </Text>
          </View>
          {isSelectionMode && (
            <View className={`w-6 h-6 rounded-full border-2 ${
              selectedStoreItems.includes(item)
                ? 'bg-white border-white'
                : 'border-gray-400 dark:border-gray-500'
            }`}>
              {selectedStoreItems.includes(item) && (
                <View className="flex-1 m-0.5 rounded-full bg-green-500 dark:bg-green-700" />
              )}
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default StorePaymentView;