// EventDetailsSection.tsx
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface EventDetailsSectionProps {
  team_name: string;
  event_type: string;
  place: string;
  eventDate: Date;
}

const EventDetailsSection: React.FC<EventDetailsSectionProps> = React.memo(({ team_name, event_type, place, eventDate }) => (
  <View style={{ marginBottom: 20 }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#4a90e2' }}>Event Details</Text>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
      <Icon name="account-group" size={24} color="#4a90e2" style={{ marginRight: 10 }} />
      <Text style={{ fontWeight: 'bold', marginRight: 5 }}>Team:</Text>
      <Text>{team_name}</Text>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
      <Icon name="tag" size={24} color="#4a90e2" style={{ marginRight: 10 }} />
      <Text style={{ fontWeight: 'bold', marginRight: 5 }}>Event Type:</Text>
      <Text>{event_type}</Text>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
      <Icon name="map-marker" size={24} color="#4a90e2" style={{ marginRight: 10 }} />
      <Text style={{ fontWeight: 'bold', marginRight: 5 }}>Place:</Text>
      <Text>{place}</Text>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
      <Icon name="calendar" size={24} color="#4a90e2" style={{ marginRight: 10 }} />
      <Text style={{ fontWeight: 'bold', marginRight: 5 }}>Date:</Text>
      <Text>{eventDate.toDateString()}</Text>
    </View>
  </View>
));

export default EventDetailsSection;