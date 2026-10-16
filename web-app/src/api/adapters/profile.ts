import type { Profile } from '@shared/types/catalog';
import { validateProfile } from '@shared/services/profile.services';
import { apiRequest, isApiConfigured, ApiNotConfiguredError } from '../client';

export const profileApi = {
  validate(profile: Profile) {
    return validateProfile(profile);
  },

  async updateRemote(profile: Profile): Promise<Profile | null> {
    if (!isApiConfigured()) {
      return null;
    }
    try {
      return await apiRequest<Profile>('/profile', {
        method: 'PUT',
        body: JSON.stringify(profile),
      });
    } catch (error) {
      if (error instanceof ApiNotConfiguredError) {
        return null;
      }
      throw error;
    }
  },
};
