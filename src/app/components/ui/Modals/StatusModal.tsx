import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type StatusModalProps = {
  visible: boolean;
  onClose: () => void;
  message: string;
  type: 'success' | 'failure';
};

const StatusModal: React.FC<StatusModalProps> = ({ visible, onClose, message, type }) => {
  const iconName = type === 'success' ? 'check-circle' : 'close-circle';
  const iconColor = type === 'success' ? '#4CAF50' : '#F44336';
  const buttonColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const buttonText = type === 'success' ? 'OK' : 'Try Again';

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white p-6 rounded-2xl w-4/5 items-center">
          <Icon name={iconName} size={60} color={iconColor} />
          <Text className="text-xl font-bold mt-4 mb-2 text-center">{message}</Text>
          <TouchableOpacity
            onPress={onClose}
            className={`mt-4 py-2 px-6 rounded-full ${buttonColor}`}
          >
            <Text className="text-white font-bold">{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default StatusModal;
