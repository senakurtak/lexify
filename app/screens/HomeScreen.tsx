import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import TimerBar from '../../components/TimerBar';
import { Colors, FontFamily, FontSize, Spacing } from '../../constants/tokens';
import type { RootStackScreenProps } from '../../types/navigation';

export default function HomeScreen({ navigation }: RootStackScreenProps<'Home'>) {
  const [running, setRunning] = useState(false);

  return (
    <View style={styles.screen}>
      <TimerBar
        duration={15000}
        running={running}
        onExpire={() => setRunning(false)}
      />
      <Pressable style={styles.button} onPress={() => setRunning((r) => !r)}>
        <Text style={styles.buttonText}>{running ? 'Stop' : 'Start'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    paddingHorizontal: Spacing[5],
    justifyContent: 'center',
    gap: Spacing[6],
  },
  button: {
    alignSelf: 'center',
    paddingVertical: Spacing[3],
    paddingHorizontal: Spacing[6],
    backgroundColor: Colors.primary,
    borderRadius: 999,
  },
  buttonText: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.base,
    color: Colors.white,
  },
});
