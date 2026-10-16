import { Linking, StyleSheet, View } from 'react-native';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { StoryPage } from '../../components/organisms/StoryPage';

const paragraphs = [
  'Visits, gift cards, and cancellations follow the terms published by 1847. A time you request here is held on the device and still has to be confirmed by the lounge.',
  'Prices shown in the public price list are confirmed at checkout. A private room, a named barber, or a walk-in depends on the lounge that day.',
  'Read the current terms on the website before you rely on them. This page keeps the type large enough to read and leaves the legal text at its source.',
];

export function TermsScreen() {
  return (
    <StoryPage kicker="Legal" title="Terms & Conditions" paragraphs={paragraphs}>
      <View style={styles.action}>
        <PrimaryButton
          title="Open the full terms"
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
