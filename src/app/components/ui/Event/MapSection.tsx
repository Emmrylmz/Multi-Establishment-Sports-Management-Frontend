// MapSection.tsx
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface MapSectionProps {
  showMap: boolean;
  toggleShowMap: () => void;
  coordinates: { latitude: number; longitude: number };
  place: string;
  event_name: string;
  team_name: string;
  handleMarkerPress: () => void;
}

const MapSection: React.FC<MapSectionProps> = React.memo(({
  showMap,
  toggleShowMap,
  coordinates,
  place,
  event_name,
  team_name,
  handleMarkerPress,
}) => (
  <View style={{ marginBottom: 20 }}>
    <TouchableOpacity
      style={{
        backgroundColor: '#4a90e2',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
      }}
      onPress={toggleShowMap}
    >
      <Icon
        name={showMap ? 'map-marker-off' : 'map-marker'}
        size={24}
        color="#ffffff"
        style={{ marginRight: 10 }}
      />
      <Text style={{ color: 'white', fontWeight: 'bold' }}>
        {showMap ? 'Hide map' : 'See location on map'}
      </Text>
    </TouchableOpacity>

    {showMap && (
      <MapView
        style={{ height: 200, marginBottom: 20, borderRadius: 10 }}
        initialRegion={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker
          coordinate={coordinates}
          title={place}
          description={`${event_name} at ${team_name}`}
          onPress={handleMarkerPress}
        />
      </MapView>
    )}
  </View>
));

export default MapSection;