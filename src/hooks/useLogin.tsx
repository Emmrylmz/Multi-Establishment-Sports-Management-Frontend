// hooks/useLogin.ts
import { useLoginMutation } from '../features/query/authQueryService';
import type { AuthPayload } from '../features/auth/auth.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useLogin = () => {
	// Destructure properties from the useLoginMutation hook
	const [loginMutation, { isLoading, isError, isSuccess, data }] =
		useLoginMutation();

	// Function to handle submission of login data
	const handleSubmit = async (payload: AuthPayload) => {
		try {
			// AsyncStorage.clear()
			const response = await loginMutation(payload).unwrap();
			return response;
		} catch (error) {
			// Log the error; in a real app, consider handling this more robustly
			// console.error("Login failed:", error);
			// Return null or error as needed for UI feedback
			return null;
		}
	};

	// Return the mutation's properties and the handleSubmit function
	return { handleSubmit, isLoading, isError, isSuccess, data };
};

export default useLogin;
