import React from 'react'
import { View, Text, useColorScheme, FlatList, TouchableOpacity } from 'react-native'
import { AppLayout } from '../../components'
import { useTranslation } from 'react-i18next'
import { Ionicons } from '@expo/vector-icons'

const TodaysPtPage = ({navigation}) => {
  const isDark = useColorScheme() === 'dark'
  const { t } = useTranslation()

  const todaysSessions = [
    { id: '1', time: '09:00-10:00', player: 'Alice Smith', location: 'Court A', status: 'Upcoming' },
    { id: '2', time: '11:00-12:00', player: 'Bob Johnson', location: 'Court B', status: 'In Progress' },
    { id: '3', time: '14:00-15:00', player: 'Charlie Brown', location: 'Court C', status: 'Completed' },
    { id: '4', time: '16:00-17:00', player: 'David Wilson', location: 'Court A', status: 'Upcoming' },
    // Add more sessions as needed
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'Upcoming': return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100';
      case 'In Progress': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100';
      case 'Completed': return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100';
    }
  }

  const renderPtSession = ({ item }) => (
    <TouchableOpacity 
      className="p-4 mb-4 bg-white shadow-md dark:bg-gray-800 rounded-xl"
      onPress={() => {/* Navigate to session details */}}
    >
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-lg font-semibold text-black dark:text-white">{item.time}</Text>
        <View className={`px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
          <Text className="text-xs font-medium">{item.status}</Text>
        </View>
      </View>
      <Text className="text-base text-gray-700 dark:text-gray-300">{item.player}</Text>
      <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t("todaysPtPage.cardComponent.location")}: {item.location}</Text>
      <View className="flex-row justify-end mt-3">
        <TouchableOpacity className="px-4 py-2 bg-black rounded-full dark:bg-white">
          <Text className="font-semibold text-white dark:text-black">{t("todaysPtPage.cardComponent.details")}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )

  return (
    <AppLayout>
      <View className='flex-row items-center justify-between w-full mb-6'>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={isDark ? 'white' : 'black'} />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-black dark:text-white">{t("todaysPtPage.title")}</Text>
        <TouchableOpacity>
          <Ionicons name="calendar-outline" size={24} color={isDark ? 'white' : 'black'} />
        </TouchableOpacity>
      </View>
      
      <View className="px-4 mb-4">
        <Text className="text-lg font-semibold text-gray-600 dark:text-gray-300">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </Text>
      </View>
      
      <FlatList
        data={todaysSessions}
        renderItem={renderPtSession}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </AppLayout>
  )
}

export default TodaysPtPage