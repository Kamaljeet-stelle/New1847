import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import { EmptyState } from '../../components/molecules/EmptyState';
import { ServiceSummary } from '../../components/molecules/ServiceSummary';
import { BookingDock, useBookingDockSpace } from '../../components/organisms/BookingDock';
import { ScreenScaffold } from '../../components/organisms/ScreenScaffold';
import { StackHeader } from '../../components/organisms/StackHeader';
import { priceLabel } from '../../data/bookingOptions';
import { serviceImages } from '../../data/serviceImages';
import { useBooking } from '../../hooks/useBooking';
import { contactFromProfile, serviceLines } from '../../services/booking.services';
import { getLounge, getService } from '../../services/catalog.services';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import type { RootStackParamList } from '../../types/navigation';
import { daySlots, formatClock, formatVisitDate, upcomingDates } from '../../utils/dates';
import { DayStrip, SlotGrid } from './components';

type Props = NativeStackScreenProps<RootStackParamList, 'Schedule'>;

export function ScheduleScreen({ navigation }: Props) {
  const { draft, updateDraft, profile } = useBooking();
  const dockSpace = useBookingDockSpace();
  const days = useMemo(() => upcomingDates(), []);
  const date = days.some(day => day.id === draft.date) ? draft.date : days[0].id;
  const sections = useMemo(() => daySlots(date), [date]);
  const time = sections.some(section => section.slots.includes(draft.time))
    ? draft.time
    : '';
  const service = getService(draft.serviceId);
  const lounge = getLounge(draft.loungeId);
  const month = days.find(day => day.id === date)?.month;

  if (!service || !lounge) {
    return (
      <ScreenScaffold>
        <StackHeader title="Date & time" onBack={() => navigation.goBack()} />
        <EmptyState
          title="Pick a service first"
          body="Choose a service and therapist, then come back for a time."
          action="Browse services"
          onAction={() => navigation.navigate('Main', { screen: 'Services' })}
        />
      </ScreenScaffold>
    );
  }

  return (
    <ScreenScaffold safeBottom={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: dockSpace }}>
        <StackHeader title="Date & time" onBack={() => navigation.goBack()} />
        <View style={styles.lounge}>
          <MaterialDesignIcons name="map-marker-outline" size={16} color={colors.copper} />
          <Text style={styles.loungeText}>
            {lounge.name}, {lounge.city}
          </Text>
        </View>
        <ServiceSummary
          image={serviceImages[service.category]}
          title={service.name}
          lines={serviceLines(draft)}
          price={priceLabel(draft.priceAed)}
        />
        <Text style={styles.month}>{month}</Text>
        <DayStrip
          days={days}
          value={date}
          onChange={id => updateDraft({ date: id, time: '' })}
        />
        <SlotGrid
          sections={sections}
          value={time}
          onChange={slot => updateDraft({ date, time: slot })}
        />
      </ScrollView>

      <BookingDock
        title={time ? formatClock(time) : 'Pick a time'}
        caption={formatVisitDate(date)}
        actionTitle="Review"
        disabled={!time}
        onAction={() => {
          updateDraft({ date, time, ...contactFromProfile(draft, profile) });
          navigation.navigate('Review');
        }}
      />
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  lounge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
  },
  loungeText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.ink,
  },
  month: {
    ...typography.label,
    color: colors.muted,
    marginTop: 24,
    marginBottom: 10,
  },
});
