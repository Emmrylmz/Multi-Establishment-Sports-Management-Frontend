import { useState, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { 
  useGetConstantsQuery, 
  useCreateConstantMutation, 
  useUpdateConstantMutation, 
  useDeleteConstantMutation 
} from '../features/query/constantsQueryService';

// ... (type definitions remain the same)

export const useConstantsLogic = () => {
  const { data: constants, error, isLoading, refetch } = useGetConstantsQuery();
  const [createConstant, { isLoading: isCreating }] = useCreateConstantMutation();
  const [updateConstant, { isLoading: isUpdating }] = useUpdateConstantMutation();
  const [deleteConstant, { isLoading: isDeleting }] = useDeleteConstantMutation();

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingConstant, setEditingConstant] = useState<{ id: string; value: number; description: string } | null>(null);
  const [deletingConstant, setDeletingConstant] = useState<Constant | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [newConstant, setNewConstant] = useState<NewConstant>({
    key: '',
    value: 0,
    description: ''
  });

  const handleInputChange = useCallback((name: keyof NewConstant, value: string) => {
    setNewConstant(prevState => ({
      ...prevState,
      [name]: name === 'value' ? parseFloat(value) || 0 : value
    }));
  }, []);

  const handleEditConstant = useCallback((constant: Constant) => {
    setEditingConstant({
      id: constant.id,
      value: constant.value,
      description: constant.description
    });
    setIsEditModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsEditModalVisible(false);
    setEditingConstant(null);
  }, []);

  const handleOpenDeleteModal = useCallback((constant: Constant) => {
    setDeletingConstant(constant);
    setIsDeleteModalVisible(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setIsDeleteModalVisible(false);
    setDeletingConstant(null);
  }, []);

  const handleUpdateConstant = useCallback(async () => {
    if (!editingConstant) return;
    try {
      const { id, ...updateData } = editingConstant;
      const success = await updateConstant({ id, ...updateData }).unwrap();
      if (success) {
        handleCloseModal();
        Alert.alert('Success', 'Constant updated successfully');
        return await refetch();
      }
    } catch (error) {
      console.error('Error updating constant:', error);
      Alert.alert('Error', 'Failed to update constant');
    }
  }, [editingConstant, updateConstant, handleCloseModal, refetch]);

  const handleDeleteConstant = useCallback(async () => {
    if (!deletingConstant) return;
    try {
      const result = await deleteConstant(deletingConstant).unwrap();
      if (result === null || result) {
        handleCloseDeleteModal();
        await refetch();
        Alert.alert('Success', 'Constant deleted successfully');
      } else {
        Alert.alert('Error', 'Failed to delete constant');
      }
    } catch (error) {
      console.error('Error deleting constant:', error);
      Alert.alert('Error', 'Failed to delete constant');
    } finally {
      handleCloseDeleteModal();
    }
  }, [deletingConstant, deleteConstant, handleCloseDeleteModal, refetch]);

  const handleEditInputChange = useCallback((name: 'value' | 'description', value: string) => {
    setEditingConstant(prevState => {
      if (!prevState) return null;
      return {
        ...prevState,
        [name]: name === 'value' ? parseFloat(value) || 0 : value
      };
    });
  }, []);

  const handleAddConstant = useCallback(async () => {
    if (!newConstant.key || newConstant.value === 0 || !newConstant.description) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    try {
      const success = await createConstant(newConstant).unwrap();
      if (success) {
        setNewConstant({ key: '', value: 0, description: '' });
        Alert.alert('Success', 'New constant added successfully');
        return await refetch();
      }
    } catch (error) {
      console.error('Error adding constant:', error);
      Alert.alert('Error', 'Failed to add new constant');
    }
  }, [newConstant, createConstant, refetch]);

  const memoizedReturnValues = useMemo(() => ({
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
  }), [
    constants, error, isLoading, isCreating, isUpdating, isDeleting,
    isEditModalVisible, editingConstant, deletingConstant, isDeleteModalVisible,
    newConstant, handleInputChange, handleEditConstant, handleCloseModal,
    handleOpenDeleteModal, handleCloseDeleteModal, handleUpdateConstant,
    handleDeleteConstant, handleEditInputChange, handleAddConstant
  ]);

  return memoizedReturnValues;
};