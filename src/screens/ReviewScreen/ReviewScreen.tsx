import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import Toast from 'react-native-toast-message';
import { TextField } from '../../components/atoms/TextField';
import { EmptyState } from '../../components/molecules/EmptyState';
import { PriceSummary } from '../../components/molecules/PriceSummary';
import { ServiceSummary } from '../../components/molecules/ServiceSummary';
import { BookingDock, useBookingDockSpace } from '../../components/organisms/BookingDock';
import { ScreenScaffold } from '../../components/organisms/ScreenScaffold';
import { StackHeader } from '../../components/organisms/StackHeader';
import { priceLabel } from '../../data/bookingOptions';
import { serviceImages } from '../../data/serviceImages';
import { useBooking } from '../../hooks/useBooking';
import { hasErrors, serviceLines, validateBooking } from '../../services/booking.services';
import { getLounge, getService } from '../../services/catalog.services';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import type { BookingDraft, BookingErrors } from '../../types/catalog';
import type { RootStackParamList } from '../../types/navigation';
import { formatClock, formatVisitDate } from '../../utils/dates';

type Props = NativeStackScreenProps<RootStackParamList, 'Review'>;

type ContactKey = 'name' | 'email' | 'phone';

export function ReviewScreen({ navigation }: Props) {
  const { draft, updateDraft, saveBooking } = useBooking();
  const dockSpace = useBookingDockSpace();
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<BookingErrors>({});
  const service = getService(draft.serviceId);
  const lounge = getLounge(draft.loungeId);

  if (!service || !lounge || !draft.time) {
    return (
      <ScreenScaffold>
        <StackHeader title="Review" onBack={() => navigation.goBack()} />
        <EmptyState
          title="Nothing to review yet"
          body="Pick a service and a time first."
          action="Browse services"
          onAction={() => navigation.navigate('Main', { screen: 'Services' })}
        />
      </ScreenScaffold>
    );
  }

  const change = (key: ContactKey | 'note', value: string) => {
    updateDraft({ [key]: value } as Partial<BookingDraft>);
    if (key !== 'note') {
      setErrors(current => ({ ...current, [key]: undefined }));
    }
  };

  const submit = () => {
    const nextErrors = validateBooking(draft);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      const visitError =
        nextErrors.serviceId ||
        nextErrors.variantId ||
        nextErrors.staffId ||
        nextErrors.loungeId ||
        nextErrors.date ||
        nextErrors.time;
      Toast.show({
        type: 'error',
        text1: visitError ?? 'Check your details before booking.',
      });
      return;
    }
    const booking = saveBooking();
    navigation.reset({
      index: 1,
      routes: [{ name: 'Main' }, { name: 'Confirm', params: { bookingId: booking.id } }],
    });
  };

  return (
    <ScreenScaffold safeBottom={false}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: dockSpace }}>
        <StackHeader title="Review" onBack={() => navigation.goBack()} />

        <View style={styles.visit}>
          <Text style={styles.visitLabel}>Your visit</Text>
          <Text style={styles.visitTime}>{formatClock(draft.time)}</Text>
          <Text style={styles.visitDate}>{formatVisitDate(draft.date)}</Text>
          <View style={styles.visitRow}>
            <MaterialDesignIcons name="map-marker-outline" size={16} color={colors.copperSoft} />
            <Text style={styles.visitLounge}>
              {lounge.name}, {lounge.city}
            </Text>
          </View>
        </View>

        <Text style={styles.section}>Service</Text>
        <ServiceSummary
          image={serviceImages[service.category]}
          title={service.name}
          lines={serviceLines(draft)}
          price={priceLabel(draft.priceAed)}
        />

        <Text style={styles.section}>Your details</Text>
        <TextField
          label="Full name"
          value={draft.name}
          errorText={errors.name}
          onChangeText={value => change('name', value)}
        />
        <TextField
          label="Email"
          value={draft.email}
          autoCapitalize="none"
          keyboardType="email-address"
          errorText={errors.email}
          onChangeText={value => change('email', value)}
        />
        <TextField
          label="Phone number"
          value={draft.phone}
          keyboardType="phone-pad"
          errorText={errors.phone}
          onChangeText={value => change('phone', value)}
        />
        <TextField
          label="Notes (optional)"
          value={draft.note}
          multiline
          placeholder="Private room, preferred chair, anything the lounge should know"
          onChangeText={value => change('note', value)}
          style={styles.note}
        />

        <Text style={styles.section}>Payment summary</Text>
        <PriceSummary priceAed={draft.priceAed} />

        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: agreed }}
          onPress={() => setAgreed(current => !current)}
          style={styles.terms}>
          <MaterialDesignIcons
            name={agreed ? 'checkbox-marked' : 'checkbox-blank-outline'}
            size={22}
            color={agreed ? colors.copper : colors.muted}
          />
          <Text style={styles.termsText}>
            I agree to the{' '}
            <Text style={styles.link} onPress={() => navigation.navigate('Terms')}>
              Terms & Conditions
            </Text>
          </Text>
        </Pressable>
        <Text style={styles.fine}>
          Final price may change after consultation. You pay at the lounge.
        </Text>
      </ScrollView>

      <BookingDock
        title={priceLabel(draft.priceAed)}
        caption="Pay in lounge"
        actionTitle="Book reservation"
        disabled={!agreed}
        onAction={submit}
      />
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  visit: {
    padding: 18,
    borderRadius: 20,
    backgroundColor: colors.ink,
  },
  visitLabel: {
    ...typography.label,
    color: colors.copper,
  },
  visitTime: {
    ...typography.hero,
    color: colors.parchment,
    marginTop: 8,
  },
  visitDate: {
    ...typography.body,
    color: colors.copperSoft,
  },
  visitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(246, 241, 232, 0.25)',
  },
  visitLounge: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.parchment,
  },
  section: {
    ...typography.label,
    color: colors.muted,
    marginTop: 24,
    marginBottom: 10,
  },
  note: {
    minHeight: 84,
    textAlignVertical: 'top',
  },
  terms: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
  },
  termsText: {
    ...typography.body,
    fontSize: 15,
    color: colors.ink,
    flex: 1,
  },
  link: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  fine: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 10,
  },
});
