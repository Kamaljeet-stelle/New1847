import type { Booking } from '../../types/catalog';

export function splitVisits(bookings: Booking[], today: string) {
  return {
    upcoming: bookings.filter(booking => booking.date >= today),
    past: bookings.filter(booking => booking.date < today),
  };
}
