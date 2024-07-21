// hooks/useLogin.ts
import { useLoginMutation } from '../features/query/authQueryService';
import type { AuthPayload } from '../features/auth/auth.interface';

const useLogin = () => {
  const [loginMutation, { isLoading, isError, isSuccess, data }] = useLoginMutation();

  const handleSubmit = async (payload: AuthPayload) => {
    try {
      // AsyncStorage.clear()
      const response = await loginMutation(payload).unwrap();
      return { success: true, data: response };
    } catch (error) {
      console.error("Login failed:", error);
      
      // Determine the error type and return a structured error object
      if ('status' in error) {
        return {
          success: false,
          error: {
            type: error.data?.type || 'UNKNOWN_ERROR',
            message: error.data?.message || 'An unknown error occurred',
            status: error.status
          }
        };
      } else {
        return {
          success: false,
          error: {
            type: 'NETWORK_ERROR',
            message: 'Unable to connect to the server',
          }
        };
      }
    }
  };

  return { handleSubmit, isLoading, isError, isSuccess, data };
};

export default useLogin;