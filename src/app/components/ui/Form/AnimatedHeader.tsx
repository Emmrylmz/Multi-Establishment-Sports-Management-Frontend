// AnimatedHeader.tsx
import React from 'react';
import { Animated, Dimensions, Image, ImageSourcePropType, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface AnimatedHeaderProps {
  scrollY: Animated.Value;
  headerHeight: number;
  imageSource: ImageSourcePropType;
  gradientColors?: string[];
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  scrollY,
  headerHeight,
  imageSource,
  gradientColors = ['#00897B', '#3FA454']
}) => {
  const headerHeightInterpolate = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [headerHeight, headerHeight / 3],
    extrapolate: 'clamp',
  });

  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, headerHeight / 2, headerHeight],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  const gradientTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight / 3],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      className="absolute top-0 left-0 right-0 overflow-hidden bg-transparent rounded-b-3xl z-10"
      style={{ height: headerHeightInterpolate }}
    >
        <LinearGradient
          colors={gradientColors}
          className="absolute inset-0 rounded-b-3xl"
          style={{ height: headerHeight * 1.3, width: SCREEN_WIDTH }}
        />
      <Animated.View style={{ transform: [{ translateY: gradientTranslateY }] }}>
      </Animated.View>
      <Animated.View 
        className="absolute inset-x-0 bottom-0 top-5 items-center justify-center"
        style={{ 
          transform: [{ translateY: imageTranslateY }],
          opacity: imageOpacity
        }}
      >
        <Image
          source={imageSource}
          className="w-[200%] h-[200%]"
          resizeMode="contain"
        />
      </Animated.View>
    </Animated.View>
  );
};

export default AnimatedHeader;