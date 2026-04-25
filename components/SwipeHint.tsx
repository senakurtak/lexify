import { Feather } from '@expo/vector-icons';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { BorderRadius, Colors, FontFamily, FontSize, LetterSpacing, Spacing } from '../constants/tokens';

type Variant = 'correct' | 'wrong';

interface SwipeHintProps {
  variant: Variant;
  style?: StyleProp<ViewStyle>;
}

const config = {
  correct: {
    title: 'Swipe RIGHT',
    description: 'Definition MATCHES the word',
    direction: 'RIGHT →',
    icon: 'check' as const,
    color: Colors.success,
    background: 'rgba(52, 211, 153, 0.12)',
    border: 'rgba(52, 211, 153, 0)',
    iconBackground: 'rgba(52, 211, 153, 0.18)',
    iconBorder: 'rgba(52, 211, 153, 0)',
  },
  wrong: {
    title: 'Swipe LEFT',
    description: 'Definition does NOT match the word',
    direction: '← LEFT',
    icon: 'x' as const,
    color: Colors.error,
    background: 'rgba(248, 113, 113, 0.12)',
    border: 'rgba(248, 113, 113, 0)',
    iconBackground: 'rgba(248, 113, 113, 0.18)',
    iconBorder: 'rgba(248, 113, 113, 0)',
  },
} as const;

export default function SwipeHint({ variant, style }: SwipeHintProps) {
  const { title, description, direction, icon, color, background, border, iconBackground, iconBorder } = config[variant];

  return (
    <View style={[styles.container, { backgroundColor: background, borderColor: border }, style]}>
      <View style={[styles.iconWrapper, { backgroundColor: iconBackground, borderColor: iconBorder }]}>
        <Feather name={icon} size={20} color={color} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: Colors.textPrimary }]}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Text style={[styles.direction, { color }]}>{direction}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[4],
    gap: Spacing[3],
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    gap: Spacing[1],
  },
  title: {
    fontFamily: FontFamily.displaySemibold,
    fontSize: FontSize.base,
  },
  description: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  direction: {
    fontFamily: FontFamily.displaySemibold,
    fontSize: FontSize.sm,
    letterSpacing: LetterSpacing.wide,
  },
});
