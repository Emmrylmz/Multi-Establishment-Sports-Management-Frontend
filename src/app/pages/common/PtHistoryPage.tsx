import React from 'react'
import { View, Text, useColorScheme, TouchableOpacity, FlatList } from 'react-native'
import { useTranslation } from 'react-i18next'
import { AppLayout } from '../../components'
import { Ionicons } from '@expo/vector-icons'

const PtHistoryPage = ({navigation}) => {
  const isDark = useColorScheme() === 'dark'
  const { t } = useTranslation()

  const ptSessions = [
    { id: '1', date: '2024-07-15', time: '14:00-15:00', coach: 'John Doe', player: 'Alice Smith', location: 'Court A' },
    { id: '2', date: '2024-07-14', time: '10:00-11:00', coach: 'Jane Doe', player: 'Bob Johnson', location: 'Court B' },
    { id: '3', date: '2024-07-13', time: '16:00-17:00', coach: 'John Doe', player: 'Charlie Brown', location: 'Court C' },
    // Add more sessions as needed
  ]

  const renderPtSession = ({ item }) => (
    <TouchableOpacity 
      className="p-4 mb-4 bg-white shadow-md dark:bg-gray-800 rounded-xl"
      onPress={() => {/* Navigate to session details */}}
    >
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-lg font-semibold text-black dark:text-white">{item.date}</Text>
        <Text className="text-sm text-gray-600 dark:text-gray-300">{item.time}</Text>
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-base text-gray-800 dark:text-gray-200">{t("ptHistoryPage.coach")}: {item.coach}</Text>
        <Text className="text-base text-gray-800 dark:text-gray-200">{t("ptHistoryPage.player")}: {item.player}</Text>
      </View>
      <Text className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t("ptHistoryPage.location")}: {item.location}</Text>
    </TouchableOpacity>
  )

  return (
    <AppLayout>
      <View className='flex-row items-center justify-between w-full mb-6'>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={isDark ? 'white' : 'black'} />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-black dark:text-white">{t("ptHistoryPage.title")}</Text>
        <TouchableOpacity>
          <Ionicons name="filter" size={24} color={isDark ? 'white' : 'black'} />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={ptSessions}
        renderItem={renderPtSession}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </AppLayout>
  )
}

export default PtHistoryPage