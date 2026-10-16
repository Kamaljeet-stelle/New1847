import { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import { FilterChips } from '../../components/molecules/FilterChips';
import { BookingDock, useBookingDockSpace } from '../../components/organisms/BookingDock';
import { ScreenScaffold } from '../../components/organisms/ScreenScaffold';
import { StackHeader } from '../../components/organisms/StackHeader';
import { emptyChoice, priceLabel, type ServiceChoice } from '../../data/bookingOptions';
import { serviceImages } from '../../data/serviceImages';
import { useBooking } from '../../hooks/useBooking';
import {
  filterServices,
  getLounge,
  getService,
  groupsFor,
} from '../../services/catalog.services';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import type { Service, ServiceCategory } from '../../types/catalog';
import type { RootStackParamList } from '../../types/navigation';
import { CategoryTabs, ServiceRow, ServiceSheet } from './components';

type Props = NativeStackScreenProps<RootStackParamList, 'ServiceMenu'>;

export function ServiceMenuScreen({ navigation, route }: Props) {
  const { draft, updateDraft, selectedLoungeId } = useBooking();
  const dockSpace = useBookingDockSpace();
  const lounge = getLounge(selectedLoungeId);
  const added = getService(draft.serviceId);
  const [category, setCategory] = useState<ServiceCategory>(route.params.category);
  const [group, setGroup] = useState('All');
  const [sheetService, setSheetService] = useState(() =>
    getService(route.params.serviceId ?? ''),
  );

  const groups = useMemo(
    () => groupsFor(category).map(name => ({ id: name, label: name })),
    [category],
  );
  const data = useMemo(
    () =>
      filterServices(category).filter(
        service => group === 'All' || service.group === group,
      ),
    [category, group],
  );

  const changeCategory = (next: ServiceCategory) => {
    setCategory(next);
    setGroup('All');
  };

  const confirm = (choice: ServiceChoice) => {
    updateDraft({ ...choice, loungeId: selectedLoungeId });
    setSheetService(undefined);
  };

  const remove = useCallback(() => updateDraft(emptyChoice), [updateDraft]);

  const renderItem = useCallback(
    ({ item }: { item: Service }) => (
      <ServiceRow
        service={item}
        image={serviceImages[item.category]}
        added={draft.serviceId === item.id}
        onOpen={setSheetService}
        onRemove={remove}
      />
    ),
    [draft.serviceId, remove],
  );

  return (
    <ScreenScaffold safeBottom={false}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <View>
            <StackHeader onBack={() => navigation.goBack()} />
            <Pressable
              accessibilityRole="button"
              onPress={() => navigation.navigate('Lounges', { purpose: 'home' })}
              style={styles.location}>
              <MaterialDesignIcons name="map-marker-outline" size={16} color={colors.ink} />
              <Text style={styles.locationText}>
                {lounge ? `${lounge.name}, ${lounge.city}` : 'Choose a lounge'}
              </Text>
              <MaterialDesignIcons name="chevron-down" size={16} color={colors.ink} />
            </Pressable>
            <Text style={styles.title}>Services</Text>
            <CategoryTabs value={category} onChange={changeCategory} />
            <FilterChips options={groups} value={group} onChange={setGroup} />
            <Text style={styles.note}>Final prices will reflect at checkout.</Text>
          </View>
        }
        ListEmptyComponent={<Text style={styles.empty}>Nothing in this group yet.</Text>}
        contentContainerStyle={[styles.list, added && { paddingBottom: dockSpace }]}
        initialNumToRender={8}
        windowSize={5}
      />

      {added ? (
        <BookingDock
          title={priceLabel(draft.priceAed)}
          caption={`1 service · ${draft.minutes} min · ${added.name}`}
          actionTitle="Continue"
          onAction={() => {
            updateDraft({ loungeId: selectedLoungeId });
            navigation.navigate('Schedule');
          }}
        />
      ) : null}

      {sheetService ? (
        <ServiceSheet
          key={sheetService.id}
          service={sheetService}
          initial={draft.serviceId === sheetService.id ? draft : undefined}
          onClose={() => setSheetService(undefined)}
          onConfirm={confirm}
        />
      ) : null}
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 6,
    paddingVertical: 4,
  },
  locationText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.ink,
  },
  title: {
    ...typography.screenTitle,
    color: colors.ink,
    marginTop: 14,
    marginBottom: 10,
  },
  note: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 12,
    marginBottom: 12,
  },
  list: {
    paddingBottom: 28,
    flexGrow: 1,
  },
  empty: {
    ...typography.body,
    color: colors.muted,
  },
});
