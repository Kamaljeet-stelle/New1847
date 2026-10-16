import { StyleSheet, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { BackArrow } from '../../components/atoms/BackArrow';
import { ScreenScaffold } from '../../components/organisms/ScreenScaffold';
import { categoryLabels } from '../../types/catalog';
import { getService, serviceMeta } from '../../services/catalog.services';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import type { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'ServiceDetail'>;

export function ServiceDetailScreen({ navigation, route }: Props) {
  const service = getService(route.params.serviceId);

  if (!service) {
    return (
      <ScreenScaffold scroll>
        <BackArrow onPress={() => navigation.goBack()} />
        <Text style={styles.title}>This service is not on the list.</Text>
      </ScreenScaffold>
    );
  }

  return (
    <ScreenScaffold scroll>
      <BackArrow onPress={() => navigation.goBack()} />
      <Text style={styles.kicker}>{categoryLabels[service.category]}</Text>
      <Text style={styles.title}>{service.name}</Text>
      <Text style={styles.meta}>{serviceMeta(service)}</Text>
      <Text style={styles.body}>{service.summary}</Text>
      <Text style={styles.note}>
        Timing and price are confirmed by the lounge. The public price list
        lives on 1847formen.com; this screen keeps the menu, not a guessed
        figure.
      </Text>
      <PrimaryButton
        title="Book this service"
        onPress={() =>
          navigation.navigate('ServiceMenu', {
            category: service.category,
            serviceId: service.id,
          })
        }
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
  },
  meta: {
    ...typography.caption,
    color: colors.sage,
    marginTop: 10,
  },
  body: {
    ...typography.body,
    color: colors.ink,
    marginTop: 18,
  },
  note: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 18,
    marginBottom: 20,
  },
});
