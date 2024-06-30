import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearAuthState } from './auth.slice';
import axios from 'axios';

export const handleLogout = async (api) => {
  try {
    await axios.get('http://48.216.140.36/api/auth/logout'); // Call the logout endpoint
  } catch (error) {
    console.error('Error during logout:', error);
  }
  await AsyncStorage.removeItem('access_token');
  await AsyncStorage.removeItem('refresh_token');
  api.dispatch(clearAuthState());
};
