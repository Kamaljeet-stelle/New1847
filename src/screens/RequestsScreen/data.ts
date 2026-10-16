import { getLounge, getService } from '../../services/catalog.services';
import type { Booking, Inquiry } from '../../types/catalog';
import { formatClock, formatVisitDate } from '../../utils/dates';

export type RequestRow = {
  id: string;
  title: string;
  meta: string;
  subtitle: string;
};

const kindLabel = {
  question: 'Question',
  voucher: 'Voucher',
  franchise: 'Franchise',
};

export function requestRows(
  bookings: Booking[],
  inquiries: Inquiry[],
): RequestRow[] {
  return [
    ...bookings.map(booking => ({
      id: booking.id,
      title: getService(booking.serviceId)?.name ?? 'Service',
      meta: `${formatVisitDate(booking.date)} · ${formatClock(booking.time)}`,
      subtitle: `${getLounge(booking.loungeId)?.name ?? 'Lounge'} · ${booking.name}`,
    })),
    ...inquiries.map(inquiry => ({
      id: inquiry.id,
      title: kindLabel[inquiry.kind],
      meta: inquiry.email,
      subtitle: inquiry.message,
    })),
  ];
}
