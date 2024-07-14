import { View, Text, useColorScheme, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { AppLayout } from '../../components';
import { Ionicons } from '@expo/vector-icons';
import MenuItems from '../../components/ui/personalTraining/MenuItems';

const CoachPtPage = ({ navigation }) => {
  const isDark = useColorScheme() === 'dark';

  const menuItems = [
    { title: "See PT History", icon: "time-outline", navigation: 'CoachPtHistoryPage' },
    { title: "See All Requests", icon: "list-outline", navigation: 'ApprovePtRequestsPage' },
    { title: "See Today's PT", icon: "today-outline", navigation: 'CoachTodaysPtPage' },
    { title: "Approved Requests", icon: "today-outline", navigation: 'ApprovedPtRequestsPage' },
    { title: "Declined Requests", icon: "close-circle-outline", navigation: 'DeclinedPtRequestsPage' },
  ];

  return (
    <AppLayout>
      <View className='flex-row items-center justify-start w-full mb-6'>
        <Ionicons name="arrow-back" size={24} color={isDark ? 'white' : 'black'} onPress={() => navigation.goBack()} />
        <Text className="ml-4 text-2xl font-bold text-black dark:text-white">Personal Training</Text>
      </View>
      
      <ScrollView className='w-full'>
        <View className="flex-row flex-wrap justify-between">
          {menuItems.map((item, index) => (
            <MenuItems key={index} title={item.title} icon={item.icon} navigation={() => navigation.navigate(item.navigation)} />
          ))}
        </View>
      </ScrollView>
    </AppLayout>
  );
}

export default CoachPtPage;