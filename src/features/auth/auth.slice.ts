import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../../../store';
import apiService from '../query/apiService';
import type { AuthState, User } from './auth.interface';

const nuser = {
    _id: "string",
    name: "string",
    role: "string",
    photo: "string",
    email: "string"
}

const initialState: AuthState = {
  user: nuser,
  isAuthenticated: false,
  error: null,
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.status = 'idle';
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true; // Assuming presence of user data means authenticated
      state.error = null;
      state.status = 'succeeded';
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(apiService.endpoints.login.matchPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(
        apiService.endpoints.login.matchFulfilled,
        // altta state,action olcak
        (state) => {
          state.status = 'succeeded';
          authSlice.caseReducers.setUser(state, { payload: action.payload.user });
        },
      )
      .addMatcher(apiService.endpoints.login.matchRejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Define the logout thunk after the slice
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    await AsyncStorage.removeItem('userData');
    dispatch(authSlice.actions.clearAuthState());
  },
);

export const getAuthUser = (state: RootState) => state.auth.user;
export const getAuthStatus = (state: RootState) => state.auth.status;
export const getAuthError = (state: RootState) => state.auth.error;
export const { clearAuthState, setUser } = authSlice.actions;

export default authSlice.reducer;
