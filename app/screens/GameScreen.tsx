import { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import ProgressBar from '../../components/ProgressBar';
import TimerBar from '../../components/TimerBar';
import SwipeCard from '../../components/SwipeCard';
import SwipeHint from '../../components/SwipeHint';
import { useGame } from '../../src/hooks/useGame';
import {
  Colors,
  FontFamily,
  FontSize,
  LetterSpacing,
  Spacing,
} from '../../constants/tokens';

const ROUND_SIZE = 20;

export default function GameScreen() {
  const router = useRouter();
  const { currentQuestion, score, questionIndex, isComplete, answerHistory, submitAnswer } =
    useGame();
  const hasAnsweredRef = useRef(false);

  useEffect(() => {
    hasAnsweredRef.current = false;
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

  if (!currentQuestion) return null;

  function handleSwipe(direction: 'correct' | 'wrong') {
    if (hasAnsweredRef.current) return;
    hasAnsweredRef.current = true;
    submitAnswer(direction === 'correct');
  }

  function handleExpire() {
    if (hasAnsweredRef.current) return;
    hasAnsweredRef.current = true;
    submitAnswer(false);
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <View style={styles.progressWrapper}>
            <ProgressBar current={questionIndex} total={ROUND_SIZE} />
          </View>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreValue}>{score}</Text>
            <Text style={styles.scoreLabel}>pts</Text>
          </View>
        </View>
        <TimerBar key={questionIndex} running duration={15000} onExpire={handleExpire} />
      </View>

      <View style={styles.cardArea}>
        <SwipeCard
          key={questionIndex}
          word={currentQuestion.word.word}
          partOfSpeech={currentQuestion.word.partOfSpeech}
          definition={currentQuestion.displayDefinition}
          onSwipe={handleSwipe}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    paddingHorizontal: Spacing[5],
    paddingTop: Spacing[16],
    paddingBottom: Spacing[10],
  },
  header: {
    gap: Spacing[4],
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing[4],
  },
  progressWrapper: {
    flex: 1,
  },
  scoreBox: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing[1],
  },
  scoreValue: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize.xl,
    color: Colors.textPrimary,
    letterSpacing: LetterSpacing.tight,
  },
  scoreLabel: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  cardArea: {
    flex: 1,
    justifyContent: 'center',
  },
});
