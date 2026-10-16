import { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FilterChips } from '../../components/molecules/FilterChips';
import { RecordCard } from '../../components/molecules/RecordCard';
import { SearchField } from '../../components/molecules/SearchField';
import { ScreenScaffold } from '../../components/organisms/ScreenScaffold';
import { StackHeader } from '../../components/organisms/StackHeader';
import { useBooking } from '../../hooks/useBooking';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import { filterLounges, getService } from '../../services/catalog.services';
import { cities, type City, type Lounge } from '../../types/catalog';
import type { RootStackParamList } from '../../types/navigation';

type Filter = City | 'all';

type Props = NativeStackScreenProps<RootStackParamList, 'Lounges'>;

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  ...cities.map(city => ({ id: city, label: city })),
];

export function LoungesScreen({ navigation, route }: Props) {
  const { isWide } = useResponsiveLayout();
  const { selectedLoungeId, setSelectedLounge } = useBooking();
  const purpose = route.params?.purpose ?? 'browse';
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const data = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return filterLounges(filter).filter(lounge =>
      `${lounge.name} ${lounge.city} ${lounge.address}`.toLowerCase().includes(needle),
    );
  }, [filter, query]);

  const choose = useCallback(
    (lounge: Lounge) => {
      if (purpose === 'home') {
        setSelectedLounge(lounge.id);
        navigation.goBack();
        return;
      }
      if (purpose === 'book') {
        setSelectedLounge(lounge.id);
        const service = getService(route.params?.serviceId ?? '');
        if (service) {
          navigation.navigate('ServiceMenu', {
            category: service.category,
            serviceId: service.id,
          });
          return;
        }
        navigation.navigate('Main', { screen: 'Services' });
        return;
      }
      navigation.navigate('LoungeDetail', { loungeId: lounge.id });
    },
    [navigation, purpose, route.params?.serviceId, setSelectedLounge],
  );

  const renderItem = useCallback(
    ({ item }: { item: Lounge }) => (
      <RecordCard
        title={item.name}
        meta={item.city}
        subtitle={`${item.address}\n${item.hours}`}
        selected={item.id === selectedLoungeId}
        onPress={() => choose(item)}
      />
    ),
    [choose, selectedLoungeId],
  );

  const header = useMemo(
    () => (
      <View>
        <StackHeader
          title={purpose === 'browse' ? 'Lounges' : 'Choose a lounge'}
          onBack={() => navigation.goBack()}
        />
        <SearchField
          value={query}
          onChangeText={setQuery}
          placeholder="Search lounges"
        />
        <View style={styles.gap} />
        <FilterChips options={filters} value={filter} onChange={setFilter} />
        <View style={styles.gap} />
      </View>
    ),
    [filter, navigation, purpose, query],
  );

  return (
    <ScreenScaffold>
      <FlatList
        key={isWide ? 'wide' : 'compact'}
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={isWide ? 2 : 1}
        columnWrapperStyle={isWide ? styles.columns : undefined}
        ListHeaderComponent={header}
        ListEmptyComponent={<Text style={styles.empty}>No lounge matches that search.</Text>}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
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
  gap: {
    height: 14,
  },
  columns: {
    gap: 10,
  },
  empty: {
    paddingVertical: 24,
  },
});
