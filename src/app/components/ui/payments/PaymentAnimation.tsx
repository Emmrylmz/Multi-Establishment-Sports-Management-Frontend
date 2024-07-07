import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native'
import React, { useEffect, useRef } from 'react'

type PaymentAnimationProps = {
  truthyState: boolean;
  falsyState?: boolean;
  scaleAnim?: Animated.Value;
  fadeAnim?: Animated.Value;
  onRetry?: () => void;
}

const PaymentAnimation = ({truthyState, falsyState, scaleAnim, fadeAnim, onRetry}: PaymentAnimationProps) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (truthyState) {
      // Delay the animation start
      const delay = setTimeout(() => {
        Animated.loop(
          Animated.timing(spinValue, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
          })
        ).start();
      }, 500); // 500ms delay

      return () => {
        clearTimeout(delay);
        spinValue.stopAnimation();
      };
    }
  }, [truthyState]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <Animated.View 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: fadeAnim,
      }}
    >
      <Animated.View 
        style={{
          backgroundColor: 'white',
          padding: 30,
          borderRadius: 20,
          alignItems: 'center',
          transform: [{ scale: scaleAnim }],
          minWidth: 200,
        }}
      >
        {truthyState ? (
          <View style={{ alignItems: 'center' }}>
            <Animated.View 
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                borderWidth: 6,
                borderColor: '#4CAF50',
                borderTopColor: 'transparent',
                transform: [{ rotate: spin }]
              }}
            />
            <Text style={{ marginTop: 20, fontSize: 18, fontWeight: 'bold', color: '#4CAF50', textAlign: 'center' }}>
              Processing{'\n'}Payment
            </Text>
          </View>
        ) : (
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 50, marginBottom: 15 }}>❌</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FF6347', textAlign: 'center' }}>
              Payment Error
            </Text>
            <TouchableOpacity 
              style={{ marginTop: 25, paddingVertical: 12, paddingHorizontal: 25, backgroundColor: '#4CAF50', borderRadius: 25 }}
              onPress={onRetry}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </Animated.View>
  )
}

export default PaymentAnimation