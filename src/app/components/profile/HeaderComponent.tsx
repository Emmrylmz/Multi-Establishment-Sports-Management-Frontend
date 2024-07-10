import React from 'react';
import { Animated, StyleSheet, Text, View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = SCREEN_HEIGHT * 0.4;
const HEADER_MIN_HEIGHT = SCREEN_HEIGHT * 0.15;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

interface HeaderComponentProps {
  scrollY: Animated.Value;
  user: {
    photo?: string;
    name?: string;
    role?: string;
  };
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ scrollY, user }) => {
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

  return (
    <Animated.View
      style={[
        styles.header,
        { transform: [{ translateY: headerTranslateY }] },
      ]}
    >
      <LinearGradient
        colors={['#00897B', '#3FA454']}
        style={[StyleSheet.absoluteFill, styles.gradient]}
      />
      <Animated.View style={[styles.headerContent, { opacity: headerOpacity }]}>
        <Animated.Image
          source={{ uri: user?.photo || 'https://avatar.iran.liara.run/public/boy' }}
          style={[
            styles.profileImage,
            { transform: [{ scale: imageScale }] },
          ]}
        />
        <Text style={styles.name}>{user?.name || 'N/A'}</Text>
        <Text style={styles.role}>{user?.role || 'Team Member'}</Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
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
});

export default HeaderComponent;