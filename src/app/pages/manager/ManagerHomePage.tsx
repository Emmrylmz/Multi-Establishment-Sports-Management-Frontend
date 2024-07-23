import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/ui/Home/Header';
import RevenueChart from '../../components/ui/Charts/RevenueCharts';
import QuickActions from '../../components/ui/Home/QuickActions';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { getAuthUser } from '../../../features/auth/auth.slice';
import RevenueCard from '../../components/ui/payments/RevenueCard';


const ManagerHomePage = ({navigation}) => {
    const user = useSelector((state: RootState) => getAuthUser(state));
    console.log(user?.role)
  return (
    <ScrollView className="w-full h-full bg-gray-100 dark:bg-dacka-black gap-y-2">
      <Header user={user} navigation={navigation} />
      <View className="px-4 py-6">
        <RevenueCard />
        <View className='bg-gray-100 dark:bg-black'>
          <Text className='text-2xl text-dacka-black dark:text-gray-100'>Quick Actions</Text>
          <ScrollView horizontal={true} className="flex-row mt-4">
            <TouchableOpacity
            className="items-center p-4 mr-2 bg-white shadow-sm dark:bg-dacka-dark-gray rounded-xl"
            onPress={() =>  navigation.navigate('AddTeamPage')}
          >
            <Ionicons name="add-circle" size={30} color="#0D9488" />
            <Text className="mt-2 text-sm text-gray-600 dark:text-gray-100">Create Team</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="items-center p-4 ml-2 bg-white shadow-sm dark:bg-dacka-dark-gray rounded-xl"
            onPress={() => navigation.navigate('AddUserPage')}
          >
            <Ionicons name="add-circle" size={30} color="#0D9488" />
            <Text className="mt-2 text-sm text-gray-600 dark:text-gray-100">Add New User</Text>
          </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default ManagerHomePage;