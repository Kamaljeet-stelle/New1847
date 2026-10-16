import { emptyDraft, type Booking } from '../src/types/catalog';
import {
  buildInbox,
  filterInbox,
  inboxSections,
  timeAgo,
} from '../src/services/notification.services';

const now = new Date(2026, 9, 14, 15, 0);

const booking: Booking = {
  ...emptyDraft,
  id: 'bk-1',
  createdAt: new Date(2026, 9, 14, 14, 0).toISOString(),
  loungeId: 'al-qana',
  serviceId: 'muscle-melt',
  date: '2026-10-15',
  time: '10:00',
};

describe('notification inbox', () => {
  it('adds a booked notice and a reminder for a visit tomorrow', () => {
    const inbox = buildInbox([booking], now);
    const bookingItems = filterInbox(inbox, 'booking');
    expect(bookingItems.map(item => item.id)).toEqual(['bk-1-reminder', 'bk-1-booked']);
    expect(bookingItems[0].title).toBe('Your visit is tomorrow');
  });

  it('sorts newest first and groups by age', () => {
    const inbox = buildInbox([], now);
    const times = inbox.map(item => item.at);
    expect([...times].sort().reverse()).toEqual(times);
    expect(inboxSections(inbox, now).map(section => section.id)).toEqual([
      'today',
      'week',
      'earlier',
    ]);
  });

  it('formats relative times', () => {
    expect(timeAgo(new Date(2026, 9, 14, 13, 0).toISOString(), now)).toBe('2h ago');
    expect(timeAgo(new Date(2026, 9, 13, 10, 0).toISOString(), now)).toBe('Yesterday');
  });
});
