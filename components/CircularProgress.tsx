import React, { useEffect } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Colors } from '../constants/tokens';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularProgressProps {
  percentage: number; // 0–100
  size: number;
  strokeWidth: number;
  children?: React.ReactNode;
}

export default function CircularProgress({
  percentage,
  size,
  strokeWidth,
  children,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(percentage / 100, {
      duration: 900,
      easing: Easing.out(Easing.cubic),
    });
  }, [percentage]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value),
  }));

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={Colors.surfaceHigh}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Defs>
          <LinearGradient id="cpGradient" x1="0" y1="0" x2={size} y2="0" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor={Colors.primaryLight} />
            <Stop offset="100%" stopColor={Colors.success} />
          </LinearGradient>
        </Defs>
        <AnimatedCircle
          cx={center}
          cy={center}
          r={radius}
          stroke="url(#cpGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
          rotation={-90}
          origin={`${center}, ${center}`}
        />
      </Svg>
      {children}
    </View>
  );
}
