import { useCallback } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import { ScreenScaffold } from '../../components/organisms/ScreenScaffold';
import { StackHeader } from '../../components/organisms/StackHeader';
import { useBooking } from '../../hooks/useBooking';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import type { SavedCard } from '../../types/catalog';
import type { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Payments'>;

export function PaymentsScreen({ navigation }: Props) {
  const { cards, removeCard } = useBooking();

  const renderItem = useCallback(
    ({ item }: { item: SavedCard }) => (
      <View style={styles.card}>
        <View>
          <Text style={styles.brand}>{item.brand}</Text>
          <Text style={styles.number}>•••• {item.last4}</Text>
          <Text style={styles.expiry}>Expires {item.expiry}</Text>
        </View>
        <Pressable accessibilityRole="button" onPress={() => removeCard(item.id)}>
          <Text style={styles.remove}>Remove</Text>
        </Pressable>
      </View>
    ),
    [removeCard],
  );

  return (
    <ScreenScaffold>
      <FlatList
        data={cards}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <View>
            <StackHeader title="Payments" onBack={() => navigation.goBack()} />
            <Text style={styles.label}>Saved Cards</Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => navigation.navigate('AddCard')}
              style={styles.add}>
              <MaterialDesignIcons name="plus" size={18} color={colors.ink} />
              <Text style={styles.addLabel}>Add Card</Text>
            </Pressable>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>
            Only the last four digits are kept on this device. Nothing is sent to a payment processor.
          </Text>
        }
        contentContainerStyle={styles.list}
        initialNumToRender={6}
        windowSize={5}
      />
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  label: {
    ...typography.label,
    color: colors.muted,
    marginTop: 8,
    marginBottom: 10,
  },
  add: {
    minHeight: 56,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  addLabel: {
    ...typography.body,
    color: colors.ink,
  },
  card: {
    minHeight: 88,
    borderRadius: 14,
    backgroundColor: colors.ink,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    ...typography.label,
    color: colors.copper,
  },
  number: {
    ...typography.sectionTitle,
    color: colors.parchment,
    marginTop: 6,
  },
  expiry: {
    ...typography.caption,
    color: '#D9CBB8',
    marginTop: 4,
  },
  remove: {
    ...typography.caption,
    color: colors.parchment,
  },
  empty: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 8,
  },
  list: {
    paddingBottom: 24,
    flexGrow: 1,
  },
});
