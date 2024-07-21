import { View, Text, useColorScheme,ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import MenuItems from '../../components/ui/personalTraining/MenuItems'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { getAuthUser } from '../../../features/auth/auth.slice'
import PersonalTrainingLayout from '../../components/layout/PersonalTrainingLayout'

const PersonalTrainingPage = ({navigation}) => {
  const user = useSelector((state: RootState) => getAuthUser(state));
  const isDark = useColorScheme() === 'dark';
  const { t } = useTranslation();

  const coachMenuItems = [
    { title: t("ptPage.ptHistory"), icon: "time-outline", navigation: 'CoachPtHistoryPage' },
    { title: t("ptPage.ptRequests"), icon: "list-outline", navigation: 'ApprovePtRequestsPage' },
    { title: t("ptPage.todayPt"), icon: "today-outline", navigation: 'CoachTodaysPtPage' },
    { title: t("ptPage.approvedPt"), icon: "today-outline", navigation: 'ApprovedPtRequestsPage' },
    { title: t("ptPage.declinedPt"), icon: "close-circle-outline", navigation: 'DeclinedPtRequestsPage' },
  ];
  const playerMenuItems = [
    { title: t("ptPage.ptHistory"), icon: "time-outline", navigation: 'CoachPtHistoryPage' },
    { title: t("ptPage.requestPt"), icon: "add-circle-outline", navigation: 'RequestPtPage'},
    { title: t("ptPage.todayPt"), icon: "today-outline", navigation: 'CoachTodaysPtPage' },
    { title: t("ptPage.approvedPt"), icon: "today-outline", navigation: 'ApprovedPtRequestsPage' },
    { title: t("ptPage.declinedPt"), icon: "close-circle-outline", navigation: 'DeclinedPtRequestsPage' },
  ];
  const menuItems = user?.role === 'Coach' ? coachMenuItems : playerMenuItems;
  return (
    <PersonalTrainingLayout>
      <View className='flex-row items-center justify-start w-full mb-6'>
        <Ionicons name="arrow-back" size={24} color={isDark ? 'white' : 'black'} onPress={() => navigation.goBack()} />
        <Text className="ml-4 text-2xl font-bold text-black dark:text-white">{t("ptPage.title")}</Text>
      </View>
      
      <ScrollView className='w-full'>
        <View className="flex-row flex-wrap justify-between">
          {menuItems.map((item, index) => (
            <MenuItems key={index} title={item.title} icon={item.icon} navigation={() => navigation.navigate(item.navigation)} />
          ))}
        </View>
      </ScrollView>
    </PersonalTrainingLayout>
  );
}

export default PersonalTrainingPage