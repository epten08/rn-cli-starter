import React, { useEffect, useState } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

interface SkeletonProps {
  width?: ViewStyle['width'];
  height?: ViewStyle['height'];
  borderRadius?: number;
  variant?: 'rect' | 'circle';
  animated?: boolean;
  duration?: number;
  style?: StyleProp<ViewStyle>;
}

export const Skeleton = ({
  width = '100%',
  height = 16,
  borderRadius = 8,
  variant = 'rect',
  animated = true,
  duration = 1100,
  style,
}: SkeletonProps) => {
  const [opacity] = useState(() => new Animated.Value(0.4));
  const animatedStyle = {
    width,
    height,
    borderRadius: variant === 'circle' ? 999 : borderRadius,
    opacity,
  };

  useEffect(() => {
    if (!animated) {
      opacity.setValue(0.65);
      return;
    }

    const loopAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.9,
          duration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    loopAnimation.start();
    return () => {
      loopAnimation.stop();
    };
  }, [animated, duration, opacity]);

  return <Animated.View style={[styles.base, animatedStyle, style]} />;
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#e5e7eb',
  },
});
