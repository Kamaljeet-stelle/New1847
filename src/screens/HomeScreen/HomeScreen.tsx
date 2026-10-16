import { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import { SearchField } from '../../components/molecules/SearchField';
import { ScreenScaffold } from '../../components/organisms/ScreenScaffold';
import { serviceImages } from '../../data/serviceImages';
import { useBooking } from '../../hooks/useBooking';
import { useInbox } from '../../hooks/useInbox';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import { nextBooking } from '../../services/booking.services';
import {
  getLounge,
  newestServices,
  signatureServices,
} from '../../services/catalog.services';
import { initials } from '../../services/profile.services';
import { colors } from '../../theme/colors';
import type { Service } from '../../types/catalog';
import type { RootStackParamList, TabParamList } from '../../types/navigation';
import { formatClock, formatVisitDate, greetingFor, todayIso } from '../../utils/dates';
import {
  CategoryRail,
  GiftBanner,
  HomeHero,
  QuickActions,
  SectionHeader,
  SignatureList,
  SpotlightRail,
  type QuickAction,
} from './components';
import { styles } from './styles';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function HomeScreen({ navigation }: Props) {
  const { profile, signedIn, selectedLoungeId, bookings } = useBooking();
  const { contentPadding } = useResponsiveLayout();
  const { unreadCount } = useInbox();
  const [query, setQuery] = useState('');
  const lounge = getLounge(selectedLoungeId);
  const firstName = signedIn ? profile.firstName : '';
  const upcoming = useMemo(() => nextBooking(bookings, todayIso()), [bookings]);
  const nextVisit = upcoming
    ? `${formatVisitDate(upcoming.date)}, ${formatClock(upcoming.time)}`
    : undefined;
  const bleed = { marginHorizontal: -contentPadding };

  const openService = (service: Service) =>
    navigation.navigate('ServiceDetail', { serviceId: service.id });

  const actions: QuickAction[] = [
    {
      id: 'quick',
      label: 'Quick Book',
      caption: 'Soonest slot',
      icon: 'lightning-bolt-outline',
      onPress: () => navigation.navigate('Services'),
    },
    {
      id: 'reserve',
      label: 'Reserve',
      caption: 'Pick a lounge',
      icon: 'map-marker-outline',
      onPress: () => navigation.navigate('Lounges', { purpose: 'book' }),
    },
    {
      id: 'visits',
      label: 'Visits',
      caption: upcoming ? '1 upcoming' : 'Your bookings',
      icon: 'calendar-month-outline',
      onPress: () => navigation.navigate('Appointments'),
    },
  ];

  return (
    <ScreenScaffold scroll safeBottom={false}>
      <View style={styles.topBar}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Change lounge"
          onPress={() => navigation.navigate('Lounges', { purpose: 'home' })}
          style={styles.location}>
          <View style={styles.locationIcon}>
            <MaterialDesignIcons name="map-marker" size={14} color={colors.parchment} />
          </View>
          <View style={styles.locationCopy}>
            <Text style={styles.locationLabel}>Your lounge</Text>
            <Text style={styles.locationText} numberOfLines={1}>
              {lounge ? `${lounge.name}, ${lounge.city}` : 'Choose a lounge'}
            </Text>
          </View>
          <MaterialDesignIcons name="chevron-down" size={18} color={colors.ink} />
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          onPress={() => navigation.navigate('Notifications')}
          style={styles.iconButton}>
          <MaterialDesignIcons name="bell-outline" size={20} color={colors.ink} />
          {unreadCount > 0 ? (
            <View style={styles.bellBadge}>
              <Text style={styles.bellBadgeText}>{unreadCount}</Text>
            </View>
          ) : null}
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Account"
          onPress={() => navigation.navigate('Account')}
          style={styles.avatar}>
          <Text style={styles.avatarText}>{(signedIn && initials(profile)) || 'G'}</Text>
        </Pressable>
      </View>

      <HomeHero
        image={serviceImages.barber}
        greeting={greetingFor()}
        firstName={firstName}
        nextVisit={nextVisit}
        onBook={() => navigation.navigate('Services')}
        onVisit={() => navigation.navigate('Appointments')}
      />

      <View style={styles.searchWrap}>
        <SearchField
          value={query}
          onChangeText={setQuery}
          placeholder="Search haircut, massage, facial…"
          onSubmit={() => navigation.navigate('Services', { query: query.trim() })}
        />
      </View>

      <View style={styles.actions}>
        <QuickActions actions={actions} />
      </View>
      <SectionHeader
        kicker="Explore"
        title="What are you in for?"
        action="All services"
        onAction={() => navigation.navigate('Services')}
      />
      <View style={bleed}>
        <View style={{ paddingLeft: contentPadding }}>
          <CategoryRail
            onPress={category => navigation.navigate('ServiceMenu', { category })}
          />
        </View>
      </View>

      <SectionHeader kicker="Now in the lounge" title="New this season" />
      <View style={bleed}>
        <View style={{ paddingLeft: contentPadding }}>
          <SpotlightRail services={newestServices()} onPress={openService} />
        </View>
      </View>

      <SectionHeader kicker="Signature" title="The 1847 rituals" />
      <SignatureList services={signatureServices()} onPress={openService} />

      <View style={styles.gift}>
        <GiftBanner onPress={() => navigation.navigate('Shop')} />
      </View>
    </ScreenScaffold>
  );
}
