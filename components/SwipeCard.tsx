import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { StyleSheet, Text, View } from 'react-native';
import Badge from './Badge';
import {
  BorderRadius,
  Colors,
  FontFamily,
  FontSize,
  LetterSpacing,
  LineHeight,
  Spacing,
} from '../constants/tokens';
import type { PartOfSpeech } from '../src/data/words';

export const SWIPE_THRESHOLD = 120;
const ROTATION_FACTOR = 15;

interface SwipeCardProps {
  word: string;
  partOfSpeech: PartOfSpeech;
  definition: string;
  translateX: SharedValue<number>;
  onSwipe?: (direction: 'correct' | 'wrong') => void;
}

export default function SwipeCard({ word, partOfSpeech, definition, translateX, onSwipe }: SwipeCardProps) {
  const translateY = useSharedValue(0);

  function handleSwipe(direction: 'correct' | 'wrong') {
    onSwipe?.(direction);
  }

  const pan = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-5, 5])
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd((e) => {
      if (Math.abs(e.translationX) >= SWIPE_THRESHOLD) {
        const direction = e.translationX > 0 ? 'correct' : 'wrong';
        translateX.value = withTiming(
          e.translationX > 0 ? 500 : -500,
          { duration: 250 },
          () => runOnJS(handleSwipe)(direction),
        );
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      {
        rotate: `${interpolate(
          translateX.value,
          [-SWIPE_THRESHOLD, SWIPE_THRESHOLD],
          [-ROTATION_FACTOR, ROTATION_FACTOR],
          Extrapolation.CLAMP,
        )}deg`,
      },
    ],
  }));

  const cardBorderStyle = useAnimatedStyle(() => {
    const borderColor =
      translateX.value >= 0
        ? interpolateColor(translateX.value, [0, SWIPE_THRESHOLD], [Colors.border, Colors.success])
        : interpolateColor(-translateX.value, [0, SWIPE_THRESHOLD], [Colors.border, Colors.error]);
    return { borderColor, borderWidth: 1 };
  });

  const correctBadgeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, SWIPE_THRESHOLD], [0, 1], Extrapolation.CLAMP),
  }));

  const wrongBadgeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, -SWIPE_THRESHOLD], [0, 1], Extrapolation.CLAMP),
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={cardStyle}>
        <Animated.View style={[styles.card, cardBorderStyle]}>
          <Text style={styles.partOfSpeech}>{partOfSpeech.toUpperCase()}</Text>
          <Text style={styles.word}>{word.toUpperCase()}</Text>
          <View style={styles.divider} />
          <Text style={styles.definition}>{definition}</Text>

          <Animated.View style={[styles.badge, styles.correctBadge, correctBadgeStyle]}>
            <Badge variant="correct" size="large" />
          </Animated.View>
          <Animated.View style={[styles.badge, styles.wrongBadge, wrongBadgeStyle]}>
            <Badge variant="wrong" size="large" />
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius['3xl'],
    padding: Spacing[7],
  },
  partOfSpeech: {
    fontFamily: FontFamily.displayMedium,
    fontSize: FontSize.sm,
    color: Colors.primary,
    letterSpacing: LetterSpacing.widest,
    marginBottom: Spacing[3],
  },
  word: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize['4xl'],
    color: Colors.textPrimary,
    letterSpacing: LetterSpacing.tight,
  },
  divider: {
    width: 32,
    height: 2,
    backgroundColor: Colors.border,
    marginVertical: Spacing[4],
  },
  definition: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    lineHeight: FontSize.base * LineHeight.normal,
  },
  badge: {
    position: 'absolute',
    top: Spacing[7],
  },
  correctBadge: {
    right: Spacing[6],
  },
  wrongBadge: {
    left: Spacing[6],
  },
});
