import { Feather } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS, useSharedValue } from 'react-native-reanimated';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button';
import SwipeHint from '../../components/SwipeHint';
import {
  BorderRadius,
  Colors,
  FontFamily,
  FontSize,
  LetterSpacing,
  Spacing,
} from '../../constants/tokens';

const SWIPE_BACK_THRESHOLD = 80;

export default function HowToPlayScreen() {
  const router = useRouter();
  const startX = useSharedValue(0);

  const pan = Gesture.Pan()
    .activeOffsetX([SWIPE_BACK_THRESHOLD / 2, 9999])
    .failOffsetY([-15, 15])
    .onBegin((e) => {
      startX.value = e.x;
    })
    .onEnd((e) => {
      if (e.translationX >= SWIPE_BACK_THRESHOLD) {
        runOnJS(router.back)();
      }
    });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <GestureDetector gesture={pan}>
        <View style={styles.screen}>
          <Pressable style={styles.closeButton} onPress={() => router.back()} hitSlop={12}>
            <Feather name="x" size={18} color={Colors.textSecondary} />
          </Pressable>

          <ScrollView
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <Text style={styles.title}>How to Play</Text>
              <Text style={styles.subtitle}>20 words. Swipe to decide.</Text>
            </View>

            <View style={[styles.card, styles.section]}>
              <Text style={styles.partOfSpeech}>ADJECTIVE</Text>
              <Text style={styles.word}>BRIEF</Text>
              <View style={styles.divider} />
              <Text style={styles.definition}>Lasting for a short time; of short duration.</Text>
            </View>

            <View style={styles.section}>
              <SwipeHint variant="wrong" style={styles.hintSpacing} />
              <SwipeHint variant="correct" />
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <Button fullWidth size="lg" onPress={() => router.back()}>
              Got it, Let's Play!
            </Button>
          </View>
        </View>
      </GestureDetector>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  closeButton: {
    position: 'absolute',
    top: Spacing[12],
    right: Spacing[5],
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceHigh,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    paddingHorizontal: Spacing[5],
    paddingTop: Spacing[20],
    paddingBottom: Spacing[6],
  },
  section: {
    marginTop: Spacing[5],
  },
  header: {
    gap: Spacing[1.5],
    paddingRight: Spacing[10],
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
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius['2xl'],
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing[5],
    paddingVertical: Spacing[6],
    gap: Spacing[2],
  },
  partOfSpeech: {
    fontFamily: FontFamily.bodySemibold,
    fontSize: FontSize.xs,
    color: Colors.primary,
    letterSpacing: LetterSpacing.widest,
  },
  word: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize['4xl'],
    color: Colors.textPrimary,
    letterSpacing: LetterSpacing.tight,
  },
  divider: {
    height: 1,
    width: 32,
    backgroundColor: Colors.border,
    marginVertical: Spacing[1],
  },
  definition: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    lineHeight: FontSize.base * 1.6,
  },
  hintSpacing: {
    marginBottom: Spacing[3],
  },
  footer: {
    paddingHorizontal: Spacing[5],
    paddingBottom: Spacing[10],
    paddingTop: Spacing[4],
    backgroundColor: Colors.bg,
  },
});
