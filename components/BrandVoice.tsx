import { StyleSheet, Text, View } from 'react-native';
import { BorderRadius, Colors, FontFamily, FontSize, Spacing } from '../constants/tokens';

interface BrandVoiceProps {
  words?: string[];
}

export default function BrandVoice({
  words = ['Fast', 'Playful', 'Clean', 'Rewarding', 'Modern'],
}: BrandVoiceProps) {
  return (
    <View style={styles.row}>
      {words.map((word) => (
        <View key={word} style={styles.pill}>
          <Text style={styles.label}>{word}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing[3],
  },
  pill: {
    backgroundColor: Colors.surfaceAlt,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing[5],
    paddingVertical: Spacing[3],
  },
  label: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
  },
});
