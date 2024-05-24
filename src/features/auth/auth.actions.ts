import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authQueryService from '../query/authQueryService';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await authQueryService.endpoints.login.initiate(credentials).unwrap();
      await AsyncStorage.setItem('access_token', data.access_token);
      return data.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  await authQueryService.endpoints.logout.initiate();
  await AsyncStorage.removeItem('access_token');
});
