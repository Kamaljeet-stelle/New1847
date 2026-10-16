import type { Booking, BookingDraft } from '@shared/types/catalog';
import { validateBooking, hasErrors } from '@shared/services/booking.services';
import { apiRequest, isApiConfigured, ApiNotConfiguredError } from '../client';

export const bookingApi = {
  validate(draft: BookingDraft) {
    return validateBooking(draft);
  },

  isValid(draft: BookingDraft) {
    return !hasErrors(validateBooking(draft));
  },

  /** Remote create when API exists; otherwise callers use BookingProvider.saveBooking(). */
  async createRemote(draft: BookingDraft): Promise<Booking | null> {
    if (!isApiConfigured()) {
      return null;
    }
    try {
      return await apiRequest<Booking>('/bookings', {
        method: 'POST',
        body: JSON.stringify(draft),
      });
    } catch (error) {
      if (error instanceof ApiNotConfiguredError) {
        return null;
      }
      throw error;
    }
  },
};
