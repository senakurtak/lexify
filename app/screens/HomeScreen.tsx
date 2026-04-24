import { StyleSheet, Text, View } from 'react-native';
import Badge from '../../components/Badge';
import { Colors, FontFamily, FontSize, LetterSpacing, Spacing } from '../../constants/tokens';
import type { RootStackScreenProps } from '../../types/navigation';

export default function HomeScreen(_props: RootStackScreenProps<'Home'>) {
  return (
    <View style={styles.container}>
      <Section label="DEFAULT">
        <Badge variant="correct" />
        <Badge variant="wrong" />
      </Section>

      <Section label="LARGE">
        <Badge variant="correct" size="large" />
        <Badge variant="wrong" size="large" />
      </Section>
    </View>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>{label}</Text>
      <View style={styles.row}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: 'center',
    paddingHorizontal: Spacing[6],
    gap: Spacing[8],
  },
  section: {
    gap: Spacing[3],
  },
  sectionLabel: {
    fontFamily: FontFamily.bodySemibold,
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    letterSpacing: LetterSpacing.widest,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing[4],
    flexWrap: 'wrap',
  },
});
