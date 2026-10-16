import { Linking, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { BackArrow } from '../../components/atoms/BackArrow';
import { TextButton } from '../../components/atoms/TextButton';
import { ScreenScaffold } from '../../components/organisms/ScreenScaffold';
import { useBooking } from '../../hooks/useBooking';
import { getLounge } from '../../services/catalog.services';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import type { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'LoungeDetail'>;

export function LoungeDetailScreen({ navigation, route }: Props) {
  const { setSelectedLounge } = useBooking();
  const lounge = getLounge(route.params.loungeId);

  if (!lounge) {
    return (
      <ScreenScaffold scroll>
        <BackArrow onPress={() => navigation.goBack()} />
        <Text style={styles.title}>This lounge is not on the list.</Text>
      </ScreenScaffold>
    );
  }

  return (
    <ScreenScaffold scroll>
      <BackArrow onPress={() => navigation.goBack()} />
      <Text style={styles.kicker}>{lounge.city}</Text>
      <Text style={styles.title}>{lounge.name}</Text>
      <View style={styles.block}>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.body}>{lounge.address}</Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.label}>Hours</Text>
        <Text style={styles.body}>{lounge.hours}</Text>
      </View>
      <TextButton
        title={lounge.phone}
        onPress={() => Linking.openURL(`tel:${lounge.phone}`)}
      />
      <View style={styles.mail}>
        <TextButton
          title={lounge.email}
          onPress={() => Linking.openURL(`mailto:${lounge.email}`)}
        />
      </View>
      <Text style={styles.note}>
        Private rooms exist in selected lounges. Ask for one in the booking
        note if you want the visit off the main floor.
      </Text>
      <PrimaryButton
        title="Book this lounge"
        onPress={() => {
          setSelectedLounge(lounge.id);
          navigation.navigate('Main', { screen: 'Services' });
        }}
      />
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  kicker: {
    ...typography.label,
    color: colors.copper,
    marginTop: 18,
  },
  title: {
    ...typography.screenTitle,
    color: colors.ink,
    marginTop: 8,
    marginBottom: 8,
  },
  block: {
    marginTop: 16,
  },
  label: {
    ...typography.label,
    color: colors.muted,
    marginBottom: 6,
  },
  body: {
    ...typography.body,
    color: colors.ink,
  },
  mail: {
    marginTop: 12,
  },
  note: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 22,
    marginBottom: 18,
  },
});
