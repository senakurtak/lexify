import { Pressable, StyleSheet, Text } from 'react-native';
import { BorderRadius, Colors, FontFamily, FontSize, Spacing } from '../constants/tokens';

type Variant = 'primary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onPress,
  disabled = false,
  children,
}: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.base,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
      ]}
    >
      <Text style={[styles.label, styles[`label_${size}`], variant === 'ghost' && styles.labelGhost]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.lg,
    alignSelf: 'flex-start',
  },

  primary: {
    backgroundColor: Colors.primary,
  },
  ghost: {
    backgroundColor: Colors.transparent,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },

  sm: {
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[1.5],
    minWidth: 72,
  },
  md: {
    paddingHorizontal: Spacing[5],
    paddingVertical: Spacing[3],
    minWidth: 112,
  },
  lg: {
    paddingHorizontal: Spacing[6],
    paddingVertical: Spacing[4],
    minWidth: 160,
  },

  fullWidth: {
    alignSelf: 'stretch',
  },

  disabled: {
    opacity: 0.4,
  },

  label: {
    color: Colors.textPrimary,
    fontFamily: FontFamily.bodySemibold,
  },
  label_sm: {
    fontSize: FontSize.sm,
  },
  label_md: {
    fontSize: FontSize.base,
  },
  label_lg: {
    fontSize: FontSize.lg,
  },
  labelGhost: {
    color: Colors.primary,
  },
});
