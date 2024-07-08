import React from 'react';
import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useListEventsQuery } from '../../../../features/query/eventQueryService';
import { RootState } from '../../../../../store';
import { getAuthUser } from '../../../../features/auth/auth.slice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { parseISO, format } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

type Event = {
  event_id: string;
  event_type: string;
  place: string;
  start_datetime: Date;
  end_datetime: Date;
  description: string;
  team_name: string;
  team_id: string;
};

type ApiResponse = {
  team_name: string;
  events: {
    event_id: string;
    event_type: string;
    place: string;
    start_datetime: string;
    end_datetime: string;
    description: string;
    team_id: string;
  }[];
};

const transformData = (data: ApiResponse[]): Event[] => {
  const transformed = data.flatMap((team) =>
    team.events.map((event) => ({
      ...event,
      team_name: team.team_name,
      start_datetime: parseISO(event.start_datetime),
      end_datetime: parseISO(event.end_datetime),
    }))
  );

  return transformed
    .filter((event) => event.start_datetime && event.end_datetime)
    .sort((a, b) => a.start_datetime.getTime() - b.start_datetime.getTime());
};

interface EventListProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
  orientation: 'vertical' | 'horizontal';
}

const EventList: React.FC<EventListProps> = ({ navigation, orientation }) => {
  const user = useSelector((state: RootState) => getAuthUser(state));
  const { data, error, isLoading } = useListEventsQuery(user?.teams);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#4FD1C5" />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error loading events</Text>;
  }

  const events = data ? transformData(data) : [];

  const handleEventPress = (event: Event) => {
    navigation.navigate('EventDetailPage', {
      event_id: event.event_id,
      coordinates: { latitude: 0, longitude: 0 },
      place: event.place,
      team_name: event.team_name,
      event_name: event.description,
      team_id: event.team_id,
      event_type: event.event_type,
      start_datetime: event.start_datetime.toDateString(),
    });
  };

  const renderItem: ListRenderItem<Event> = ({ item }) => (
    <TouchableOpacity onPress={() => handleEventPress(item)}>
      <LinearGradient
        colors={['#3FA454', '#2D3748']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.linearGradient,
          orientation === 'horizontal' ? styles.horizontal : styles.vertical,
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.eventType}>{item.event_type}</Text>
          <Ionicons name="calendar" size={24} color="#4FD1C5" />
        </View>
        <Text style={styles.dateText}>
          {format(item.start_datetime, "MMM d, yyyy 'at' h:mm a")}
        </Text>
        <Text style={styles.placeText}>{item.place}</Text>
        <Text style={styles.teamNameText}>{item.team_name}</Text>
        <Text style={styles.descriptionText}>{item.description}</Text>
      </LinearGradient>
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
      contentContainerStyle={
        orientation === 'vertical' ? styles.verticalContentContainer : {}
      }
    />
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
  },
  linearGradient: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  horizontal: {
    width: 288,
    marginRight: 16,
  },
  vertical: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  dateText: {
    fontSize: 14,
    color: '#D1D5DB',
    marginBottom: 4,
  },
  placeText: {
    fontSize: 14,
    color: '#D1D5DB',
    marginBottom: 8,
  },
  teamNameText: {
    fontSize: 12,
    color: '#A0AEC0',
  },
  descriptionText: {
    fontSize: 12,
    color: '#A0AEC0',
    marginTop: 8,
    fontStyle: 'italic',
  },
  verticalContentContainer: {
    paddingHorizontal: 16,
  },
});

export default EventList;
