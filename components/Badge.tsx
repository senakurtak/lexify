import { Feather } from '@expo/vector-icons';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { BorderRadius, Colors, FontFamily, FontSize, LetterSpacing, Spacing } from '../constants/tokens';

type Variant = 'correct' | 'wrong';
type Size = 'default' | 'large';

interface BadgeProps {
  variant: Variant;
  size?: Size;
  style?: StyleProp<ViewStyle>;
}

const config = {
  correct: {
    label: 'CORRECT',
    icon: 'check' as const,
    color: Colors.success,
    background: 'rgba(52, 211, 153, 0.18)',
    border: 'rgba(52, 211, 153, 0.45)',
  },
  wrong: {
    label: 'WRONG',
    icon: 'x' as const,
    color: Colors.error,
    background: 'rgba(248, 113, 113, 0.18)',
    border: 'rgba(248, 113, 113, 0.45)',
  },
} as const;

export default function Badge({ variant, size = 'default', style }: BadgeProps) {
  const { label, icon, color, background, border } = config[variant];
  const large = size === 'large';

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: background,
          borderColor: border,
          paddingHorizontal: large ? Spacing[5] : Spacing[4],
          paddingVertical: large ? Spacing[3] : Spacing[2],
          gap: large ? Spacing[2] : Spacing[1.5],
        },
        style,
      ]}
    >
      <Feather name={icon} size={large ? 22 : 17} color={color} />
      <Text
        style={[
          styles.label,
          {
            color,
            fontSize: large ? FontSize.lg : FontSize.sm,
            letterSpacing: large ? LetterSpacing.widest : LetterSpacing.wider,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
    alignSelf: 'flex-start',
  },
  label: {
    fontFamily: FontFamily.displayBold,
  },
});
