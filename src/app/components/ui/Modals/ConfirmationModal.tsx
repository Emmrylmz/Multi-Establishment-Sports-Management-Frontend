import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { useTranslation } from 'react-i18next';

const ConfirmationModal = ({ visible, onClose, selectedMonths, totalAmount, onConfirm, monthNames, annualPayment }) => {
  const { t } = useTranslation();
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="justify-end flex-1 bg-black bg-opacity-50">
        <View className="p-6 bg-white dark:bg-gray-900 rounded-t-3xl">
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-2xl font-bold text-gray-800 dark:text-gray-100">{t("confirmationModal.title")}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-circle-outline" size={28} color="#4A5568" />
            </TouchableOpacity>
          </View>
          
          <ScrollView className="mb-4 max-h-80">
            {selectedMonths.length > 0 ? (
              selectedMonths.map((monthIndex) => {
                const payment = annualPayment[monthIndex];
                return (
                  <View key={monthIndex} className="flex-row items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <Text className="text-lg text-gray-700 dark:text-gray-300">{monthNames[monthIndex]}</Text>
                    <View>
                      <Text className="text-lg font-semibold text-right text-emerald-600 dark:text-emerald-400">
                        ${payment?.amount?.toFixed(2) || 'N/A'}
                      </Text>
                      <Text className={`text-right text-sm ${payment?.status === 'paid' ? 'text-blue-500' : 'text-amber-500'}`}>
                        {payment?.status || 'N/A'}
                      </Text>
                    </View>
                  </View>
                );
              })
            ) : (
              <Text className="text-lg text-gray-600 dark:text-gray-400">{t("confirmationModal.falsyCondition")}</Text>
            )}
          </ScrollView>
          
          <View className="pt-4 mb-6 border-t border-gray-200 dark:border-gray-700">
            <Text className="text-xl font-bold text-gray-800 dark:text-gray-100">{t("confirmationModal.totalAmount")}</Text>
            <Text className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
          ${totalAmount?.toFixed(2) || '0.00'}
        </Text>
          </View>
          
          <TouchableOpacity 
            onPress={onConfirm}
            className="py-4 mb-3 rounded-full shadow-lg bg-emerald-600"
          >
            <Text className="text-lg font-semibold text-center text-white">{t("confirmationModal.confirm")}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={onClose}
            className="py-4 bg-gray-200 rounded-full dark:bg-gray-700"
          >
            <Text className="text-lg font-semibold text-center text-gray-800 dark:text-gray-200">{t("confirmationModal.cancel")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal