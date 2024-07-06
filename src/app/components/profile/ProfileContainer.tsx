import React, { useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Animated, Dimensions, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserInfoType } from '../../../features/auth/auth.interface';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = SCREEN_HEIGHT * 0.4; // Increased height to accommodate profile picture
const HEADER_MIN_HEIGHT = SCREEN_HEIGHT * 0.15;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

type UserProfilePageProps = {
  user: UserInfoType;
};

const ProfileContainer: React.FC<UserProfilePageProps> = ({ user }) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  const imageScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [1, 0.5],
    extrapolate: 'clamp',
  });

  const stats = [
    { icon: 'calendar-check', label: 'Events', value: user?.total_training_events || 0 },
    { icon: 'trophy', label: 'Games', value: user?.total_game_events || 0 },
    { icon: 'account-group', label: 'Team', value: 'All-Stars' },
  ];

  const renderStatsCard = () => (
    <View style={styles.card}>
      {stats.map((stat, index) => (
        <View key={index} style={styles.statItem}>
          <Icon name={stat.icon} size={24} color="#4ca2d5" />
          <Text style={styles.statValue}>{stat.value}</Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );

  const renderInfoCard = (title, data) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {data.map((item, index) => (
        <View key={index} style={styles.infoRow}>
          <Text style={styles.infoLabel}>{item.label}</Text>
          <Text style={styles.infoValue}>{item.value}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={styles.scrollViewContent}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <View style={styles.content}>
          {renderStatsCard()}
          {renderInfoCard('Personal Info', [
            { label: 'Age', value: user?.age || 'N/A' },
            { label: 'Height', value: `${user?.height || 'N/A'} cm` },
            { label: 'Weight', value: `${user?.weight || 'N/A'} kg` },
          ])}
          {renderInfoCard('Performance', [
            { label: 'Training Attendance', value: `${user?.training_attendance_ratio || 0}%` },
            { label: 'Game Attendance', value: `${user?.game_attendance_ratio || 0}%` },
          ])}
        </View>
      </Animated.ScrollView>

      <Animated.View
        style={[
          styles.header,
          {
            transform: [{ translateY: headerTranslateY }],
          },
        ]}
      >
        <LinearGradient
          colors={['#4ca2d5', '#3FA454']}
          style={[StyleSheet.absoluteFill, styles.gradient]}
        />
        <Animated.View style={[styles.headerContent, { opacity: headerOpacity }]}>
          <Animated.Image
            source={{ uri: user?.photo || 'https://via.placeholder.com/150' }}
            style={[
              styles.profileImage,
              {
                transform: [{ scale: imageScale }],
              },
            ]}
          />
          <Text style={styles.name}>{user?.name || 'N/A'}</Text>
          <Text style={styles.role}>{user?.role || 'Team Member'}</Text>
        </Animated.View>
      </Animated.View>

      <TouchableOpacity style={styles.editButton}>
        <Icon name="pencil" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollViewContent: {
    paddingTop: HEADER_MAX_HEIGHT,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_MAX_HEIGHT,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  gradient: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 10,
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 28,
  },
  role: {
    color: '#fff',
    fontSize: 18,
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  editButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#4ca2d5',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ProfileContainer;