// SubmitButton.tsx
import React, { useRef } from 'react';
import { TouchableOpacity, Text, Animated } from 'react-native';

interface SubmitButtonProps {
  onPress: () => void;
  title: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onPress, title }) => {
  const buttonScale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View 
        style={{ transform: [{ scale: buttonScale }] }}
        className="items-center w-full px-6 py-4 mt-6 rounded-xl bg-dacka-light-green"
      >
        <Text className="text-lg font-semibold text-white">
          {title}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default SubmitButton;