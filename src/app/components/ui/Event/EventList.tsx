import React from 'react';
import { View, Text, FlatList, ListRenderItem, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useListEventsQuery } from '../../../../features/query/eventQueryService';
import { RootState } from "../../../../../store";
import { getAuthUser } from '../../../../features/auth/auth.slice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { parseISO } from 'date-fns';

type Event = {
  event_id: string;
  event_type: string;
  place: string;
  start_datetime: Date;
  end_datetime: Date;
  description: string;
  team_name: string;
  team_id:string
}

type ApiResponse = {
  team_name: string;
  events: {
    event_id: string;
    event_type: string;
    place: string;
    start_datetime: string;
    end_datetime: string;
    description: string;
    team_id:string
  }[];
}

const transformData = (data: ApiResponse[]): Event[] => {
  const transformed = data.map((team) => ({
    team_name: team.team_name,
    events: team.events.map((event) => ({
      event_id: event.event_id,
      event_type: event.event_type,
      place: event.place,
      start_datetime: event.start_datetime ? parseISO(event.start_datetime) : new Date(),
      end_datetime: event.end_datetime ? parseISO(event.end_datetime) : new Date(),
      description: event.description,
      team_name: team.team_name,
      team_id:team.team_id
    })).filter(event => event.start_datetime && event.end_datetime), // Filter out events with invalid dates
  }));

  return transformed.flatMap((team) => team.events).sort(
    (a, b) => a.start_datetime.getTime() - b.start_datetime.getTime()
  );
};

interface EventListProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
  orientation: 'vertical' | 'horizontal';
}

const EventList: React.FC<EventListProps> = ({ navigation, orientation }) => {
  const user = useSelector((state: RootState) => getAuthUser(state));
  const { data, error, isLoading } = useListEventsQuery(user?.teams);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading events</Text>;
  }

  const events = data ? transformData(data) : [];

  const handleEventPress = (event: Event) => {
    navigation.navigate('EventDetailPage', {
      event_id: event.event_id,
      coordinates: { latitude: 0, longitude: 0 }, // Pass actual coordinates if available
      place: event.place,
      team_name: event.team_name,
      event_name: event.description,
      team_id:event.team_id,
      event_type: event.event_type,
      start_datetime: event.start_datetime.toDateString(),
    });
  };

  const renderItem: ListRenderItem<Event> = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleEventPress(item)}
      className="bg-white p-4 m-2 rounded-lg shadow-md"
      style={{ width: orientation === 'horizontal' ? 300 : 'auto' }}
    >
      <Text className="font-bold">{item.start_datetime.toDateString()}</Text>
      <Text>{item.team_name}</Text>
      <Text>{item.event_type} at {item.place}</Text>
      <Text className="text-gray-500">{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.event_id}
      renderItem={renderItem}
      horizontal={orientation === 'horizontal'}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={orientation === 'vertical'}
    />
  );
};

export default EventList;
