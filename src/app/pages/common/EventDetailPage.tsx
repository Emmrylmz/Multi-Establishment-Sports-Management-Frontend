import React, { useMemo, useCallback } from 'react';
import { View, Text, Alert, Platform, Linking, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import AppLayout from '../../components/layout/AppLayout';
import MapView, { Marker } from 'react-native-maps';
import { PlayerCard } from '../../components';
import { useGetTeamUsersByIdQuery } from '../../../features/query/teamQueryService';
import { useFetchAttendancesByEventIdQuery } from '../../../features/query/eventQueryService';

const EventDetailPage: React.FC<{ route: any }> = ({ route }) => {
  const {
    event_id,
    team_name,
    event_name,
    place,
    coordinates,
    start_datetime,
    event_type,
    team_id,
  } = route.params;
  const [showMap, setShowMap] = React.useState(false);

  const user = useSelector((state: RootState) => state.auth.user);
  const eventDate = new Date(start_datetime);
  const now = new Date();
  const hasEventPassed = now > eventDate;

  const { data: teamUsers = [] } = useGetTeamUsersByIdQuery(team_id);
  const { data: attendanceData = [] } = useFetchAttendancesByEventIdQuery(event_id, {
    skip: !hasEventPassed,
  });

  const handleMarkerPress = useCallback(() => {
    const buttons = [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Google Maps', onPress: () => openMaps('google') },
    ];

    if (Platform.OS === 'ios') {
      buttons.push({ text: 'Apple Maps', onPress: () => openMaps('apple') });
    }

    Alert.alert('Open Maps', 'Choose an app to open this location:', buttons);
  }, []);

  const openMaps = useCallback(
    (type: string) => {
      const latitude = coordinates.latitude;
      const longitude = coordinates.longitude;
      const label = encodeURIComponent(`${place} - ${event_name}`);
      let url;

      if (type === 'google') {
        url = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${latitude},${longitude}`;
      } else if (type === 'apple') {
        url = `maps:0,0?q=${label}@${latitude},${longitude}`;
      }

      if (url) {
        Linking.canOpenURL(url)
          .then((supported) => {
            if (supported) {
              Linking.openURL(url);
            } else {
              console.error("Can't handle URL: " + url);
            }
          })
          .catch((err) => console.error('An error occurred', err));
      } else {
        console.error('Undefined URL for the maps application.');
      }
    },
    [coordinates, place, event_name]
  );

  const NavigateUserDetails = useCallback((user_id: string) => {
    console.log('Navigating to user details:', user_id);
  }, []);

  const mergedData = useMemo(() => {
    if (!attendanceData.length) return teamUsers;
    return teamUsers.map((user) => {
      const attendanceRecord = attendanceData.find((att) => att.user_id === user._id);
      return {
        ...user,
        attended: attendanceRecord ? attendanceRecord.status === "present" : false,
      };
    });
  }, [teamUsers, attendanceData]);

  
  return (
    <AppLayout>
      <ScrollView contentContainerStyle="p-4 bg-gray-100">
        <View className="p-4 bg-white rounded-xl shadow-md mb-4">
          <View className="mb-2 flex-row gap-x-2">
            <Text className="font-bold text-lg text-dacka-green">Team:</Text>
            <Text className="text-lg">{team_name}</Text>
          </View>
          <View className="mb-2 flex-row gap-x-2">
            <Text className="font-bold text-lg text-dacka-green">Event Type:</Text>
            <Text className="text-lg">{event_type}</Text>
          </View>
          <View className="mb-2 flex-row gap-x-2">
            <Text className="font-bold text-lg text-dacka-green">Place:</Text>
            <Text className="text-lg">{place}</Text>
          </View>
          <View className="mb-2 flex-row gap-x-2">
            <Text className="font-bold text-lg text-dacka-green">Date:</Text>
            <Text className="text-lg">{eventDate.toDateString()}</Text>
          </View>

          <TouchableOpacity
            className="mt-4 p-4 bg-blue-600 rounded-lg"
            onPress={() => setShowMap((prevState) => !prevState)}
          >
            <Text className="text-white text-center">
              {showMap ? 'Hide map' : 'See location on map'}
            </Text>
          </TouchableOpacity>

          {showMap && (
            <MapView
              className="mt-4 h-64 rounded-lg overflow-hidden"
              initialRegion={{
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
            >
              <Marker
                key={event_id}
                coordinate={coordinates}
                title={place}
                description={`${event_name} at ${team_name}`}
                onPress={handleMarkerPress}
              />
            </MapView>
          )}
        </View>

        <View className="my-4 p-4 bg-white rounded-lg shadow-md">
          <Text className="text-lg font-semibold text-gray-800 mb-2">
            {hasEventPassed ? 'Attendance Table' : 'Team Players'}
          </Text>
          {mergedData &&
            mergedData.map((user) => (
              <PlayerCard
                key={user._id}
                name={user.name}
                image={user.image}
                attended={user.attended}
                onPress={() => NavigateUserDetails(user._id)}
              />
            ))}
        </View>
      </ScrollView>
    </AppLayout>
  );
};

export default EventDetailPage;