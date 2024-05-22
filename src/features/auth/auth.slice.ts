import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../../store';
import apiService from '../query/authQueryService';
import type { AuthState, User } from './auth.interface';

const initialState: AuthState = {
	user: null,
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
		setUser: (state, action: PayloadAction<{ user: User }>) => {
			state.user = action.payload.user;
			state.isAuthenticated = true; // Assuming presence of user data means authenticated
			state.error = null;
			state.status = 'succeeded';
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(apiService.endpoints.logout.matchPending, (state) => {
				state.user = null;
				state.isAuthenticated = false;
				state.status = 'idle';
			})
			.addMatcher(apiService.endpoints.login.matchPending, (state) => {
				state.status = 'loading';
			})
			.addMatcher(
				apiService.endpoints.login.matchFulfilled,
				// altta state,action olcak
				(state, action: PayloadAction<{ user: User }>) => {
					authSlice.caseReducers.setUser(state, action); // Pass the entire action
				}
			)
			.addMatcher(apiService.endpoints.login.matchRejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const getAuthUser = (state: RootState) => state.auth.user;
export const getAuthStatus = (state: RootState) => state.auth.status;
export const getAuthError = (state: RootState) => state.auth.error;
export const { clearAuthState, setUser } = authSlice.actions;

export default authSlice.reducer;
