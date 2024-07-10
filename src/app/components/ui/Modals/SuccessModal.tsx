import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SuccessModal = ({ visible, onClose, message }) => (
  <Modal transparent visible={visible} animationType="fade">
    <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
      <View className="bg-white p-6 rounded-2xl w-4/5 items-center">
        <Icon name="check-circle" size={60} color="#4CAF50" />
        <Text className="text-xl font-bold mt-4 mb-2 text-center">{message}</Text>
        <TouchableOpacity 
          onPress={onClose}
          className="mt-4 bg-green-500 py-2 px-6 rounded-full"
        >
          <Text className="text-white font-bold">OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default SuccessModal;
