import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const BigCircle = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#ffffff", '#4ca2d5', '#3FA454']}
        style={styles.gradient}
      />
    </View>
  );
};

const styles = {
  container: {
    width: '200%',
    height: '200%',
    position: 'absolute',
  },
  gradient: {
    width: '100%',
    height: '100%',
    borderRadius: 1000, // A large value to ensure it's always circular
  },
};

export default BigCircle;