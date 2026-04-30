import { useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import ProgressBar from '../../components/ProgressBar';
import TimerBar from '../../components/TimerBar';
import SwipeCard, { SWIPE_THRESHOLD } from '../../components/SwipeCard';
import { useGame } from '../../src/hooks/useGame';
import {
  BorderRadius,
  Colors,
  Duration,
  FontFamily,
  FontSize,
  LetterSpacing,
  Spacing,
} from '../../constants/tokens';

const ROUND_SIZE = 20;
const HINT_ACTIVE_AT = 60;
const FEEDBACK_DURATION = 600;

export default function GameScreen() {
  const router = useRouter();
  const { currentQuestion, score, questionIndex, isComplete, answerHistory, submitAnswer } =
    useGame();
  const hasAnsweredRef = useRef(false);
  const translateX = useSharedValue(0);
  // 1 when correct answer is swipe-right (isMatch), -1 when correct is swipe-left
  const correctDir = useSharedValue(currentQuestion?.isMatch ? 1 : -1);
  // 0 = idle, 1 = correct feedback, -1 = wrong feedback
  const feedbackValue = useSharedValue(0);

  useEffect(() => {
    hasAnsweredRef.current = false;
    translateX.value = 0;
    feedbackValue.value = 0;
    if (currentQuestion) correctDir.value = currentQuestion.isMatch ? 1 : -1;
  }, [questionIndex]);

  useEffect(() => {
    if (isComplete) {
      router.replace({
        pathname: '/result',
        params: {
          score: String(score),
          history: JSON.stringify(answerHistory),
        },
      });
    }
  }, [isComplete]);

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: `${translateX.value * 0.04}deg` },
    ],
  }));

  const correctHintStyle = useAnimatedStyle(() => {
    const drag = translateX.value * correctDir.value;
    return { opacity: interpolate(drag, [0, HINT_ACTIVE_AT], [0.35, 1], Extrapolation.CLAMP) };
  });

  const wrongHintStyle = useAnimatedStyle(() => {
    const drag = -(translateX.value * correctDir.value);
    return { opacity: interpolate(drag, [0, HINT_ACTIVE_AT], [0.35, 1], Extrapolation.CLAMP) };
  });

  if (!currentQuestion) return null;

  // Card is already snapping back to center when this is called.
  // Show feedback badge for FEEDBACK_DURATION ms, then fly card off screen.
  function triggerFeedback(isCorrect: boolean, flyRight: boolean) {
    feedbackValue.value = isCorrect ? 1 : -1;
    setTimeout(() => {
      translateX.value = withTiming(flyRight ? 500 : -500, { duration: Duration.normal }, () => {
        'worklet';
        runOnJS(submitAnswer)(isCorrect);
      });
    }, FEEDBACK_DURATION);
  }

  // isCorrect = whether the answer was right; swipedRight = which direction card should fly off
  function handleSwipe(isCorrect: boolean, swipedRight: boolean) {
    if (hasAnsweredRef.current) return;
    hasAnsweredRef.current = true;
    triggerFeedback(isCorrect, swipedRight);
  }

  function handleExpire() {
    if (hasAnsweredRef.current) return;
    hasAnsweredRef.current = true;
    submitAnswer(false);
  }

  function handleButtonPress(direction: 'correct' | 'wrong') {
    if (hasAnsweredRef.current) return;
    hasAnsweredRef.current = true;
    const isCorrect = (direction === 'correct') === currentQuestion!.isMatch;
    const flyRight = direction === 'correct';
    triggerFeedback(isCorrect, flyRight);
  }

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
          <Feather name="chevron-left" size={16} color={Colors.textSecondary} />
        </TouchableOpacity>
        <View style={styles.progressWrapper}>
          <ProgressBar current={questionIndex} total={ROUND_SIZE} />
        </View>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>SCORE</Text>
          <Text style={styles.scoreValue}>{score}</Text>
        </View>
      </View>

      {/* Swipe direction hints */}
      <View style={styles.hintsRow}>
        <Animated.View style={[styles.hint, wrongHintStyle]}>
          <Feather name="x" size={11} color={Colors.error} />
          <Text style={[styles.hintText, { color: Colors.error }]}>WRONG</Text>
        </Animated.View>
        <Animated.View style={[styles.hint, correctHintStyle]}>
          <Text style={[styles.hintText, { color: Colors.success }]}>CORRECT</Text>
          <Feather name="check" size={11} color={Colors.success} />
        </Animated.View>
      </View>

      {/* Timer */}
      <TimerBar key={questionIndex} running duration={15000} onExpire={handleExpire} />

      {/* Card area */}
      <View style={styles.cardArea}>
        <Animated.View style={animatedCardStyle}>
          <SwipeCard
            key={questionIndex}
            word={currentQuestion.word.word}
            partOfSpeech={currentQuestion.word.partOfSpeech}
            definition={currentQuestion.displayDefinition}
            isMatch={currentQuestion.isMatch}
            translateX={translateX}
            feedbackValue={feedbackValue}
            onSwipe={handleSwipe}
          />
        </Animated.View>
      </View>

      {/* Action buttons */}
      <View style={styles.bottomRow}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.wrongBtn]}
          onPress={() => handleButtonPress('wrong')}
          activeOpacity={0.8}
        >
          <Feather name="x" size={18} color={Colors.error} />
          <Text style={[styles.actionBtnText, { color: Colors.error }]}>Wrong</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, styles.correctBtn]}
          onPress={() => handleButtonPress('correct')}
          activeOpacity={0.8}
        >
          <Text style={[styles.actionBtnText, { color: Colors.success }]}>Correct</Text>
          <Feather name="check" size={18} color={Colors.success} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    paddingHorizontal: Spacing[5],
    paddingTop: Spacing[14],
    paddingBottom: Spacing[8],
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[4],
    marginBottom: Spacing[4],
  },
  backButton: {
    width: 34,
    height: 34,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  progressWrapper: {
    flex: 1,
  },
  scoreBox: {
    alignItems: 'flex-end',
    paddingLeft: Spacing[4],
    borderLeftWidth: 1,
    borderLeftColor: Colors.border,
  },
  scoreLabel: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    letterSpacing: LetterSpacing.wider,
    marginBottom: 2,
  },
  scoreValue: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize['2xl'],
    color: Colors.textPrimary,
    letterSpacing: LetterSpacing.tight,
    lineHeight: FontSize['2xl'],
  },
  hintsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing[3],
  },
  hint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[1],
  },
  hintText: {
    fontFamily: FontFamily.bodySemibold,
    fontSize: FontSize.xs,
    letterSpacing: LetterSpacing.wider,
  },
  cardArea: {
    flex: 1,
    justifyContent: 'center',
    marginTop: Spacing[4],
  },
  bottomRow: {
    flexDirection: 'row',
    gap: Spacing[3],
    marginTop: Spacing[4],
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing[2],
    paddingVertical: Spacing[4],
    borderRadius: BorderRadius['2xl'],
    borderWidth: 1,
  },
  wrongBtn: {
    backgroundColor: Colors.errorDim,
    borderColor: Colors.error + '40',
  },
  correctBtn: {
    backgroundColor: Colors.successDim,
    borderColor: Colors.success + '40',
  },
  actionBtnText: {
    fontFamily: FontFamily.displaySemibold,
    fontSize: FontSize.base,
    letterSpacing: LetterSpacing.wide,
  },
});
