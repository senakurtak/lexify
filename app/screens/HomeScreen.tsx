import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../../components/Button';
import ProgressBar from '../../components/ProgressBar';
import { Colors, Spacing } from '../../constants/tokens';
import type { RootStackScreenProps } from '../../types/navigation';

const TOTAL = 20;

export default function HomeScreen(_props: RootStackScreenProps<'Home'>) {
  const [current, setCurrent] = useState(0);

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <ProgressBar current={current} total={TOTAL} />
      </View>
      <View style={styles.buttons}>
        <Button
          variant="ghost"
          size="sm"
          onPress={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
        >
          Back
        </Button>
        <Button
          size="sm"
          onPress={() => setCurrent((c) => Math.min(TOTAL, c + 1))}
          disabled={current === TOTAL}
        >
          Next
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: 'center',
    padding: Spacing[6],
    gap: Spacing[6],
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: Spacing[6],
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing[3],
  },
});
