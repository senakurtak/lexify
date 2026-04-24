import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { BorderRadius, Colors, FontFamily, FontSize } from '../constants/tokens';

export type LogoSize = 'sm' | 'md' | 'lg';
export type LogoVariant = 'icon' | 'wordmark';

export const LogoDimensions = {
  sm: { container: 36, borderRadius: 9,  lineWidth: 9,  lineHeight: 2,   lineGap: 3, arrowSize: 13, innerGap: 3 },
  md: { container: 56, borderRadius: 14, lineWidth: 14, lineHeight: 2.5, lineGap: 4, arrowSize: 20, innerGap: 4 },
  lg: { container: 80, borderRadius: 20, lineWidth: 20, lineHeight: 3,   lineGap: 6, arrowSize: 28, innerGap: 6 },
} as const;

const wordmarkFontSize: Record<LogoSize, number> = {
  sm: FontSize.xl,
  md: FontSize['2xl'],
  lg: FontSize['4xl'],
};

interface LogoProps {
  size?: LogoSize;
  variant?: LogoVariant;
}

export default function Logo({ size = 'md', variant = 'icon' }: LogoProps) {
  const dims = LogoDimensions[size];

  if (variant === 'wordmark') {
    return (
      <Text style={[styles.wordmark, { fontSize: wordmarkFontSize[size] }]}>
        Lexify
      </Text>
    );
  }

  const cardWidth  = dims.container * 0.80;
  const cardHeight = dims.container * 0.58;
  const cardRadius = dims.borderRadius * 0.50;
  const cardPadH   = dims.container * 0.07;

  return (
    <View
      style={[
        styles.iconContainer,
        { width: dims.container, height: dims.container, borderRadius: dims.borderRadius },
      ]}
    >
      <View
        style={[
          styles.card,
          {
            width: cardWidth,
            height: cardHeight,
            borderRadius: cardRadius,
            paddingHorizontal: cardPadH,
          },
        ]}
      >
        <View style={[styles.iconInner, { gap: dims.innerGap }]}>
          <View style={styles.lines}>
            <View style={[styles.line, { width: dims.lineWidth, height: dims.lineHeight }]} />
            <View style={[styles.line, { width: dims.lineWidth * 0.6, height: dims.lineHeight, marginTop: dims.lineGap, opacity: 0.35 }]} />
          </View>
          <Feather name="arrow-right" size={dims.arrowSize} color={Colors.white} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lines: {
    justifyContent: 'center',
  },
  line: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.full,
    opacity: 0.9,
  },
  wordmark: {
    fontFamily: FontFamily.displayBold,
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
});
