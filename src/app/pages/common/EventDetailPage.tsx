import { View, Text, Alert, Platform, Linking,TouchableOpacity } from 'react-native';
import React from 'react';
import AppLayout from '../../components/layout/AppLayout';
import MapView, { Marker } from 'react-native-maps';

const EventDetailPage = ({ route }) => {
  const { event_id, team_name, event_type,place, } = route.params;
  // const [showMap, setShowMap] = React.useState(false);

  // const handleMarkerPress = () => {
  //   const buttons = [
  //     {
  //       text: "Cancel",
  //       style: "cancel"
  //     },
  //     { 
  //       text: "Google Maps", 
  //       onPress: () => openMaps("google")
  //     }
  //   ];

  //   if (Platform.OS === 'ios') {
  //     buttons.push({
  //       text: "Apple Maps",
  //       onPress: () => openMaps("apple")
  //     });
  //   }

  //   Alert.alert(
  //     "Open Maps",
  //     "Choose an app to open this location:",
  //     buttons
  //   );
  // };

  // const openMaps = (type:string) => {
  //   let url;
  //   const latitude = coordinates.latitude;
  //   const longitude = coordinates.longitude;
  //   const label = encodeURIComponent(team_name + " - " + event_type);

  //   if (type === "google") {
  //     // URL for Google Maps
  //     url = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${latitude},${longitude}`;
  //   } else if (type === "apple") {
  //     // URL for Apple Maps
  //     url = `maps:0,0?q=${label}@${latitude},${longitude}`;
  //   }

  //   // Check if URL is defined and then open the URL
  //   if (url) {
  //     Linking.canOpenURL(url)
  //       .then((supported) => {
  //         if (supported) {
  //           Linking.openURL(url);
  //         } else {
  //           console.error("Can't handle URL: " + url);
  //         }
  //       })
  //       .catch((err) => console.error("An error occurred", err));
  //   } else {
  //     console.error("Undefined URL for the maps application.");
  //   }
  // };


  return (
    <AppLayout>
      <View>
        <Text className='text-xl text-center text-dacka-green'>{event_type}</Text>
        <Text className='text-xl text-center text-white'>{team_name}</Text>
        <Text className='text-xl text-center text-white'>{place}</Text>
        {/* <TouchableOpacity onPress={() => setShowMap((prevState) => !prevState)}>
          <Text className='text-white'>{showMap ? 'Hide map': 'See location on map'}</Text>
        </TouchableOpacity> */}
        {/* {showMap && (
          <MapView
          style={{height: "75%"}}
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
            title={locationName}
            description={event_type + " at " + team_name}
            onPress={handleMarkerPress} 
          />
        </MapView> */}
        
      </View>
    </AppLayout>
  );
};

export default EventDetailPage;
