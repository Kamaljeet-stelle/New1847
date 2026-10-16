import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenScaffold } from '../../components/organisms/ScreenScaffold';
import { StackHeader } from '../../components/organisms/StackHeader';
import { useBooking } from '../../hooks/useBooking';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import type { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'NotificationSettings'>;

const rows = [
  {
    id: 'appointments' as const,
    title: 'Appointment reminders',
    body: 'A note before a visit you requested on this device.',
  },
  {
    id: 'offers' as const,
    title: 'Offers',
    body: 'New treatments and seasonal gift cards.',
  },
];

export function NotificationSettingsScreen({ navigation }: Props) {
  const { notices, updateNotices } = useBooking();

  return (
    <ScreenScaffold scroll>
      <StackHeader title="Notification settings" onBack={() => navigation.goBack()} />
      {rows.map(row => {
        const on = notices[row.id];
        return (
          <Pressable
            key={row.id}
            accessibilityRole="switch"
            accessibilityState={{ checked: on }}
            onPress={() => updateNotices({ [row.id]: !on })}
            style={styles.row}>
            <View style={styles.copy}>
              <Text style={styles.title}>{row.title}</Text>
              <Text style={styles.body}>{row.body}</Text>
            </View>
            <View style={[styles.track, on && styles.trackOn]}>
              <View style={[styles.thumb, on && styles.thumbOn]} />
            </View>
          </Pressable>
        );
      })}
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  copy: {
    flex: 1,
  },
  title: {
    ...typography.cardTitle,
    color: colors.ink,
  },
  body: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 4,
  },
  track: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.line,
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  trackOn: {
    backgroundColor: colors.ink,
  },
  thumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.white,
  },
  thumbOn: {
    alignSelf: 'flex-end',
  },
});
