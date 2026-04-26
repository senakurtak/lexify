import { StyleSheet, Text, View } from 'react-native';
import { BorderRadius, Colors, FontFamily, FontSize, LetterSpacing, Spacing } from '../constants/tokens';

interface StatCardProps {
  label: string;
  value: string | number;
  valueColor?: string;
}

export default function StatCard({ label, value, valueColor }: StatCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, valueColor ? { color: valueColor } : undefined]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.surfaceAlt,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing[5],
    paddingVertical: Spacing[5],
    gap: Spacing[2],
  },
  label: {
    fontFamily: FontFamily.bodySemibold,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    letterSpacing: LetterSpacing.widest,
    textTransform: 'uppercase',
  },
  value: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize['3xl'],
    color: Colors.textPrimary,
    letterSpacing: LetterSpacing.tight,
  },
});
