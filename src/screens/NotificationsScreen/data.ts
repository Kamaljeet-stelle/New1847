import type { InboxKind } from '../../types/catalog';

export type InboxFilter = InboxKind | 'all';

export const inboxFilters: { id: InboxFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'booking', label: 'Bookings' },
  { id: 'offer', label: 'Offers' },
  { id: 'lounge', label: 'Lounge' },
];
