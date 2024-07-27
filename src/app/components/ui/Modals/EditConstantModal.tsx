import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useTranslation } from 'react-i18next';

type EditConstantModalProps = {
  isVisible: boolean;
  editingConstant: { value: number; description: string } | null;
  isUpdating: boolean;
  handleCloseModal: () => void;
  handleEditInputChange: (name: 'value' | 'description', value: string) => void;
  handleUpdateConstant: () => void;
}

const EditConstantModal: React.FC<EditConstantModalProps> = ({
  isVisible,
  editingConstant,
  isUpdating,
  handleCloseModal,
  handleEditInputChange,
  handleUpdateConstant,
}) => {
  const { t } = useTranslation();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleCloseModal}
    >
      <View className="items-center justify-center flex-1 bg-black bg-opacity-50">
        <View className="bg-white p-6 rounded-xl w-5/6 max-h-[80%]">
          <ScrollView>
            <Text className="mb-4 text-2xl font-bold">{t("constantModals.editConstant.title")}</Text>
            {editingConstant && (
              <>
                <View className="mb-4">
                  <Text className="mb-2 text-gray-700">{t("constantModals.editConstant.constantValue")}</Text>
                  <TextInput
                    className="p-2 border border-gray-300 rounded-lg"
                    value={editingConstant.value.toString()}
                    onChangeText={(text) => handleEditInputChange('value', text)}
                    keyboardType="numeric"
                  />
                </View>
                <View className="mb-4">
                  <Text className="mb-2 text-gray-700">{t("constantModals.editConstant.description")}</Text>
                  <TextInput
                    className="p-2 border border-gray-300 rounded-lg"
                    value={editingConstant.description}
                    onChangeText={(text) => handleEditInputChange('description', text)}
                    multiline
                  />
                </View>
              </>
            )}
          </ScrollView>
          <View className="flex-row justify-end mt-4">
            <TouchableOpacity
              className="px-4 py-2 mr-2 bg-gray-200 rounded-lg"
              onPress={handleCloseModal}
            >
              <Text className="text-gray-800">{t("constantModals.editConstant.cancel")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="px-4 py-2 bg-blue-500 rounded-lg"
              onPress={handleUpdateConstant}
              disabled={isUpdating}
            >
              <Text className="text-white">{isUpdating ? t("constantModals.editConstant.updating") : t("constantModals.editConstant.button")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditConstantModal;