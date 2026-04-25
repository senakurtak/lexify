import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { BorderRadius, Colors, Duration, FontFamily, FontSize, LetterSpacing, Spacing } from '../constants/tokens';

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
      <View style={styles.track}>
        <Animated.View style={[styles.fill, fillStyle]} />
      </View>
      <View style={styles.numberRow}>
        <Text style={styles.currentNumber}>{current}</Text>
        <Text style={styles.totalNumber}>/ {total}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing[3],
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
  numberRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing[1],
  },
  currentNumber: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize['xl'],
    color: Colors.textPrimary,
    letterSpacing: LetterSpacing.tight,
  },
  totalNumber: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
  },
});
