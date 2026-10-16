import { useCallback, useMemo } from 'react';
import { buildInbox } from '../services/notification.services';
import { useBooking } from './useBooking';

export function useInbox() {
  const { bookings, readNoticeIds, markNoticesRead } = useBooking();
  const items = useMemo(() => buildInbox(bookings), [bookings]);
  const readIds = useMemo(() => new Set(readNoticeIds), [readNoticeIds]);
  const unreadCount = items.filter(item => !readIds.has(item.id)).length;

  const markAllRead = useCallback(
    () => markNoticesRead(items.map(item => item.id)),
    [items, markNoticesRead],
  );

  return { items, readIds, unreadCount, markRead: markNoticesRead, markAllRead };
}
