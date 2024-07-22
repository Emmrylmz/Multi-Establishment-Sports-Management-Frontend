import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert, ActivityIndicator, Modal, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import InputField from '../../components/ui/Form/InputField';
import { useConstantsLogic } from '../../../hooks/useConstantsLogic';
import EditConstantModal from '../../components/ui/Modals/EditConstantModal';
import DeleteConstantModal from '../../components/ui/Modals/DeleteConstantModal';

type Constant = {
  id: string;
  key: string;
  value: number;
  description: string;
  created_at: string;
  updated_at: string;
}

const AdminPanelPage: React.FC = () => {
  const {
    constants,
    error,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    isEditModalVisible,
    editingConstant,
    deletingConstant,
    isDeleteModalVisible,
    newConstant,
    handleInputChange,
    handleEditConstant,
    handleCloseModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleUpdateConstant,
    handleDeleteConstant,
    handleEditInputChange,
    handleAddConstant,
  } = useConstantsLogic();

  if (error) {
    Alert.alert('Error', 'Failed to fetch constants');
    
  }
  const inputFields = [
    {
      placeholder: "Constant Key",
      name: "key",
      icon: <Feather name="key" size={24} color="#4B5563" />,
      keyboardType: "default",
    },
    {
      placeholder: "Constant Value",
      name: "value",
      icon: <Feather name="hash" size={24} color="#4B5563" />,
      keyboardType: "numeric",
    },
    {
      placeholder: "Description",
      name: "description",
      icon: <Feather name="info" size={24} color="#4B5563" />,
      keyboardType: "default",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="px-6 py-10">
        <Text className="mb-8 text-3xl font-bold text-gray-800">
          Constant Management
        </Text>
        
        <View className="p-6 mb-8 bg-white shadow-md rounded-xl">
          <Text className="mb-4 text-xl font-semibold text-gray-700">
            Add New Constant
          </Text>
          
          {inputFields.map((field, index) => (
            <InputField
              key={field.name}
              placeholder={field.placeholder}
              name={field.name}
              placeholderTextColor="dark"
              handleInputChange={handleInputChange}
              value={newConstant[field.name].toString()}
              keyboardType={field.keyboardType}
              additionalStyles={index < inputFields.length - 1 ? "mb-4" : "mb-6"}
              icon={field.icon}
            />
          ))}

          <TouchableOpacity
            className="py-3 bg-blue-500 rounded-lg"
            onPress={handleAddConstant}
            disabled={isCreating}
          >
            <Text className="text-lg font-semibold text-center text-white">
              {isCreating ? 'Adding...' : 'Add Constant'}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="p-6 bg-white shadow-md rounded-xl">
          <Text className="mb-6 text-2xl font-semibold text-gray-800">
            Existing Constants
          </Text>
          
          {isLoading ? (
            <ActivityIndicator size="large" color="#4B5563" />
          ) : constants && constants.length > 0 ? (
            <View>
              {constants.map((constant: Constant) => (
                <View key={constant.id} className="p-4 mb-4 border border-gray-200 rounded-lg bg-gray-50">
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-lg font-semibold text-gray-800">{constant.key}</Text>
                    <View className="px-3 py-1 bg-blue-100 rounded-full">
                      <Text className="font-medium text-blue-800">{constant.value}₺</Text>
                    </View>
                  </View>
                  <Text className="mb-2 text-gray-600">{constant.description}</Text>
                  <View className="flex-row items-center justify-between mt-2">
                    <Text className="text-xs text-gray-400">
                      Created: {new Date(constant.created_at).toLocaleDateString()}
                    </Text>
                    <Text className="text-xs text-gray-400">
                      Updated: {new Date(constant.updated_at).toLocaleDateString()}
                    </Text>
                  </View>
                  <View className="flex-row justify-end mt-3">
                    <TouchableOpacity className="mr-2" onPress={() => handleEditConstant(constant)}>
                      <Feather name="edit" size={20} color="#4B5563" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleOpenDeleteModal(constant)}>
                      <Feather name="trash-2" size={20} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
              <Text className="text-center text-yellow-800">No constants found. Add your first constant above!</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <EditConstantModal
        isVisible={isEditModalVisible}
        editingConstant={editingConstant}
        isUpdating={isUpdating}
        handleCloseModal={handleCloseModal}
        handleEditInputChange={handleEditInputChange}
        handleUpdateConstant={handleUpdateConstant}
      />

      <DeleteConstantModal
        isVisible={isDeleteModalVisible}
        deletingConstant={deletingConstant}
        isDeleting={isDeleting}
        handleCloseDeleteModal={handleCloseDeleteModal}
        handleDeleteConstant={handleDeleteConstant}
      />
    </SafeAreaView>
  );
};

export default AdminPanelPage;