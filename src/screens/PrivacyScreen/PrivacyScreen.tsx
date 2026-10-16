import { Linking, StyleSheet, View } from 'react-native';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { StoryPage } from '../../components/organisms/StoryPage';

const paragraphs = [
  '1847 for Men describes, on its website, how information collected through the site and the app is used. This screen is a readable place to reach that policy. It is not a copy of the legal document.',
  'The policy covers information you give when you book, visit, or write to the lounges. It does not replace advice about a payment network or a device setting.',
  'Requests you make in this companion stay on the phone until you delete them. They are not the same store of data as the public website.',
];

export function PrivacyScreen() {
  return (
    <StoryPage kicker="Legal" title="Privacy Policy" paragraphs={paragraphs}>
      <View style={styles.action}>
        <PrimaryButton
          title="Open the full policy"
          onPress={() => Linking.openURL('https://1847formen.com/')}
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
