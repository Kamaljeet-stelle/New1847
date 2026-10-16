import type { Booking } from '@shared/types/catalog';
import { buildInbox, filterInbox, inboxSections, timeAgo } from '@shared/services/notification.services';
import { apiRequest, isApiConfigured, ApiNotConfiguredError } from '../client';

export const inboxApi = {
  build(bookings: Booking[], now = new Date()) {
    return buildInbox(bookings, now);
  },

  filter: filterInbox,
  sections: inboxSections,
  timeAgo,

  async listRemote() {
    if (!isApiConfigured()) {
      return null;
    }
    try {
      return await apiRequest<ReturnType<typeof buildInbox>>('/inbox');
    } catch (error) {
      if (error instanceof ApiNotConfiguredError) {
        return null;
      }
      return null;
    }
  },
};
