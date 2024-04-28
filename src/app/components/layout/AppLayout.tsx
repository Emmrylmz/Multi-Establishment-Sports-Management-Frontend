import React from 'react'
import { RootState } from '../../../../store';
import { getAuthUser } from '../../../features/auth/auth.slice';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AuthLayoutProps {
    children: any;
  }

const AppLayout = ({ children }: AuthLayoutProps) => {
    const user = useSelector((state: RootState) => getAuthUser(state));

  return (
    <SafeAreaView className="h-full w-full p-5">
    {children}
  </SafeAreaView>
  )
}

export default AppLayout
