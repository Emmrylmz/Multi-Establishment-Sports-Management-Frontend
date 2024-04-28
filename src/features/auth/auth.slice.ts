import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../../store';
import apiService from '../query/apiService';
import type { AuthState, User } from './auth.interface';

const initialState: AuthState = {
	user: null,
	isAuthenticated: false,
	error: null,
	status: 'idle',
};

export const logout = createAsyncThunk(
	'auth/logout',
	async (_, { dispatch, rejectWithValue }) => {
		try {
			// Call the logout endpoint
			await apiService.endpoints.logout.initiate();
			// Optionally clear local storage or manage other cleanups
			// await AsyncStorage.removeItem('access_token');
			// Clear the auth state
			return true; // Return true or any relevant data upon successful logout
		} catch (error) {
			console.error('Logout failed:', error);
			return rejectWithValue(error.toString());
		}
	}
);

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
			.addCase(logout.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(logout.fulfilled, (state) => {
				// authSlice.caseReducers.clearAuthState(state); is redundant since the state is already cleared
				state.user = null;
				state.isAuthenticated = false;
				state.error = null;
				state.status = 'idle';
			})
			.addCase(logout.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload || 'Failed to logout';
			})

			.addMatcher(apiService.endpoints.login.matchPending, (state) => {
				state.status = 'loading';
			})
			.addMatcher(
				apiService.endpoints.login.matchFulfilled,
				// altta state,action olcak
				(state, action) => {
					state.status = 'succeeded';
					authSlice.caseReducers.setUser(state, {
						payload: action.payload.user,
					});
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
