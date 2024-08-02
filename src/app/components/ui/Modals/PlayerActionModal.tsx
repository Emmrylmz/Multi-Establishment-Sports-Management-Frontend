import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { useTranslation } from 'react-i18next';

type PlayerActionModalProps = {
  visible: boolean;
  onClose: () => void;
  playerName: string;
  onSeeDetails: () => void;
  onRatePlayer: () => void;
}

const PlayerActionModal = ({ visible, onClose, playerName, onSeeDetails, onRatePlayer }: PlayerActionModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        className="justify-end flex-1"
        activeOpacity={1} 
        onPress={onClose}
      >
        <View className="p-5 bg-white shadow-lg dark:bg-dacka-dark-gray rounded-t-3xl">
          <Text className="mb-5 text-2xl font-bold text-center text-gray-900 dark:text-dacka-white">
            {playerName}
          </Text>
          <TouchableOpacity 
            className="p-4 mb-3 bg-blue-500 rounded-lg dark:bg-blue-600"
            onPress={onSeeDetails}
          >
            <Text className="text-base text-center text-white">
              {t("eventDetailPage.playerActionModal.seePlayerDetails")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="p-4 bg-green-500 rounded-lg dark:bg-green-600"
            onPress={onRatePlayer}
          >
            <Text className="text-base text-center text-white">
              {t("eventDetailPage.playerActionModal.ratePlayer")}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

export default PlayerActionModal;