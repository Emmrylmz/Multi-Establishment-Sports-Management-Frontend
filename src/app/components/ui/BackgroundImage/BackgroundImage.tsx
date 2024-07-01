import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const BackgroundImage = ({ children }) => (
  <ImageBackground
    source={require('../../../../assets/background.png')}
    style={styles.backgroundImage}
  >
    {children}
  </ImageBackground>
);

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});

export default BackgroundImage;