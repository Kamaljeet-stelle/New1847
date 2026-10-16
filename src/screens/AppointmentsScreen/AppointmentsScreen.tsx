import { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { FilterChips } from '../../components/molecules/FilterChips';
import { RecordCard } from '../../components/molecules/RecordCard';
import { ScreenScaffold } from '../../components/organisms/ScreenScaffold';
import { StackHeader } from '../../components/organisms/StackHeader';
import { useBooking } from '../../hooks/useBooking';
import { getLounge, getService } from '../../services/catalog.services';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import type { Booking } from '../../types/catalog';
import type { RootStackParamList } from '../../types/navigation';
import { formatClock, formatVisitDate, todayIso } from '../../utils/dates';
import { splitVisits } from './data';

type Props = NativeStackScreenProps<RootStackParamList, 'Appointments'>;
type Scope = 'upcoming' | 'past';

const scopes: { id: Scope; label: string }[] = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'past', label: 'Past' },
];

export function AppointmentsScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { bookings } = useBooking();
  const [scope, setScope] = useState<Scope>('upcoming');
  const visits = useMemo(() => splitVisits(bookings, todayIso()), [bookings]);
  const data = visits[scope];
  const footer = Math.max(insets.bottom, 12);

  const renderItem = useCallback(({ item }: { item: Booking }) => {
    const service = getService(item.serviceId);
    const lounge = getLounge(item.loungeId);
    return (
      <RecordCard
        title={service?.name ?? 'Visit'}
        meta={`${formatVisitDate(item.date)} · ${formatClock(item.time)}`}
        subtitle={`${lounge?.name ?? 'Lounge'} · ${item.staffName || item.name}`}
        badge={scope === 'upcoming' ? 'Booked' : 'Past'}
      />
    );
  }, [scope]);

  return (
    <ScreenScaffold safeBottom={false}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <View>
            <StackHeader title="Appointments" onBack={() => navigation.goBack()} />
            <FilterChips options={scopes} value={scope} onChange={setScope} />
            <View style={styles.gap} />
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <MaterialDesignIcons name="calendar-month-outline" size={28} color={colors.copper} />
            </View>
            <Text style={styles.emptyText}>
              {scope === 'upcoming'
                ? 'No appointments scheduled. Book one now!'
                : 'No past appointments yet.'}
            </Text>
          </View>
        }
        contentContainerStyle={[styles.list, { paddingBottom: footer + 84 }]}
        initialNumToRender={8}
        windowSize={5}
      />
      <View style={[styles.footer, { paddingBottom: footer }]}>
        <PrimaryButton
          title="Book reservation"
          onPress={() => navigation.navigate('Lounges', { purpose: 'book' })}
        />
      </View>
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  gap: {
    height: 14,
  },
  list: {
    flexGrow: 1,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.copperSoft,
    marginBottom: 16,
  },
  emptyText: {
    ...typography.body,
    color: colors.muted,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 12,
    backgroundColor: colors.parchment,
    marginHorizontal: 16,
  },
});
