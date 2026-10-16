import { useState } from 'react';
import { Image, Share, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { TextButton } from '../../components/atoms/TextButton';
import { MenuRow } from '../../components/molecules/MenuRow';
import { BottomSheet } from '../../components/organisms/BottomSheet';
import { ScreenScaffold } from '../../components/organisms/ScreenScaffold';
import { StackHeader } from '../../components/organisms/StackHeader';
import { formatAed } from '../../data/bookingOptions';
import { serviceImages } from '../../data/serviceImages';
import { useBooking } from '../../hooks/useBooking';
import { referralCode } from '../../services/profile.services';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import type { RootStackParamList } from '../../types/navigation';
import { referralOffer, referralSteps, shareMessage } from './data';

type Props = NativeStackScreenProps<RootStackParamList, 'Referral'>;
type Sheet = 'earnings' | 'how' | null;

export function ReferralScreen({ navigation }: Props) {
  const { profile } = useBooking();
  const [sheet, setSheet] = useState<Sheet>(null);
  const code = referralCode(profile);

  const share = async () => {
    try {
      await Share.share({ message: shareMessage(code) });
    } catch {
      // Dismissing the share sheet is not an error worth surfacing.
    }
  };

  return (
    <ScreenScaffold scroll>
      <StackHeader title="Refer & earn" onBack={() => navigation.goBack()} />
      <Text style={styles.lead}>
        Give your friend AED {referralOffer.friendAed} off their first service and get AED{' '}
        {referralOffer.creditAed} credit.
      </Text>

      <View style={styles.hero}>
        <Image source={serviceImages.barber} resizeMode="cover" style={styles.heroImage} />
        <View style={styles.heroShade} />
        <View style={styles.heroCopy}>
          <Text style={styles.heroKicker}>Invite a friend</Text>
          <Text style={styles.heroTitle}>
            AED {referralOffer.friendAed} for them.{'\n'}AED {referralOffer.creditAed} for you.
          </Text>
        </View>
      </View>

      <Text style={styles.label}>Your code</Text>
      <View style={styles.codeRow}>
        <View style={styles.codeBox}>
          <Text selectable style={styles.code}>
            {code}
          </Text>
          <Text style={styles.codeHint}>Press and hold to copy</Text>
        </View>
        <PrimaryButton title="Share" onPress={share} style={styles.share} />
      </View>

      <View style={styles.group}>
        <MenuRow icon="wallet-outline" title="View your earnings" onPress={() => setSheet('earnings')} />
        <MenuRow
          icon="format-list-numbered"
          title="See how it works"
          onPress={() => setSheet('how')}
          last
        />
      </View>

      <View style={styles.terms}>
        <TextButton title="Terms & Conditions" onPress={() => navigation.navigate('Terms')} />
      </View>

      <BottomSheet
        visible={sheet === 'earnings'}
        title="Your earnings"
        subtitle="Credit appears after a friend completes their first visit."
        onClose={() => setSheet(null)}>
        <Text style={styles.earnings}>{formatAed(0)}</Text>
        <PrimaryButton title="Share your code" onPress={share} />
      </BottomSheet>

      <BottomSheet visible={sheet === 'how'} title="How it works" onClose={() => setSheet(null)}>
        <View style={styles.steps}>
          {referralSteps.map((step, index) => (
            <View key={step} style={styles.step}>
              <View style={styles.stepIndex}>
                <Text style={styles.stepIndexText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>
        <PrimaryButton title="Got it" onPress={() => setSheet(null)} />
      </BottomSheet>
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  lead: {
    ...typography.body,
    color: colors.muted,
  },
  hero: {
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 20,
    backgroundColor: colors.ink,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroShade: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(18, 16, 14, 0.42)',
  },
  heroCopy: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 18,
  },
  heroKicker: {
    ...typography.label,
    color: colors.copperSoft,
  },
  heroTitle: {
    ...typography.sectionTitle,
    fontSize: 24,
    lineHeight: 30,
    color: colors.white,
    marginTop: 6,
  },
  label: {
    ...typography.label,
    color: colors.muted,
    marginTop: 24,
    marginBottom: 8,
  },
  codeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  codeBox: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.copper,
    backgroundColor: colors.copperSoft,
  },
  code: {
    ...typography.sectionTitle,
    letterSpacing: 1,
    color: colors.ink,
  },
  codeHint: {
    ...typography.caption,
    fontSize: 11,
    color: colors.muted,
  },
  share: {
    minWidth: 110,
  },
  group: {
    marginTop: 20,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: 'hidden',
  },
  terms: {
    alignItems: 'center',
    marginTop: 24,
  },
  earnings: {
    ...typography.hero,
    color: colors.ink,
    marginVertical: 18,
  },
  steps: {
    marginTop: 16,
    marginBottom: 18,
    gap: 14,
  },
  step: {
    flexDirection: 'row',
    gap: 12,
  },
  stepIndex: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ink,
  },
  stepIndexText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.parchment,
  },
  stepText: {
    ...typography.body,
    fontSize: 15,
    color: colors.ink,
    flex: 1,
  },
});
