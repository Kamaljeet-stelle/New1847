import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { StoryPage } from '../../components/organisms/StoryPage';
import { aboutParagraphs } from '../../data/stories';
import type { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'About'>;

export function AboutScreen({ navigation }: Props) {
  return (
    <StoryPage
      kicker="About"
      title="Executive grooming for men."
      paragraphs={aboutParagraphs}>
      <View style={styles.action}>
        <PrimaryButton
          title="See the lounges"
          onPress={() => navigation.navigate('Lounges', { purpose: 'browse' })}
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
