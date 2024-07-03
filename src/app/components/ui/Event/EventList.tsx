import React from 'react';
import { View, Text, FlatList, ListRenderItem, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useListEventsQuery } from '../../../../features/query/eventQueryService';
import { RootState } from "../../../../../store";
import { getAuthUser } from '../../../../features/auth/auth.slice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { parseISO } from 'date-fns'; // Import parseISO for robust date parsing

type Event = {
  event_id: string;
  event_type: string;
  place: string;
  start_datetime: Date;
  end_datetime: Date;
  description: string;
  team_name: string;
}

type TeamEvent = {
  team_name: string;
  events: Event[];
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
  }[];
}

const transformData = (data: ApiResponse[]): Event[] => {
  const transformed: TeamEvent[] = data.map((team) => ({
    team_name: team.team_name,
    events: team.events.map((event) => {
      try {
        return {
          event_id: event.event_id,
          event_type: event.event_type,
          place: event.place,
          start_datetime: event.start_datetime ? parseISO(event.start_datetime) : new Date(),
          end_datetime: event.end_datetime ? parseISO(event.end_datetime) : new Date(),
          description: event.description,
        };
      } catch (error) {
        console.error('Error parsing date:', error, event);
        return null;
      }
    }).filter(event => event !== null), // Filter out null events
  }));

  // Flatten the events and sort by start datetime
  const flattenedEvents = transformed.flatMap((team) =>
    team.events.map((event) => ({
      ...event,
      team_name: team.team_name,
    }))
  );

  return flattenedEvents.sort(
    (a, b) => a.start_datetime.getTime() - b.start_datetime.getTime()
  );
};

interface EventListProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
  orientation: 'vertical' | 'horizontal';
  team_id: string;
}

const EventList: React.FC<EventListProps> = ({ navigation, orientation, team_id }) => {
  const user = useSelector((state: RootState) => getAuthUser(state));
  const { data, error, isLoading } = useListEventsQuery(user?.teams);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading events</Text>;
  }

  const events = data ? transformData(data) : [];

  const handleEventPress = (event_id: string, event_type?: string, place?: string, team_name?: string, description?: string) => {
    if (orientation === 'vertical') {
      navigation.navigate('CoachAttendanceFormPage', { event_id: event_id, team_id: team_id, event_type: event_type, description: description });
    } else {
      navigation.navigate('EventDetailPage', { event_id: event_id, coordinates: { latitude: 0, longitude: 0 }, location: place, team_name: team_name, event_name: description });
    }
  };

  const renderItem: ListRenderItem<Event> = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleEventPress(item.event_id, item.event_type, item.place, item.team_name, item.description)}
    >
      <View className='p-3 m-1 bg-white rounded-lg'
        style={{ width: orientation === 'horizontal' ? 300 : 'auto' }}>
        <Text style={{ fontWeight: 'bold' }}>{item.start_datetime.toDateString()}</Text>
        <Text>{item.team_name}</Text>
        <Text>{item.event_type} at {item.place}</Text>
        <Text>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={events}
      showsHorizontalScrollIndicator={orientation === 'horizontal'}
      showsVerticalScrollIndicator={orientation === 'vertical'}
      keyExtractor={(item) => item.event_id}
      renderItem={renderItem}
      horizontal={orientation === 'horizontal'}
    />
  );
};

export default EventList;
