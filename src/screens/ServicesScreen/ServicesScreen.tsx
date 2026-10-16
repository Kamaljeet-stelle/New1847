import { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Wordmark } from '../../components/atoms/Wordmark';
import { RecordCard } from '../../components/molecules/RecordCard';
import { SearchField } from '../../components/molecules/SearchField';
import { ScreenScaffold } from '../../components/organisms/ScreenScaffold';
import { useBooking } from '../../hooks/useBooking';
import { getLounge, searchServices, serviceMeta } from '../../services/catalog.services';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import type { Service } from '../../types/catalog';
import type { RootStackParamList, TabParamList } from '../../types/navigation';
import { CategoryCard } from './components/CategoryCard';
import { categoryCards } from './data';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Services'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function ServicesScreen({ navigation, route }: Props) {
  const { selectedLoungeId } = useBooking();
  const lounge = getLounge(selectedLoungeId);
  const [query, setQuery] = useState(route.params?.query ?? '');
  const results = useMemo(() => searchServices(query), [query]);
  const searching = query.trim().length > 0;

  const renderService = useCallback(
    ({ item }: { item: Service }) => (
      <RecordCard
        title={item.name}
        meta={serviceMeta(item)}
        subtitle={item.summary}
        onPress={() =>
          navigation.navigate('ServiceDetail', { serviceId: item.id })
        }
      />
    ),
    [navigation],
  );

  const renderCategory = useCallback(
    ({ item }: { item: (typeof categoryCards)[number] }) => (
      <CategoryCard
        title={item.title}
        detail={item.detail}
        image={item.image}
        onPress={() =>
          navigation.navigate('ServiceMenu', { category: item.id })
        }
      />
    ),
    [navigation],
  );

  const header = (
    <View style={styles.header}>
      <View style={styles.brand}>
        <Wordmark size={34} />
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={() => navigation.navigate('Lounges', { purpose: 'home' })}
        style={styles.location}>
        <MaterialDesignIcons
          name="map-marker-outline"
          size={14}
          color={colors.muted}
        />
        <Text style={styles.locationText}>
          {lounge ? `${lounge.name}, ${lounge.city}` : 'Choose a lounge'}
        </Text>
        <MaterialDesignIcons name="chevron-down" size={16} color={colors.muted} />
      </Pressable>
      <Text style={styles.title}>Services</Text>
      <SearchField
        value={query}
        onChangeText={setQuery}
        placeholder="Search services"
      />
    </View>
  );

  if (!searching) {
    return (
      <ScreenScaffold safeBottom={false}>
        <FlatList
          data={categoryCards}
          keyExtractor={item => item.id}
          renderItem={renderCategory}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={header}
          ListEmptyComponent={<Text style={styles.empty}>No categories yet.</Text>}
          contentContainerStyle={styles.list}
          keyboardShouldPersistTaps="handled"
        />
      </ScreenScaffold>
    );
  }

  return (
    <ScreenScaffold safeBottom={false}>
      <FlatList
        data={results}
        keyExtractor={item => item.id}
        renderItem={renderService}
        ListHeaderComponent={header}
        ListEmptyComponent={
          <Text style={styles.empty}>Nothing matches that search.</Text>
        }
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        initialNumToRender={8}
        windowSize={5}
      />
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 4,
    paddingBottom: 16,
  },
  brand: {
    alignItems: 'center',
  },
  location: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
    marginBottom: 18,
    paddingVertical: 4,
  },
  locationText: {
    ...typography.caption,
    color: colors.muted,
  },
  title: {
    ...typography.screenTitle,
    color: colors.ink,
    marginBottom: 14,
  },
  list: {
    paddingBottom: 24,
    flexGrow: 1,
  },
  empty: {
    paddingVertical: 24,
  },
});
