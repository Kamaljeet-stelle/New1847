import { memo, type ComponentProps } from 'react';
import { Image, Pressable, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import { serviceImages } from '../../../data/serviceImages';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import type { InboxItem, InboxKind } from '../../../types/catalog';

const giftImage: ImageSourcePropType = require('../../../assets/gifts/father.jpg');

const kindStyle: Record<
  InboxKind,
  { label: string; icon: ComponentProps<typeof MaterialDesignIcons>['name']; tile: string; tint: string }
> = {
  booking: { label: 'Booking', icon: 'calendar-check-outline', tile: colors.ink, tint: colors.parchment },
  offer: { label: 'Offer', icon: 'tag-heart-outline', tile: colors.copperSoft, tint: colors.copper },
  lounge: { label: 'Lounge', icon: 'storefront-outline', tile: colors.sageSoft, tint: colors.sage },
};

type Props = {
  item: InboxItem;
  unread: boolean;
  time: string;
  onPress: (item: InboxItem) => void;
};

export const NoticeCard = memo(function NoticeCardView({ item, unread, time, onPress }: Props) {
  const kind = kindStyle[item.kind];
  const image = item.image === 'gift' ? giftImage : item.image ? serviceImages[item.image] : null;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${unread ? 'Unread. ' : ''}${item.title}`}
      onPress={() => onPress(item)}
      style={({ pressed }) => [styles.card, unread && styles.cardUnread, pressed && styles.pressed]}>
      <View style={styles.row}>
        <View style={[styles.tile, { backgroundColor: kind.tile }]}>
          <MaterialDesignIcons name={kind.icon} size={20} color={kind.tint} />
        </View>
        <View style={styles.copy}>
          <View style={styles.meta}>
            <Text style={styles.kind}>{kind.label}</Text>
            <Text style={styles.time}>{time}</Text>
            {unread ? <View style={styles.dot} /> : null}
          </View>
          <Text style={[styles.title, !unread && styles.titleRead]}>{item.title}</Text>
          <Text style={styles.body} numberOfLines={3}>
            {item.body}
          </Text>
        </View>
      </View>

      {image ? <Image source={image} resizeMode="cover" style={styles.image} /> : null}

      <View style={styles.cta}>
        <Text style={styles.ctaText}>{item.cta}</Text>
        <MaterialDesignIcons name="arrow-right" size={16} color={colors.copper} />
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.line,
    marginBottom: 12,
  },
  cardUnread: {
    backgroundColor: colors.paper,
    borderColor: colors.paper,
    shadowColor: colors.ink,
    shadowOpacity: 0.07,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  pressed: {
    opacity: 0.85,
  },
  row: {
    flexDirection: 'row',
    gap: 14,
  },
  tile: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  kind: {
    ...typography.label,
    fontSize: 10,
    color: colors.copper,
  },
  time: {
    ...typography.caption,
    fontSize: 12,
    color: colors.placeholder,
    flex: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.copper,
  },
  title: {
    ...typography.cardTitle,
    color: colors.ink,
    marginTop: 4,
  },
  titleRead: {
    color: colors.sage,
  },
  body: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 4,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 14,
    marginTop: 14,
    backgroundColor: colors.ink,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.line,
  },
  ctaText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.ink,
    flex: 1,
  },
});
