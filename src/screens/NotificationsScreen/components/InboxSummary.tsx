import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';

type Props = {
  unreadCount: number;
  onMarkAll: () => void;
};

export function InboxSummary({ unreadCount, onMarkAll }: Props) {
  const caughtUp = unreadCount === 0;

  return (
    <View style={styles.card}>
      <View style={styles.watermark}>
        <MaterialDesignIcons name="bell-outline" size={160} color={colors.parchment} />
      </View>

      <View style={styles.row}>
        <View style={styles.icon}>
          <MaterialDesignIcons
            name={caughtUp ? 'bell-check-outline' : 'bell-ring-outline'}
            size={24}
            color={colors.ink}
          />
          {caughtUp ? null : (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
        <View style={styles.copy}>
          <Text style={styles.kicker}>Your inbox</Text>
          <Text style={styles.title}>
            {caughtUp
              ? 'You’re all caught up'
              : `${unreadCount} new ${unreadCount === 1 ? 'update' : 'updates'}`}
          </Text>
        </View>
      </View>

      <Text style={styles.body}>
        Bookings, reminders, new treatments and lounge news, all in one place.
      </Text>

      {caughtUp ? null : (
        <Pressable
          accessibilityRole="button"
          onPress={onMarkAll}
          style={({ pressed }) => [styles.action, pressed && styles.pressed]}>
          <MaterialDesignIcons name="check-all" size={16} color={colors.ink} />
          <Text style={styles.actionText}>Mark all as read</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: colors.ink,
  },
  watermark: {
    position: 'absolute',
    right: -34,
    top: -26,
    opacity: 0.06,
    transform: [{ rotate: '-14deg' }],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  icon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.copper,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.parchment,
    borderWidth: 2,
    borderColor: colors.ink,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.ink,
  },
  copy: {
    flex: 1,
  },
  kicker: {
    ...typography.label,
    color: colors.copper,
  },
  title: {
    ...typography.serifTitle,
    color: colors.parchment,
    marginTop: 4,
  },
  body: {
    ...typography.caption,
    color: 'rgba(246, 241, 232, 0.7)',
    marginTop: 14,
  },
  action: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 16,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 18,
    backgroundColor: colors.parchment,
  },
  pressed: {
    opacity: 0.85,
  },
  actionText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.ink,
  },
});
