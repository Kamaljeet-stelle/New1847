import { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BackArrow } from '../../components/atoms/BackArrow';
import { FilterChips } from '../../components/molecules/FilterChips';
import { PageHeading } from '../../components/molecules/PageHeading';
import { RecordCard } from '../../components/molecules/RecordCard';
import { ScreenScaffold } from '../../components/organisms/ScreenScaffold';
import { servicesForPrice } from '../../services/catalog.services';
import { priceLists, type PriceList, type Service } from '../../types/catalog';
import type { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Prices'>;

const options = priceLists.map(list => ({ id: list, label: list }));

export function PricesScreen({ navigation }: Props) {
  const [list, setList] = useState<PriceList>('Hair');
  const data = useMemo(() => servicesForPrice(list), [list]);

  const renderItem = useCallback(
    ({ item }: { item: Service }) => (
      <RecordCard
        title={item.name}
        meta={item.group}
        subtitle="Price confirmed by the lounge when you book."
        onPress={() =>
          navigation.navigate('ServiceDetail', { serviceId: item.id })
        }
      />
    ),
    [navigation],
  );

  const header = useMemo(
    () => (
      <View>
        <BackArrow onPress={() => navigation.goBack()} />
        <PageHeading
          kicker="Price guide"
          title={list}
          subtitle="Grouped the way 1847 lists prices: hair, beard, hands and feet, face, body, and hair removal. Figures stay with the lounge."
        />
        <FilterChips options={options} value={list} onChange={setList} />
        <View style={styles.gap} />
      </View>
    ),
    [list, navigation],
  );

  return (
    <ScreenScaffold>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListHeaderComponent={header}
        ListEmptyComponent={<Text style={styles.empty}>Nothing in this menu.</Text>}
        contentContainerStyle={styles.list}
        initialNumToRender={8}
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
  empty: {
    paddingVertical: 12,
  },
});
