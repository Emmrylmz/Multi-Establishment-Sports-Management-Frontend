import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';

type DeleteConstantModalProps = {
  isVisible: boolean;
  deletingConstant: { key: string; value: number; description: string } | null;
  isDeleting: boolean;
  handleCloseDeleteModal: () => void;
  handleDeleteConstant: () => void;
}

const DeleteConstantModal: React.FC<DeleteConstantModalProps> = ({
  isVisible,
  deletingConstant,
  isDeleting,
  handleCloseDeleteModal,
  handleDeleteConstant,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleCloseDeleteModal}
    >
      <View className="items-center justify-center flex-1 bg-black bg-opacity-50">
        <View className="w-5/6 p-6 bg-white rounded-xl">
          <Text className="mb-4 text-xl font-bold">Confirm Deletion</Text>
          {deletingConstant && (
            <View className="mb-4">
              <Text className="font-semibold text-gray-700">Key: {deletingConstant.key}</Text>
              <Text className="text-gray-700">Value: {deletingConstant.value}</Text>
              <Text className="text-gray-700">Description: {deletingConstant.description}</Text>
            </View>
          )}
          <Text className="mb-6 text-gray-700">
            Are you sure you want to delete this constant? This action cannot be undone.
          </Text>
          <View className="flex-row justify-end">
            <TouchableOpacity
              className="px-4 py-2 mr-2 bg-gray-200 rounded-lg"
              onPress={handleCloseDeleteModal}
            >
              <Text className="text-gray-800">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="px-4 py-2 bg-red-500 rounded-lg"
              onPress={handleDeleteConstant}
              disabled={isDeleting}
            >
              <Text className="text-white">{isDeleting ? 'Deleting...' : 'Delete'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteConstantModal;