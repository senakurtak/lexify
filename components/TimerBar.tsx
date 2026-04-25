import { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { BorderRadius, Colors } from '../constants/tokens';

interface TimerBarProps {
  duration?: number;
  onExpire?: () => void;
  running: boolean;
}

export default function TimerBar({ duration = 15000, onExpire, running }: TimerBarProps) {
  const progress = useSharedValue(1);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    if (running) {
      progress.value = 1;
      progress.value = withTiming(0, { duration, easing: Easing.linear }, (finished) => {
        if (finished && onExpireRef.current) {
          runOnJS(onExpireRef.current)();
        }
      });
    } else {
      cancelAnimation(progress);
    }
  }, [running, duration]);

  const threshold = Math.min(5000 / duration, 1);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
    backgroundColor: interpolateColor(
      progress.value,
      [0, threshold, 1],
      [Colors.error, Colors.primary, Colors.primary],
    ),
  }));

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.fill, fillStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 6,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceHigh,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: BorderRadius.full,
  },
});
