import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error('Error getting token:', error);
  }
};

export const setToken = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Error setting token:', error);
  }
};

export const removeToken = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing token:', error);
  }
};
