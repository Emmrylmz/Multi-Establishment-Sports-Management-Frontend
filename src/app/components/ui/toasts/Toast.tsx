import React, { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, SafeAreaView, Dimensions, View as RNView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { View, Text } from 'react-native';

type ToastPosition = 'top-left' | 'top-right' | 'top-center';
type ToastType = 'error' | 'success' | 'info' | 'warning';
type AnimationType = 'slide' | 'fade' | 'bounce';

interface ToastProps {
  message: string | { msg: string };
  type?: ToastType;
  position?: ToastPosition;
  animationType?: AnimationType;
  duration?: number;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'error',
  position = 'top-center',
  animationType = 'slide',
  duration = 3000,
  onClose,
}) => {
  const { width } = Dimensions.get('window');
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-100)).current;
  const translateX = useRef(new Animated.Value(getInitialTranslateX())).current;

  function getInitialTranslateX() {
    if (position === 'top-left') return -width / 2;
    if (position === 'top-right') return width / 2;
    return 0;
  }

  useEffect(() => {
    if (message) {
      showToast();
    }
    return () => {
      Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }).start();
    };
  }, [message]);

  const showToast = () => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      getAnimation(),
    ]).start();

    setTimeout(() => {
      hideToast();
    }, duration);
  };

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
      animationType !== 'fade'
        ? Animated.timing(position !== 'top-center' ? translateX : translateY, {
            toValue: getInitialTranslateX(),
            duration: 300,
            useNativeDriver: true,
          })
        : Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start(() => {
      if (onClose) onClose();
    });
  };

  const getAnimation = () => {
    switch (animationType) {
      case 'fade':
        return Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true });
      case 'bounce':
        return Animated.spring(position !== 'top-center' ? translateX : translateY, {
          toValue: 0,
          velocity: 3,
          tension: 2,
          friction: 8,
          useNativeDriver: true,
        });
      default: // slide
        return Animated.timing(position !== 'top-center' ? translateX : translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        });
    }
  };

  const getBackgroundColor = (): string => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'info':
        return 'bg-blue-500';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return 'bg-red-500';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'info':
        return 'info';
      case 'warning':
        return 'alert-triangle';
      default:
        return 'x-circle';
    }
  };

  const messageText = typeof message === 'string' ? message : message.msg;

  return (
    <SafeAreaView className="absolute top-0 left-0 right-0">
      <RNView className={`px-4 ${position === 'top-center' ? 'items-center' : position === 'top-right' ? 'items-end' : 'items-start'}`}>
        <Animated.View
          className={`flex-row items-center p-4 rounded-lg shadow-md ${getBackgroundColor()}`}
          style={{
            opacity,
            transform: animationType !== 'fade' 
              ? [
                  { translateX: position !== 'top-center' ? translateX : 0 },
                  { translateY: position === 'top-center' ? translateY : 0 },
                ]
              : [],
            maxWidth: '90%',
          }}
        >
          <View className="mr-3">
            <Feather name={getIcon()} size={24} color="white" />
          </View>
          <Text className="flex-1 text-base text-white" numberOfLines={2} ellipsizeMode="tail">
            {messageText}
          </Text>
          <TouchableOpacity onPress={hideToast} className="ml-3">
            <Feather name="x" size={20} color="white" />
          </TouchableOpacity>
        </Animated.View>
      </RNView>
    </SafeAreaView>
  );
};

export default Toast;