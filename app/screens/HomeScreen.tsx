import { ScrollView, StyleSheet, Text, View } from 'react-native';
import BrandVoice from '../../components/BrandVoice';
import Logo, { LogoDimensions } from '../../components/Logo';
import Tagline from '../../components/Tagline';
import { Colors, FontFamily, FontSize, Spacing } from '../../constants/tokens';

import type { RootStackScreenProps } from '../../types/navigation';

export default function HomeScreen(_props: RootStackScreenProps<'Home'>) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>

      <Text style={styles.sectionLabel}>ICON SIZES</Text>
      <View style={styles.row}>
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <View key={size} style={styles.cell}>
            <Logo variant="icon" size={size} />
            <Text style={styles.meta}>{size.toUpperCase()}</Text>
            <Text style={styles.meta}>{LogoDimensions[size].container}px</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionLabel}>WORDMARK SIZES</Text>
      <View style={styles.stack}>
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <View key={size} style={styles.wordmarkRow}>
            <Logo variant="wordmark" size={size} />
            <Text style={styles.meta}>{size.toUpperCase()}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionLabel}>LOCKUP</Text>
      <View style={styles.lockup}>
        <Logo variant="icon" size="md" />
        <Logo variant="wordmark" size="md" />
      </View>

      <Text style={styles.sectionLabel}>TAGLINE</Text>
      <Tagline />

      <Text style={styles.sectionLabel}>BRAND VOICE</Text>
      <BrandVoice />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  content: {
    padding: Spacing[6],
    gap: Spacing[4],
    paddingBottom: Spacing[12],
  },
  sectionLabel: {
    fontFamily: FontFamily.bodySemibold,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    letterSpacing: 1.2,
    marginTop: Spacing[4],
  },
  row: {
    flexDirection: 'row',
    gap: Spacing[6],
    alignItems: 'flex-end',
  },
  cell: {
    alignItems: 'center',
    gap: Spacing[2],
  },
  stack: {
    gap: Spacing[4],
  },
  wordmarkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[4],
  },
  lockup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
  },
  meta: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },

});
