import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { BorderRadius, Colors, Duration, FontFamily, FontSize, Spacing } from '../constants/tokens';

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(current / total, { duration: Duration.normal });
  }, [current, total]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {current} / {total}
      </Text>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, fillStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing[2],
  },
  label: {
    fontFamily: FontFamily.bodySemibold,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  track: {
    height: 6,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceHigh,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
  },
});
