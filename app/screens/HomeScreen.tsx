import { StyleSheet, View } from 'react-native';
import SwipeCard from '../../components/SwipeCard';
import { Colors, Spacing } from '../../constants/tokens';
import type { RootStackScreenProps } from '../../types/navigation';

const PREVIEW_WORD = {
  word: 'enigmatic',
  partOfSpeech: 'adjective' as const,
  definition: 'Difficult to interpret or understand; mysterious.',
};

export default function HomeScreen({ navigation }: RootStackScreenProps<'Home'>) {
  return (
    <View style={styles.screen}>
      <SwipeCard
        word={PREVIEW_WORD.word}
        partOfSpeech={PREVIEW_WORD.partOfSpeech}
        definition={PREVIEW_WORD.definition}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    paddingHorizontal: Spacing[5],
    justifyContent: 'center',
  },
});
