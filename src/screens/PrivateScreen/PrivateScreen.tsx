import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { StoryPage } from '../../components/organisms/StoryPage';
import { privateParagraphs } from '../../data/stories';
import type { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Private'>;

export function PrivateScreen({ navigation }: Props) {
  return (
    <StoryPage
      kicker="Private spaces"
      title="A closed room, when the lounge has one."
      paragraphs={privateParagraphs}>
      <View style={styles.action}>
        <PrimaryButton
          title="Request a visit"
          onPress={() => navigation.navigate('Main', { screen: 'Services' })}
        />
      </View>
    </StoryPage>
  );
}

const styles = StyleSheet.create({
  action: {
    marginTop: 8,
  },
});
