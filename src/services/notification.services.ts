import { feedNotices } from '../data/notices';
import type { Booking, InboxItem, InboxKind } from '../types/catalog';
import { formatClock, formatVisitDate, todayIso } from '../utils/dates';
import { getLounge, getService } from './catalog.services';

export type InboxSection = {
  id: 'today' | 'week' | 'earlier';
  title: string;
  data: InboxItem[];
};

const dayMs = 86400000;

function bookingNotices(bookings: Booking[], now: Date): InboxItem[] {
  const today = todayIso(now);
  const tomorrow = todayIso(new Date(now.getTime() + dayMs));
  return bookings.flatMap(booking => {
    const service = getService(booking.serviceId)?.name ?? 'Your visit';
    const lounge = getLounge(booking.loungeId)?.name ?? 'the lounge';
    const when = `${formatVisitDate(booking.date)}, ${formatClock(booking.time)}`;
    const booked: InboxItem = {
      id: `${booking.id}-booked`,
      kind: 'booking',
      title: 'Appointment booked',
      body: `${service} at ${lounge} · ${when}`,
      at: booking.createdAt,
      cta: 'View appointment',
      target: { screen: 'Appointments' },
    };
    if (booking.date !== today && booking.date !== tomorrow) {
      return [booked];
    }
    const reminder: InboxItem = {
      id: `${booking.id}-reminder`,
      kind: 'booking',
      title: booking.date === today ? 'Your visit is today' : 'Your visit is tomorrow',
      body: `${service} at ${formatClock(booking.time)} in ${lounge}. We'll have your chair ready.`,
      at: now.toISOString(),
      cta: 'View appointment',
      target: { screen: 'Appointments' },
    };
    return [reminder, booked];
  });
}

export function buildInbox(bookings: Booking[], now = new Date()) {
  return [...bookingNotices(bookings, now), ...feedNotices(now)].sort((a, b) =>
    b.at.localeCompare(a.at),
  );
}

export function filterInbox(items: InboxItem[], kind: InboxKind | 'all') {
  return kind === 'all' ? items : items.filter(item => item.kind === kind);
}

export function inboxSections(items: InboxItem[], now = new Date()): InboxSection[] {
  const today = todayIso(now);
  const weekAgo = now.getTime() - 7 * dayMs;
  const sections: InboxSection[] = [
    { id: 'today', title: 'Today', data: [] },
    { id: 'week', title: 'This week', data: [] },
    { id: 'earlier', title: 'Earlier', data: [] },
  ];
  items.forEach(item => {
    const at = new Date(item.at);
    const index = todayIso(at) === today ? 0 : at.getTime() >= weekAgo ? 1 : 2;
    sections[index].data.push(item);
  });
  return sections.filter(section => section.data.length > 0);
}

export function timeAgo(iso: string, now = new Date()) {
  const minutes = Math.floor((now.getTime() - new Date(iso).getTime()) / 60000);
  if (minutes < 1) {
    return 'Just now';
  }
  if (minutes < 60) {
    return `${minutes}m ago`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h ago`;
  }
  const days = Math.floor(hours / 24);
  if (days < 2) {
    return 'Yesterday';
  }
  if (days < 7) {
    return `${days}d ago`;
  }
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}
