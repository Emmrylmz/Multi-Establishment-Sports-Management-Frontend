import React from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useListEventsQuery } from '../../../features/query/eventQueryService';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../store';
import { getAuthUser } from '../../../features/auth/auth.slice';
import { Ionicons } from '@expo/vector-icons';

const EventsPage = () => {
  const user = useSelector((state: RootState) => getAuthUser(state));
  const { data, isError, isLoading } = useListEventsQuery(user?.teams);

  const renderEventItem = ({ item }) => (
    <TouchableOpacity className="p-5 mb-4 bg-white shadow-md dark:bg-gray-800 rounded-xl">
      <View className="flex-row items-center justify-between mb-3">
        <View className="px-3 py-1 bg-blue-100 rounded-full dark:bg-blue-900">
          <Text className="font-semibold text-blue-800 dark:text-blue-200">{item.event_type}</Text>
        </View>
        <Text className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(item.start_datetime).toLocaleDateString()}
        </Text>
      </View>
      <Text className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
        {item.description || 'No description'}
      </Text>
      <View className="flex-row items-center mt-2">
        <Ionicons name="location-outline" size={18} color="#6B7280" />
        <Text className="ml-2 text-sm text-gray-600 dark:text-gray-300">
          {item.place || 'No location specified'}
        </Text>
      </View>
      <View className="flex-row items-center mt-2">
        <Ionicons name="time-outline" size={18} color="#6B7280" />
        <Text className="ml-2 text-sm text-gray-600 dark:text-gray-300">
          {new Date(item.start_datetime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - 
          {new Date(item.end_datetime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <SafeAreaView className="items-center justify-center flex-1 bg-gray-100 dark:bg-gray-900">
        <Text className="text-gray-800 dark:text-gray-200">Loading events...</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView className="items-center justify-center flex-1 bg-gray-100 dark:bg-gray-900">
        <Text className="text-gray-800 dark:text-gray-200">Error loading events</Text>
      </SafeAreaView>
    );
  }

  const teamData = data && data[0];

  return (
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-gray-900">
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />
      <View className="p-5">
        <Text className="mb-2 text-3xl font-bold text-gray-800 dark:text-gray-100">Events</Text>
        <Text className="mb-4 text-xl font-semibold text-blue-600 dark:text-blue-400">{teamData?.team_name}</Text>
        <FlatList
          data={teamData?.events}
          renderItem={renderEventItem}
          keyExtractor={(item) => item.event_id}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text className="text-center text-gray-500 dark:text-gray-400">No events found</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default EventsPage;