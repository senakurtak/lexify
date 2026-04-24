import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button';
import { Colors, FontFamily, FontSize, Spacing } from '../../constants/tokens';
import type { RootStackScreenProps } from '../../types/navigation';

export default function HomeScreen(_props: RootStackScreenProps<'Home'>) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Button Component</Text>

      <Text style={styles.sectionLabel}>Primary — sizes</Text>
      <View style={styles.row}>
        <Button variant="primary" size="sm" onPress={() => console.log('Clicked — variant: primary, size: sm')}>Small</Button>
        <Button variant="primary" size="md" onPress={() => console.log('Clicked — variant: primary, size: md')}>Medium</Button>
        <Button variant="primary" size="lg" onPress={() => console.log('Clicked — variant: primary, size: lg')}>Large</Button>
      </View>

      <Text style={styles.sectionLabel}>Ghost — sizes</Text>
      <View style={styles.row}>
        <Button variant="ghost" size="sm" onPress={() => console.log('Clicked — variant: ghost, size: sm')}>Small</Button>
        <Button variant="ghost" size="md" onPress={() => console.log('Clicked — variant: ghost, size: md')}>Medium</Button>
        <Button variant="ghost" size="lg" onPress={() => console.log('Clicked — variant: ghost, size: lg')}>Large</Button>
      </View>

      <Text style={styles.sectionLabel}>Full width</Text>
      <View style={styles.stack}>
        <Button variant="primary" size="md" fullWidth onPress={() => console.log('Clicked — variant: primary, size: md, fullWidth: true')}>Primary Full Width</Button>
        <Button variant="ghost" size="md" fullWidth onPress={() => console.log('Tıklandı — variant: ghost, size: md, fullWidth: true')}>Ghost Full Width</Button>
      </View>

      <Text style={styles.sectionLabel}>Disabled</Text>
      <View style={styles.row}>
        <Button variant="primary" size="md" disabled onPress={() => console.log('Clicked — variant: primary, size: md, disabled: true')}>Disabled</Button>
        <Button variant="ghost" size="md" disabled onPress={() => console.log('Clicked — variant: ghost, size: md, disabled: true')}>Disabled</Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  content: {
    padding: Spacing[5],
    gap: Spacing[3],
  },
  heading: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize['2xl'],
    color: Colors.textPrimary,
    marginBottom: Spacing[3],
  },
  sectionLabel: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing[4],
    marginBottom: Spacing[2],
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing[3],
    alignItems: 'center',
  },
  stack: {
    gap: Spacing[3],
  },
});
