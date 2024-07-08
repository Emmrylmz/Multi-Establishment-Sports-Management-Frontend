import React from 'react';
import { View, Text } from 'react-native';
import EventList from '../../../components/ui/Event/EventList';

const UpcomingEvents = ({ navigation }) => (
  <View className="mb-6">
    <Text className="text-xl font-bold text-gray-800 mb-4">Upcoming Events</Text>
    <EventList navigation={navigation} orientation="horizontal" />
  </View>
);

export default UpcomingEvents;