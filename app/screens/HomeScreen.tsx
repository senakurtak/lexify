import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import StatCard from '../../components/StatCard';
import {
  BorderRadius,
  Colors,
  FontFamily,
  FontSize,
  LetterSpacing,
  Spacing,
} from '../../constants/tokens';
import { useScores } from '../../src/hooks/useScores';

const MAX_SCORE = 200;

function formatScore(score: number, hasPlayed: boolean): string {
  return hasPlayed ? `${score}/${MAX_SCORE}` : '—';
}

export default function HomeScreen() {
  const router = useRouter();
  const { scores } = useScores();
  const hasPlayed = scores.totalRounds > 0;

  return (
    <View style={styles.screen}>
      <View style={styles.hero}>
        <Logo size="lg" variant="icon" />
        <Text style={styles.title}>Lexify</Text>
        <Text style={styles.subtitle}>Swipe to test your vocabulary</Text>
      </View>

      <View style={styles.swipeHint}>
        <View style={styles.hintItem}>
          <View style={[styles.hintIcon, styles.hintIconWrong]}>
            <Feather name="x" size={14} color={Colors.error} />
          </View>
          <Text style={[styles.hintLabel, { color: Colors.error }]}>Left = Wrong</Text>
        </View>

        <View style={styles.hintDivider} />

        <View style={styles.hintItem}>
          <View style={[styles.hintIcon, styles.hintIconCorrect]}>
            <Feather name="check" size={14} color={Colors.success} />
          </View>
          <Text style={[styles.hintLabel, { color: Colors.success }]}>Right = Correct</Text>
        </View>
      </View>

      <View style={styles.stats}>
        <StatCard label="Best Score" value={formatScore(scores.bestScore, hasPlayed)} />
        <StatCard label="Last Score" value={formatScore(scores.lastScore, hasPlayed)} />
      </View>

      <View style={styles.actions}>
        <Button fullWidth onPress={() => router.push('/game')}>
          Start Round
        </Button>
        <Pressable onPress={() => router.push('/how-to-play')} style={styles.howToPlay}>
          <Text style={styles.howToPlayText}>How to Play</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    paddingHorizontal: Spacing[5],
    paddingBottom: Spacing[10],
    justifyContent: 'center',
    gap: Spacing[5],
  },
  hero: {
    alignItems: 'center',
    gap: Spacing[3],
  },
  title: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize['4xl'],
    color: Colors.textPrimary,
    letterSpacing: LetterSpacing.tight,
  },
  subtitle: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  swipeHint: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceAlt,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: Spacing[4],
    paddingHorizontal: Spacing[5],
  },
  hintItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
  },
  hintIcon: {
    width: 24,
    height: 24,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintIconWrong: {
    backgroundColor: Colors.errorDim,
  },
  hintIconCorrect: {
    backgroundColor: Colors.successDim,
  },
  hintLabel: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.sm,
  },
  hintDivider: {
    width: 1,
    height: 20,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing[3],
  },
  stats: {
    flexDirection: 'row',
    gap: Spacing[3],
  },
  actions: {
    gap: Spacing[4],
    alignItems: 'center',
  },
  howToPlay: {
    paddingVertical: Spacing[1],
  },
  howToPlayText: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
});