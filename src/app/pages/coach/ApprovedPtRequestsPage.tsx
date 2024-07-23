import React from 'react'
import { View, Text, useColorScheme, FlatList, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import { AppLayout } from '../../components'
import { Ionicons } from '@expo/vector-icons'

const ApprovedPtRequestsPage = ({navigation}) => {
  const isDark = useColorScheme() === 'dark'
  const { t } = useTranslation()

  const approvedRequests = [
    { id: '1', player: 'Alice Smith', date: '2024-07-22', time: '14:00-15:00', location: 'Court A', focus: 'Shooting drills' },
    { id: '2', player: 'Bob Johnson', date: '2024-07-23', time: '10:00-11:00', location: 'Court B', focus: 'Dribbling techniques' },
    { id: '3', player: 'Charlie Brown', date: '2024-07-24', time: '16:00-17:00', location: 'Court C', focus: 'Defensive strategies' },
    // Add more approved requests as needed
  ]

  const renderApprovedRequest = ({ item }) => (
    <View className="p-4 mb-4 bg-white border-l-4 border-green-500 shadow-md dark:bg-gray-800 rounded-xl">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-lg font-semibold text-black dark:text-white">{item.player}</Text>
        <View className="px-2 py-1 bg-green-100 rounded-full dark:bg-green-800">
          <Text className="text-xs font-medium text-green-800 dark:text-green-100">{t("approvedPtPage.cardComponent.status")}</Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-base text-gray-600 dark:text-gray-300">{item.date}</Text>
        <Text className="text-base text-gray-600 dark:text-gray-300">{item.time}</Text>
      </View>
      <Text className="text-sm text-gray-500 dark:text-gray-400">{t("approvedPtPage.cardComponent.location")}: {item.location}</Text>
      <Text className="mt-2 text-sm text-gray-500 dark:text-gray-400">{t("approvedPtPage.cardComponent.focus")}: {item.focus}</Text>
      <View className="flex-row justify-end mt-3">
        <TouchableOpacity className="px-4 py-2 bg-black rounded-full dark:bg-white">
          <Text className="font-semibold text-white dark:text-black">{t("approvedPtPage.cardComponent.details")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <AppLayout>
      <View className='flex-row items-center justify-between w-full mb-6'>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={isDark ? 'white' : 'black'} />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-black dark:text-white">{t("approvedPtPage.title")}</Text>
        <TouchableOpacity>
          <Ionicons name="options-outline" size={24} color={isDark ? 'white' : 'black'} />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={approvedRequests}
        renderItem={renderApprovedRequest}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </AppLayout>
  )
}

export default ApprovedPtRequestsPage