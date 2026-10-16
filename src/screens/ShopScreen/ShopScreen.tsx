import { useCallback } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TextButton } from '../../components/atoms/TextButton';
import { ScreenScaffold } from '../../components/organisms/ScreenScaffold';
import { StackHeader } from '../../components/organisms/StackHeader';
import { giftCards } from '../../data/giftCards';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import type { GiftCard } from '../../types/catalog';
import type { RootStackParamList, TabParamList } from '../../types/navigation';
import { giftImages } from './data';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Shop'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function ShopScreen({ navigation }: Props) {
  const renderItem = useCallback(
    ({ item }: { item: GiftCard }) => {
      return (
        <View style={styles.block}>
          <Text style={styles.occasion}>{item.title}</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={item.title}
            onPress={() =>
              navigation.navigate('Vouchers', { occasion: item.title })
            }
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
            <Image
              source={giftImages[item.id]}
              resizeMode="cover"
              style={styles.image}
            />
            <View style={styles.shade} />
            <View style={styles.copy}>
              <Text style={styles.brand}>1847</Text>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardNote}>{item.note}</Text>
            </View>
          </Pressable>
        </View>
      );
    },
    [navigation],
  );

  return (
    <ScreenScaffold safeBottom={false}>
      <FlatList
        data={giftCards}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <View>
            <StackHeader title="Gift Cards" />
            <View style={styles.links}>
              <TextButton
                title="Resend"
                onPress={() =>
                  navigation.navigate('Contact', {
                    kind: 'voucher',
                    prompt: 'Card code to resend',
                  })
                }
              />
              <TextButton
                title="Check balance"
                onPress={() =>
                  navigation.navigate('Contact', {
                    kind: 'voucher',
                    prompt: 'Gift card code',
                  })
                }
              />
            </View>
          </View>
        }
        ListEmptyComponent={<Text style={styles.empty}>No gift cards yet.</Text>}
        contentContainerStyle={styles.list}
        initialNumToRender={6}
        windowSize={5}
      />
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  links: {
    flexDirection: 'row',
    gap: 18,
    marginBottom: 8,
  },
  block: {
    marginBottom: 8,
  },
  occasion: {
    ...typography.caption,
    color: colors.muted,
    marginBottom: 8,
  },
  card: {
    height: 188,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.ink,
  },
  pressed: {
    opacity: 0.94,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  shade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 118,
    backgroundColor: 'rgba(18, 16, 14, 0.5)',
  },
  copy: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 14,
  },
  brand: {
    ...typography.label,
    color: colors.parchment,
    marginBottom: 8,
  },
  cardTitle: {
    ...typography.sectionTitle,
    color: colors.white,
  },
  cardNote: {
    ...typography.caption,
    color: 'rgba(255, 252, 248, 0.86)',
    marginTop: 4,
  },
  list: {
    paddingBottom: 24,
    flexGrow: 1,
  },
  empty: {
    ...typography.body,
    color: colors.muted,
  },
});
