import React from 'react';
import { View, ActivityIndicator, Text, Animated, Easing } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';

const LoadingIndicator = ({ isLoading, inline = false }) => {
  const { t } = useTranslation();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isLoading, pulseAnim]);

  if (!isLoading) return null;

  if (inline) {
    return (
      <View className="flex-row items-center justify-center py-4">
        <ActivityIndicator size="small" color="#4CAF50" />
        <Text className="ml-2 text-sm font-medium text-gray-600">{t('fetchMessages.loading')}</Text>
      </View>
    );
  }

  return (
    <View className="items-center justify-center flex-1 bg-white">
      <Animated.View 
        className="p-6 bg-gray-100 rounded-full"
        style={{
          transform: [{ scale: pulseAnim }],
        }}
      >
        <ActivityIndicator size="large" color="#4CAF50" />
      </Animated.View>
      <Text className="mt-4 font-medium text-gray-600">{t('fetchMessages.loading')}</Text>
    </View>
  );
};

export default LoadingIndicator;