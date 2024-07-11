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


const ManagerHomePage = ({navigation}) => {
    const user = useSelector((state: RootState) => getAuthUser(state));
  return (
    <ScrollView className="bg-gray-100">
      <Header user={user} navigation={navigation} />
      <View className="px-4 py-6">
        <RevenueChart />
        <View>
          <Text className='text-2xl'>Quick Actions</Text>
          <ScrollView horizontal={true} className="flex-row mt-4">
            <TouchableOpacity
            className="items-center p-4 mr-2 bg-white shadow-sm rounded-xl"
            onPress={() =>  navigation.navigate('AddTeamPage')}
          >
            <Ionicons name="add-circle" size={30} color="#0D9488" />
            <Text className="mt-2 text-sm text-gray-600">Create Team</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="items-center p-4 ml-2 bg-white shadow-sm rounded-xl"
            onPress={() => navigation.navigate('AddUserPage')}
          >
            <Ionicons name="add-circle" size={30} color="#0D9488" />
            <Text className="mt-2 text-sm text-gray-600">Add New User</Text>
          </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default ManagerHomePage;