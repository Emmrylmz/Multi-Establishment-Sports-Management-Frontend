// AnimatedHeader.tsx
import React, { useRef, useEffect } from 'react';
import { Animated, ViewStyle } from 'react-native';

interface AnimatedHeaderProps {
  imageSource: any;
  scrollY: Animated.Value;
  headerHeight: number;
  style?: ViewStyle;
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({ imageSource, scrollY, headerHeight, style }) => {
  const imageScale = useRef(new Animated.Value(1)).current;
  const imageOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const scaleListener = scrollY.addListener(({ value }) => {
      const scale = 1 + (value / headerHeight) * 0.5;
      imageScale.setValue(scale > 1.5 ? 1.5 : scale);
      
      const opacity = 1 - (value / headerHeight);
      imageOpacity.setValue(opacity < 0 ? 0 : opacity);
    });

    return () => {
      scrollY.removeListener(scaleListener);
    };
  }, [scrollY, headerHeight]);

  return (
    <Animated.View style={[{ height: headerHeight, overflow: 'hidden' }, style]}>
      <Animated.Image
        source={imageSource}
        style={{
          width: '100%',
          height: '100%',
          transform: [{ scale: imageScale }],
          opacity: imageOpacity,
        }}
        resizeMode="cover"
      />
    </Animated.View>
  );
};

export default AnimatedHeader;