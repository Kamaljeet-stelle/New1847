import { useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BackArrow } from '../../components/atoms/BackArrow';
import { PageHeading } from '../../components/molecules/PageHeading';
import { RecordCard } from '../../components/molecules/RecordCard';
import { ScreenScaffold } from '../../components/organisms/ScreenScaffold';
import { useBooking } from '../../hooks/useBooking';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import type { RootStackParamList } from '../../types/navigation';
import { requestRows, type RequestRow } from './data';

type Props = NativeStackScreenProps<RootStackParamList, 'Requests'>;

export function RequestsScreen({ navigation }: Props) {
  const { bookings, inquiries } = useBooking();
  const rows = useMemo(
    () => requestRows(bookings, inquiries),
    [bookings, inquiries],
  );

  const renderItem = useCallback(({ item }: { item: RequestRow }) => {
    return (
      <RecordCard title={item.title} meta={item.meta} subtitle={item.subtitle} />
    );
  }, []);

  return (
    <ScreenScaffold>
      <FlatList
        data={rows}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <>
            <BackArrow onPress={() => navigation.goBack()} />
            <PageHeading
              kicker="Requests"
              title="Saved on this phone."
              subtitle="Nothing here has been sent to a server."
            />
          </>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>No requests yet.</Text>
        }
        contentContainerStyle={styles.list}
        initialNumToRender={10}
        windowSize={5}
      />
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 24,
    flexGrow: 1,
  },
  empty: {
    ...typography.body,
    color: colors.muted,
  },
});
