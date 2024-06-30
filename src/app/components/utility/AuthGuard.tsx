import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { RootState } from '../../../../store';
import { getAuthUser } from '../../../features/auth/auth.slice';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthGuardProps {
  children: React.ReactNode;
}
const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const user = useSelector((state: RootState) => getAuthUser(state));
    const navigation = useNavigation();
  
    useFocusEffect(
      React.useCallback(() => {
        const checkAuth = async () => {
          try {
            const storedUser = await AsyncStorage.getItem('user');
            if (user || storedUser) {
              setAuthenticated(true);
            } else {
              setAuthenticated(false);
              navigation.navigate('Login');
            }
          } catch (error) {
            console.error('Error checking auth status', error);
            setAuthenticated(false);
            navigation.navigate('Login');
          } finally {
            setLoading(false);
          }
        };
  
        checkAuth();
      }, [user, navigation])
    );
  
    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  
    return <>{children}</>;
  };