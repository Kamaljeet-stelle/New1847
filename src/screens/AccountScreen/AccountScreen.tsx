import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Wordmark } from '../../components/atoms/Wordmark';
import { MenuRow } from '../../components/molecules/MenuRow';
import { ScreenScaffold } from '../../components/organisms/ScreenScaffold';
import { useBooking } from '../../hooks/useBooking';
import { fullName, initials } from '../../services/profile.services';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import type { RootStackParamList, TabParamList } from '../../types/navigation';
import { DeleteAccountSheet } from './components/DeleteAccountSheet';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Account'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function AccountScreen({ navigation }: Props) {
  const { profile, signedIn, signOut, deleteAccount } = useBooking();
  const [deleting, setDeleting] = useState(false);
  const name = signedIn ? fullName(profile) : '';

  return (
    <ScreenScaffold scroll safeBottom={false}>
      <View style={styles.brand}>
        <Wordmark size={34} />
      </View>

      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>{(signedIn && initials(profile)) || 'G'}</Text>
        </View>
        <View style={styles.profileCopy}>
          <Text style={styles.name}>{name || 'Guest'}</Text>
          {signedIn && profile.email ? <Text style={styles.email}>{profile.email}</Text> : null}
        </View>
        <Pressable
          accessibilityRole="button"
          hitSlop={10}
          onPress={() => navigation.navigate('EditProfile')}
          style={styles.edit}>
          <Text style={styles.editText}>Edit</Text>
        </Pressable>
      </View>

      <Text style={styles.section}>Your account</Text>
      <View style={styles.group}>
        <MenuRow
          icon="calendar-month-outline"
          title="Appointments"
          onPress={() => navigation.navigate('Appointments')}
        />
        <MenuRow icon="gift-outline" title="Gift Cards" onPress={() => navigation.navigate('Shop')} />
        <MenuRow
          icon="package-variant-closed"
          title="Series packages"
          onPress={() => navigation.navigate('Packages')}
        />
        <MenuRow
          icon="account-multiple-plus-outline"
          title="Referral"
          onPress={() => navigation.navigate('Referral')}
          last
        />
      </View>

      <Text style={styles.section}>Settings</Text>
      <View style={styles.group}>
        <MenuRow
          icon="credit-card-outline"
          title="Payments"
          onPress={() => navigation.navigate('Payments')}
        />
        <MenuRow
          icon="bell-outline"
          title="Manage Notifications"
          onPress={() => navigation.navigate('NotificationSettings')}
          last
        />
      </View>

      <Text style={styles.section}>Help & FAQ</Text>
      <View style={styles.group}>
        <MenuRow title="Privacy Policy" onPress={() => navigation.navigate('Privacy')} />
        <MenuRow title="Terms & Conditions" onPress={() => navigation.navigate('Terms')} />
        <MenuRow title="About Us" onPress={() => navigation.navigate('About')} />
        <MenuRow title="Journal" onPress={() => navigation.navigate('Journal')} />
        <MenuRow title="Price guide" onPress={() => navigation.navigate('Prices')} />
        <MenuRow title="Questions" onPress={() => navigation.navigate('Faq')} last />
      </View>

      <View style={[styles.group, styles.spaced]}>
        <MenuRow icon="delete-outline" title="Delete Account" danger onPress={() => setDeleting(true)} />
        <MenuRow
          icon="logout"
          title="Log out"
          last
          onPress={() =>
            Alert.alert('Log out?', undefined, [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Log out', onPress: signOut },
            ])
          }
        />
      </View>

      <DeleteAccountSheet
        visible={deleting}
        onClose={() => setDeleting(false)}
        onDelete={() => {
          setDeleting(false);
          deleteAccount();
        }}
      />
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  brand: {
    alignItems: 'center',
    marginBottom: 18,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 18,
    backgroundColor: colors.ink,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.copper,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 17,
  },
  profileCopy: {
    flex: 1,
  },
  name: {
    ...typography.sectionTitle,
    color: colors.parchment,
  },
  email: {
    ...typography.caption,
    color: colors.copperSoft,
    marginTop: 2,
  },
  edit: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(246, 241, 232, 0.4)',
  },
  editText: {
    ...typography.button,
    color: colors.parchment,
  },
  section: {
    ...typography.label,
    color: colors.muted,
    marginTop: 24,
    marginBottom: 8,
  },
  group: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: 'hidden',
  },
  spaced: {
    marginTop: 24,
    marginBottom: 24,
  },
});
