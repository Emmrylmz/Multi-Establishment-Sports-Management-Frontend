import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAuthUser } from '../features/auth/auth.slice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStatus = () => {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector(getAuthUser);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem('access_token');
      setIsLoading(false); // We finish checking after retrieving the token
    };

    checkAuthStatus();
  }, [user]); // Re-run when the user state changes

  return { isLoading, user };
};
