import { useCallback, useMemo, useState } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import { FilterChips } from '../../components/molecules/FilterChips';
import { ScreenScaffold } from '../../components/organisms/ScreenScaffold';
import { StackHeader } from '../../components/organisms/StackHeader';
import { useInbox } from '../../hooks/useInbox';
import {
  filterInbox,
  inboxSections,
  timeAgo,
  type InboxSection,
} from '../../services/notification.services';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import type { InboxItem } from '../../types/catalog';
import type { RootStackParamList } from '../../types/navigation';
import { InboxSummary, NoticeCard } from './components';
import { inboxFilters, type InboxFilter } from './data';

type Props = NativeStackScreenProps<RootStackParamList, 'Notifications'>;

export function NotificationsScreen({ navigation }: Props) {
  const { items, readIds, unreadCount, markRead, markAllRead } = useInbox();
  const [filter, setFilter] = useState<InboxFilter>('all');
  const sections = useMemo(() => inboxSections(filterInbox(items, filter)), [items, filter]);

  const openNotice = useCallback(
    (item: InboxItem) => {
      markRead([item.id]);
      const { target } = item;
      switch (target.screen) {
        case 'ServiceDetail':
          navigation.navigate('ServiceDetail', { serviceId: target.serviceId });
          break;
        case 'Shop':
        case 'Services':
          navigation.navigate('Main', { screen: target.screen });
          break;
        case 'Appointments':
          navigation.navigate('Appointments');
          break;
        case 'Referral':
          navigation.navigate('Referral');
          break;
        case 'Care':
          navigation.navigate('Care');
          break;
        case 'Journal':
          navigation.navigate('Journal');
          break;
      }
    },
    [markRead, navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: InboxItem }) => (
      <NoticeCard
        item={item}
        unread={!readIds.has(item.id)}
        time={timeAgo(item.at)}
        onPress={openNotice}
      />
    ),
    [openNotice, readIds],
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: InboxSection }) => (
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>{section.title}</Text>
        <View style={styles.sectionRule} />
      </View>
    ),
    [],
  );

  return (
    <ScreenScaffold>
      <SectionList
        sections={sections}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <StackHeader
              title="Notifications"
              onBack={() => navigation.goBack()}
              actionTitle="Settings"
              onAction={() => navigation.navigate('NotificationSettings')}
            />
            <InboxSummary unreadCount={unreadCount} onMarkAll={markAllRead} />
            <View style={styles.filters}>
              <FilterChips options={inboxFilters} value={filter} onChange={setFilter} />
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <MaterialDesignIcons name="bell-sleep-outline" size={28} color={colors.copper} />
            </View>
            <Text style={styles.emptyTitle}>Nothing here yet</Text>
            <Text style={styles.emptyText}>
              New updates in this category will show up here.
            </Text>
          </View>
        }
        initialNumToRender={6}
        windowSize={7}
      />
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  header: {
    paddingTop: 12,
  },
  filters: {
    marginTop: 18,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 22,
    marginBottom: 12,
  },
  sectionTitle: {
    ...typography.label,
    color: colors.muted,
  },
  sectionRule: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.line,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 56,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.copperSoft,
    marginBottom: 16,
  },
  emptyTitle: {
    ...typography.sectionTitle,
    color: colors.ink,
  },
  emptyText: {
    ...typography.body,
    color: colors.muted,
    textAlign: 'center',
    marginTop: 6,
  },
});
