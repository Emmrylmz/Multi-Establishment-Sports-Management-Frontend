import { View, Text } from 'react-native';
import React from 'react';
import {LinearGradient} from 'expo-linear-gradient';

const BigCircle = () => {
  return (
    <LinearGradient
      colors={["#ffffff",'#4ca2d5','#3FA454']} // Customize the colors as needed
      style={BigCircleStyles}
    >
    </LinearGradient>
  );
};

const BigCircleStyles = {
  width: 700,
  height: 700,
  top: -400,
  left: -150,
  borderRadius: 350, // Use 350 to match half of the width/height
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  zIndex: -1
};

const TextStyle = {
  color: 'white',
  fontSize: 24,
  fontWeight: 'bold'
};

export default BigCircle;
