import { StyleSheet, Text, View } from 'react-native';
import { Colors, FontFamily, FontSize } from '../constants/tokens';

interface TaglineProps {
  line1?: string;
  line2?: string;
}

export default function Tagline({
  line1 = 'Swipe right for correct.',
  line2 = 'Build your vocabulary.',
}: TaglineProps) {
  return (
    <View>
      <Text style={styles.line1}>{line1}</Text>
      <Text style={styles.line2}>{line2}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  line1: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize['3xl'],
    color: Colors.textPrimary,
    lineHeight: FontSize['3xl'] * 1.25,
  },
  line2: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize['3xl'],
    color: Colors.primary,
    lineHeight: FontSize['3xl'] * 1.25,
  },
});
