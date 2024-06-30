import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { clearAuthState } from '../../../features/auth/auth.slice';

const JWTChecker = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          // Token is expired
          await AsyncStorage.removeItem('access_token');
          await AsyncStorage.removeItem('refresh_token');
          dispatch(clearAuthState());
        }
      }
    };

    checkToken();
  }, [dispatch]);

  return <>{children}</>;
};

export default JWTChecker;
