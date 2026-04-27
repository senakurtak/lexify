import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Button from '../../components/Button';
import StatCard from '../../components/StatCard';
import { useScores } from '../../src/hooks/useScores';
import type { AnswerRecord } from '../../src/hooks/useGame';
import {
  BorderRadius,
  Colors,
  FontFamily,
  FontSize,
  LetterSpacing,
  Spacing,
} from '../../constants/tokens';

const TOTAL = 20;
const BEST_SCORE_KEY = '@lexify/bestScore';

// ---------------------------------------------------------------------------
// Donut ring — SVG stroke-dasharray technique
// ---------------------------------------------------------------------------

const RING_SIZE = 140;
const RING_STROKE = 11;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const RING_CENTER = RING_SIZE / 2;

function ProgressRing({ fill, children }: { fill: number; children?: React.ReactNode }) {
  const clampedFill = Math.max(0, Math.min(1, fill));
  const dashOffset = RING_CIRCUMFERENCE * (1 - clampedFill);

  return (
    <View style={ringStyles.wrapper}>
      <Svg width={RING_SIZE} height={RING_SIZE} style={ringStyles.svg}>
        {/* Track */}
        <Circle
          cx={RING_CENTER}
          cy={RING_CENTER}
          r={RING_RADIUS}
          stroke={Colors.surfaceHigh}
          strokeWidth={RING_STROKE}
          fill="none"
        />
        {/* Progress arc — starts at 12 o'clock, fills clockwise */}
        <Circle
          cx={RING_CENTER}
          cy={RING_CENTER}
          r={RING_RADIUS}
          stroke={Colors.success}
          strokeWidth={RING_STROKE}
          fill="none"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          rotation={-90}
          origin={`${RING_CENTER}, ${RING_CENTER}`}
        />
      </Svg>
      {children}
    </View>
  );
}

const ringStyles = StyleSheet.create({
  wrapper: {
    width: RING_SIZE,
    height: RING_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    position: 'absolute',
  },
});

// ---------------------------------------------------------------------------
// Performance message
// ---------------------------------------------------------------------------

function getPerformance(accuracy: number): { message: string; color: string } {
  if (accuracy >= 0.95) return { message: 'Outstanding!', color: Colors.primary };
  if (accuracy >= 0.80) return { message: 'Great job!', color: Colors.success };
  if (accuracy >= 0.50) return { message: 'Good effort!', color: Colors.textPrimary };
  return { message: 'Keep going!', color: Colors.textPrimary };
}

// ---------------------------------------------------------------------------
// Screen
// ---------------------------------------------------------------------------

export default function ResultScreen() {
  const router = useRouter();
  const { score: scoreParam, history: historyParam } = useLocalSearchParams<{
    score: string;
    history: string;
  }>();
  const { scores, saveRoundResult } = useScores();
  const savedRef = useRef(false);
  const [isNewBest, setIsNewBest] = useState(false);

  const score = Number(scoreParam ?? 0);
  const history: AnswerRecord[] = historyParam ? JSON.parse(historyParam as string) : [];
  const correctCount = history.filter((r) => r.answeredCorrectly).length;
  const wrongCount = history.length - correctCount;
  const accuracy = history.length ? correctCount / history.length : 0;
  const { message, color: messageColor } = getPerformance(accuracy);

  const bestCorrect = scores.bestScore > 0
    ? Math.round(Math.max(scores.bestScore, score) / 10)
    : correctCount;

  useEffect(() => {
    if (savedRef.current) return;
    savedRef.current = true;

    (async () => {
      try {
        const stored = await AsyncStorage.getItem(BEST_SCORE_KEY);
        const prevBest = Number(stored ?? 0);
        if (score > prevBest) setIsNewBest(true);
      } catch {}
      saveRoundResult(score, correctCount);
    })();
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.roundLabel}>Round Complete</Text>

        {/* Donut ring with score inside */}
        <ProgressRing fill={accuracy}>
          <View style={styles.ringInner}>
            <Text style={styles.ringScore}>{correctCount}</Text>
            <Text style={styles.ringTotal}>/ {TOTAL}</Text>
          </View>
        </ProgressRing>

        {/* Performance message */}
        <Text style={[styles.message, { color: messageColor }]}>{message}</Text>
        <Text style={styles.accuracyText}>
          {Math.round(accuracy * 100)}% accuracy · {correctCount} correct of {TOTAL}
        </Text>

        {/* New best badge */}
        {isNewBest && (
          <View style={styles.badge}>
            <Text style={styles.badgeStar}>★</Text>
            <Text style={styles.badgeText}>NEW BEST SCORE!</Text>
          </View>
        )}

        {/* Stat cards */}
        <View style={styles.stats}>
          <StatCard label="Correct" value={correctCount} valueColor={Colors.success} />
          <StatCard label="Wrong" value={wrongCount} valueColor={Colors.error} />
          <StatCard label="Best" value={bestCorrect} />
        </View>
      </View>

      <View style={styles.footer}>
        <Button fullWidth size="lg" onPress={() => router.replace('/game')}>
          Play Again
        </Button>
        <Pressable onPress={() => router.replace('/')} style={styles.homeButton}>
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing[5],
    gap: Spacing[4],
  },
  roundLabel: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    letterSpacing: LetterSpacing.wide,
    textTransform: 'uppercase',
  },
  ringInner: {
    alignItems: 'center',
  },
  ringScore: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize['4xl'],
    color: Colors.textPrimary,
    letterSpacing: LetterSpacing.tight,
    lineHeight: FontSize['4xl'] * 1.1,
  },
  ringTotal: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  message: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize['3xl'],
    letterSpacing: LetterSpacing.tight,
    marginTop: Spacing[1],
  },
  accuracyText: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: -Spacing[2],
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[1.5],
    backgroundColor: Colors.primaryDim,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[1.5],
    borderWidth: 1,
    borderColor: Colors.primaryGlow,
  },
  badgeStar: {
    fontSize: FontSize.sm,
    color: Colors.primaryLight,
  },
  badgeText: {
    fontFamily: FontFamily.bodySemibold,
    fontSize: FontSize.xs,
    color: Colors.primaryLight,
    letterSpacing: LetterSpacing.widest,
  },
  stats: {
    flexDirection: 'row',
    gap: Spacing[3],
    width: '100%',
    marginTop: Spacing[2],
  },
  footer: {
    paddingHorizontal: Spacing[5],
    paddingBottom: Spacing[10],
    paddingTop: Spacing[4],
    gap: Spacing[3],
    alignItems: 'center',
  },
  homeButton: {
    paddingVertical: Spacing[2],
  },
  homeButtonText: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
  },
});
