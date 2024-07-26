import React, { useState, useRef, useCallback, useMemo, memo } from 'react';
import {
  View,
  Text,
  Platform,
  Linking,
  Animated,
  Dimensions,
  TouchableOpacity,
  Modal,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { useGetTeamUsersByIdQuery } from '../../../features/query/teamQueryService';
import { useFetchAttendancesByEventIdQuery } from '../../../features/query/eventQueryService';
import { LinearGradient } from 'expo-linear-gradient';
import AnimatedHeader from '../../components/ui/Form/AnimatedHeader';
import EventDetailsSection from '../../components/ui/Event/EventDetailsSection';
import MapSection from '../../components/ui/Event/MapSection';
import GoBackButton from '../../components/ui/GoBackButton';
import { PlayerCard } from '../../components';
import SubmitButton from '../../components/ui/Form/SubmitButton';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const PlayerActionModal = ({ visible, onClose, playerName, onSeeDetails, onRatePlayer }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <TouchableOpacity 
      style={{ flex: 1, justifyContent: 'flex-end' }}
      activeOpacity={1} 
      onPress={onClose}
    >
      <View style={{
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
          {playerName}
        </Text>
        <TouchableOpacity 
          style={{ 
            backgroundColor: '#3B82F6', 
            padding: 15, 
            borderRadius: 10, 
            marginBottom: 10 
          }}
          onPress={onSeeDetails}
        >
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>See Player Details</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{ 
            backgroundColor: '#10B981', 
            padding: 15, 
            borderRadius: 10 
          }}
          onPress={onRatePlayer}
        >
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>Rate Player</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  </Modal>
);

const EventDetailPage = ({ route, navigation }) => {
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
  const [showMap, setShowMap] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const eventDate = new Date(start_datetime);
  const now = new Date();
  const hasEventPassed = now > eventDate;

  const {
    data: teamUsers = {},
    isLoading: isTeamUsersLoading,
    isError: isTeamUsersError,
  } = useGetTeamUsersByIdQuery(team_id);
  const {
    data: attendanceData = [],
    isLoading: isAttendanceLoading,
    isError: isAttendanceError,
  } = useFetchAttendancesByEventIdQuery(event_id, { skip: !hasEventPassed });

  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = SCREEN_HEIGHT * 0.4;

  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handleMarkerPress = useCallback(() => {
    const buttons = [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Google Maps', onPress: () => openMaps('google') },
    ];

    if (Platform.OS === 'ios') {
      buttons.push({ text: 'Apple Maps', onPress: () => openMaps('apple') });
    }

    Alert.alert('Open Maps', 'Choose an app to open this location:', buttons);
  }, [coordinates, place, event_name]);

  const openMaps = useCallback(
    (type) => {
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

  const NavigateUserDetails = useCallback(
    (user_id) => {
      navigation.navigate('UserProfile', { user_id });
    },
    [navigation]
  );

  const handlePlayerCardPress = useCallback((player_id, player_name) => {
    setSelectedPlayer({ id: player_id, name: player_name });
  }, []);

  const closeModal = useCallback(() => {
    setSelectedPlayer(null);
  }, []);

  const handleSeeDetails = useCallback(() => {
    if (selectedPlayer) {
      NavigateUserDetails(selectedPlayer.id);
      closeModal();
    }
  }, [selectedPlayer, NavigateUserDetails]);

  const handleRatePlayer = useCallback(() => {
    if (selectedPlayer) {
      navigation.navigate('RatePlayerPage', { 
        player_id: selectedPlayer.id, 
        event_id, 
        event_name,
        player_name: selectedPlayer.name 
      });
      closeModal();
    }
  }, [selectedPlayer, navigation, event_id, event_name]);

  const mergedData = useMemo(() => {
    const allUsers = [...(teamUsers.player_infos || [])];
    if (!attendanceData.length) return allUsers;
    return allUsers.map((user) => {
      const attendanceRecord = attendanceData.find(
        (att) => att.user_id === user._id
      );
      return {
        ...user,
        attended: attendanceRecord
          ? attendanceRecord.status === 'present'
          : false,
      };
    });
  }, [teamUsers, attendanceData]);

  const toggleShowMap = useCallback(() => {
    setShowMap((prevState) => !prevState);
  }, []);

  const imageSource = useMemo(() => {
    switch (event_type) {
      case 'Training':
        return require('../../../assets/Basketball-rafiki.png');
      case 'Game':
        return require('../../../assets/Basketball-bro.png');
      default:
        return require('../../../assets/Basketball-bro.png');
    }
  }, [event_type]);

  const navigateToAttendance = useCallback(() => {
    navigation.navigate('TakeAttendance', {
      event_id,
      event_type,
      mergedData,
    });
  }, [navigation, event_id, event_type, mergedData]);

  if (isTeamUsersLoading || isAttendanceLoading) {
    return <SafeAreaView className='items-center justify-center flex-1'>
      <Text>Loading...</Text>
      <ActivityIndicator size="large" color="#00ff00" />
    </SafeAreaView>;
  }

  if (isTeamUsersError || isAttendanceError) {
    return <Text>Error loading data</Text>;
  }

  return (
    <>
      <GoBackButton />
      <AnimatedHeader
        imageSource={imageSource}
        scrollY={scrollY}
        headerHeight={headerHeight}
      />
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        className="flex-1 bg-gray-100 dark:bg-black"
        contentContainerStyle={{ paddingTop: headerHeight }}
      >
        <View className="p-5 bg-gray-100 rounded-t-3xl dark:bg-dacka-black">
          <EventDetailsSection
            team_name={team_name}
            event_type={event_type}
            place={place}
            eventDate={eventDate}
          />
  
          {user?.role === 'Coach' && hasEventPassed && (
            <View className="mb-5">
              <SubmitButton
                onPress={navigateToAttendance}
                title="Take Attendance"
              />
            </View>
          )}
  
          <MapSection
            showMap={showMap}
            toggleShowMap={toggleShowMap}
            coordinates={coordinates}
            place={place}
            event_name={event_name}
            team_name={team_name}
            handleMarkerPress={handleMarkerPress}
          />
  
          <View className="mt-5">
            <Text className="text-xl font-bold mb-2.5 text-gray-900 dark:text-gray-100">Coaches</Text>
            {(teamUsers.coach_infos || []).map((coach) => (
              <PlayerCard
                id={coach._id}
                key={coach._id}
                name={coach.name}
                image={{
                  uri:
                    coach.photo || 'https://avatar.iran.liara.run/public/boy',
                }}
                position="Coach"
                onPress={() => NavigateUserDetails(coach._id)}
              />
            ))}
          </View>
  
          {!hasEventPassed && (
            <View className="mt-5">
              <Text className="text-xl font-bold mb-2.5 text-gray-900 dark:text-gray-100">Players</Text>
              {(teamUsers.player_infos || []).map((player) => (
                <PlayerCard
                  id={player._id}
                  key={player._id}
                  name={player.name}
                  image={{
                    uri:
                      player.photo ||
                      'https://avatar.iran.liara.run/public/boy',
                  }}
                  position="Player"
                  onPress={() => handlePlayerCardPress(player._id, player.name)}
                />
              ))}
            </View>
          )}
  
          {hasEventPassed && (
            <View className="mt-5">
              <Text className="text-xl font-bold mb-2.5 text-gray-900 dark:text-gray-100">Attendance</Text>
              {mergedData.map((user) => (
                <PlayerCard
                  id={user._id}
                  key={user._id}
                  name={user.name}
                  image={{
                    uri:
                      user.photo || 'https://avatar.iran.liara.run/public/boy',
                  }}
                  position="Player"
                  attended={user.attended}
                  onPress={() => handlePlayerCardPress(user._id, user.name)}
                />
              ))}
            </View>
          )}
        </View>
      </Animated.ScrollView>
  
      <PlayerActionModal
        visible={!!selectedPlayer}
        onClose={closeModal}
        playerName={selectedPlayer?.name}
        onSeeDetails={handleSeeDetails}
        onRatePlayer={handleRatePlayer}
      />
    </>
  );
};

export default memo(EventDetailPage);