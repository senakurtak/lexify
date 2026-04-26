import { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
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

const MAX_SCORE = 200;

export default function ResultScreen() {
  const router = useRouter();
  const { score: scoreParam, history: historyParam } = useLocalSearchParams<{
    score: string;
    history: string;
  }>();
  const { saveRoundResult } = useScores();
  const savedRef = useRef(false);

  const score = Number(scoreParam ?? 0);
  const history: AnswerRecord[] = historyParam ? JSON.parse(historyParam as string) : [];
  const correctCount = history.filter((r) => r.answeredCorrectly).length;

  useEffect(() => {
    if (savedRef.current) return;
    savedRef.current = true;
    saveRoundResult(score, correctCount);
  }, []);

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.heroLabel}>Round Complete</Text>
          <Text style={styles.heroScore}>{score}</Text>
          <Text style={styles.heroMax}>/ {MAX_SCORE}</Text>
        </View>

        <View style={styles.stats}>
          <StatCard label="Correct" value={`${correctCount} / ${history.length}`} />
          <StatCard
            label="Accuracy"
            value={
              history.length ? `${Math.round((correctCount / history.length) * 100)}%` : '—'
            }
          />
        </View>

        {history.length > 0 && (
          <View style={styles.review}>
            <Text style={styles.reviewTitle}>Review</Text>
            {history.map((record, i) => (
              <View
                key={i}
                style={[
                  styles.reviewItem,
                  record.answeredCorrectly ? styles.reviewItemCorrect : styles.reviewItemWrong,
                ]}
              >
                <View style={styles.reviewItemRow}>
                  <Text style={styles.reviewWord}>{record.word.word.toUpperCase()}</Text>
                  <Text
                    style={[
                      styles.reviewResult,
                      { color: record.answeredCorrectly ? Colors.success : Colors.error },
                    ]}
                  >
                    {record.answeredCorrectly ? 'Correct' : 'Wrong'}
                  </Text>
                </View>
                <Text style={styles.reviewDef}>{record.displayDefinition}</Text>
                {!record.isMatch && (
                  <Text style={styles.reviewMismatch}>Definition did not match</Text>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button fullWidth size="lg" onPress={() => router.replace('/game')}>
          Play Again
        </Button>
        <Button fullWidth size="lg" variant="ghost" onPress={() => router.replace('/')}>
          Home
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  scroll: {
    paddingHorizontal: Spacing[5],
    paddingTop: Spacing[16],
    paddingBottom: Spacing[6],
    gap: Spacing[5],
  },
  hero: {
    alignItems: 'center',
    gap: Spacing[1],
  },
  heroLabel: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    letterSpacing: LetterSpacing.wide,
    textTransform: 'uppercase',
  },
  heroScore: {
    fontFamily: FontFamily.displayBold,
    fontSize: 72,
    color: Colors.textPrimary,
    letterSpacing: LetterSpacing.tight,
    lineHeight: 80,
  },
  heroMax: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.lg,
    color: Colors.textSecondary,
  },
  stats: {
    flexDirection: 'row',
    gap: Spacing[3],
  },
  review: {
    gap: Spacing[3],
  },
  reviewTitle: {
    fontFamily: FontFamily.displaySemibold,
    fontSize: FontSize['2xl'],
    color: Colors.textPrimary,
    letterSpacing: LetterSpacing.tight,
  },
  reviewItem: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[4],
    gap: Spacing[1],
  },
  reviewItemCorrect: {
    backgroundColor: Colors.successDim,
    borderColor: 'rgba(52, 211, 153, 0.25)',
  },
  reviewItemWrong: {
    backgroundColor: Colors.errorDim,
    borderColor: 'rgba(248, 113, 113, 0.25)',
  },
  reviewItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewWord: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
    letterSpacing: LetterSpacing.wide,
  },
  reviewResult: {
    fontFamily: FontFamily.bodySemibold,
    fontSize: FontSize.sm,
  },
  reviewDef: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: FontSize.sm * 1.5,
  },
  reviewMismatch: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.xs,
    color: Colors.error,
    marginTop: Spacing[1],
  },
  footer: {
    paddingHorizontal: Spacing[5],
    paddingBottom: Spacing[10],
    paddingTop: Spacing[4],
    backgroundColor: Colors.bg,
    gap: Spacing[3],
  },
});
