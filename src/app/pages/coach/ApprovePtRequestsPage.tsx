import { View, Text, useColorScheme, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppLayout } from '../../components'
import { Ionicons } from '@expo/vector-icons'
import { useCoach_private_lessonsQuery } from '../../../features/query/personalTrainingService'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { getAuthUser } from '../../../features/auth/auth.slice'


const ApprovePtRequestsPage = ({navigation}) => {
  const user = useSelector((state: RootState) => getAuthUser(state));
  console.log('coach_id: ',user?._id)
  const {data,isLoading,isError} = useCoach_private_lessonsQuery(user?._id);
  console.log('data: ',data)
  const isDark = useColorScheme() === 'dark'
  return (
    <AppLayout>
      <View className='flex-row items-center justify-start w-full mb-4'>
        <Ionicons name="arrow-back" size={24} color={isDark ? 'white' : 'black'} onPress={() => navigation.goBack()} />
        <Text className="ml-4 text-xl font-semibold text-black dark:text-white">Gelen talepleri onayla</Text>
      </View>
      <ScrollView className='w-full h-full'>
        <TouchableOpacity
          className="p-6 mb-4 bg-white border border-gray-200 shadow-md rounded-2xl dark:bg-gray-800 dark:border-gray-700">
          <View className="mb-4">
            <Text className="text-xs text-gray-500 uppercase dark:text-gray-400">Player</Text>
            <Text className="text-lg font-semibold text-black dark:text-white">John Doe</Text>
          </View>
          <View className="flex-row justify-between mb-4">
            <View className="flex-1">
              <Text className="text-xs text-gray-500 uppercase dark:text-gray-400">Location</Text>
              <Text className="text-base font-semibold text-black dark:text-white">Basketball Court B</Text>
            </View>
            <View className="flex items-end">
              <Text className="text-xs text-gray-500 uppercase dark:text-gray-400">Duration</Text>
              <Text className="text-base font-semibold text-black dark:text-white">1 hour</Text>
            </View>
          </View>
          <View className="flex-row justify-between mb-4">
            <View>
              <Text className="text-xs text-gray-500 uppercase dark:text-gray-400">Start Time</Text>
              <Text className="text-sm text-black dark:text-white">Jul 22, 2024 16:00</Text>
            </View>
            <View className="items-end">
              <Text className="text-xs text-gray-500 uppercase dark:text-gray-400">End Time</Text>
              <Text className="text-sm text-black dark:text-white">Jul 22, 2024 17:00</Text>
            </View>
          </View>
          <View>
            <Text className="text-xs text-gray-500 uppercase dark:text-gray-400">Description</Text>
            <Text className="text-sm text-black dark:text-white">Private lesson focusing on shooting and dribbling</Text>
          </View>
          <View className="flex-row justify-end mt-4">
            <TouchableOpacity className="px-4 py-2 mr-2 bg-gray-200 rounded-full dark:bg-gray-700">
              <Text className="text-sm font-medium text-gray-800 dark:text-gray-200">Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-4 py-2 bg-black rounded-full dark:bg-white">
              <Text className="text-sm font-medium text-white dark:text-black">Approve</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </AppLayout>
  )
}

export default ApprovePtRequestsPage