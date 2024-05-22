import React from 'react';
import { View, Text, FlatList, ListRenderItem, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useListEventsQuery } from '../../../features/query/eventQueryService';
import { RootState } from "../../../../store";
import { getAuthUser } from '../../../features/auth/auth.slice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';

interface Event {
  event_id:string
  event_type: string;
  place: string;
  event_date: Date;
  description: string;
  team_name: string;
}

interface TeamEvent {
  team_name: string;
  events: Event[];
}

interface ApiResponse {
  team_name: string;
  events: {
    event_id:string
    event_type: string;
    place: string;
    event_date: string;
    description: string;
  }[];
}

const transformData = (data: ApiResponse[]): Event[] => {
  const transformed: TeamEvent[] = data.map((team) => ({
    team_name: team.team_name,
    events: team.events.map((event) => ({
      event_id:event.event_id,
      event_type: event.event_type,
      place: event.place,
      event_date: new Date(event.event_date),
      description: event.description,
    })),
  }));

  // Flatten the events and sort by date
  const flattenedEvents = transformed.flatMap((team) =>
    team.events.map((event) => ({
      ...event,
      team_name: team.team_name,
    }))
  );

  return flattenedEvents.sort(
    (a, b) => a.event_date.getTime() - b.event_date.getTime()
  );
};

interface EventListProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

const EventList: React.FC<EventListProps> = ({ navigation }) => {
  const user = useSelector((state: RootState) => getAuthUser(state));
  const { data, error, isLoading } = useListEventsQuery(user?.teams);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading events</Text>;
  }

  const events = data ? transformData(data) : [];


  const renderItem: ListRenderItem<Event> = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('EventDetailPage', {
          event_id: item.event_id,  // Assuming item.id exists
          team_name: item.team_name,
          event_type: item.event_type,
          // coordinates: item.coordinates, // Assuming item.coordinates exists
          locationName: item.place,
        })
      }
    >
      <View style={{ borderBottomWidth: 1, backgroundColor: 'white', borderRadius: 10, padding: 10, margin: 5 }}>
        <Text style={{ fontWeight: 'bold' }}>{item.event_date.toDateString()}</Text>
        <Text>{item.team_name}</Text>
        <Text>{item.event_type} at {item.place}</Text>
        <Text>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.event_id}
      renderItem={renderItem}
      horizontal={true}
    />
  );
};

export default EventList;
