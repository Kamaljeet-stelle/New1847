import {
  filterLounges,
  filterServices,
  getArticle,
  getLounge,
  getService,
  newestServices,
  searchServices,
  signatureServices,
  groupsFor,
} from '@shared/services/catalog.services';
import { articles, faqs, aboutParagraphs, careParagraphs, careStats, values } from '@shared/data/stories';
import { giftCards } from '@shared/data/giftCards';
import { lounges } from '@shared/data/lounges';
import type { City, ServiceCategory } from '@shared/types/catalog';
import { apiRequest, isApiConfigured, ApiNotConfiguredError } from '../client';

async function withLocal<T>(remote: () => Promise<T>, local: () => T): Promise<T> {
  if (!isApiConfigured()) {
    return local();
  }
  try {
    return await remote();
  } catch (error) {
    if (error instanceof ApiNotConfiguredError) {
      return local();
    }
    return local();
  }
}

export const catalogApi = {
  listServices: (category?: ServiceCategory | 'all') =>
    withLocal(
      () =>
        apiRequest<ReturnType<typeof filterServices>>(
          category && category !== 'all' ? `/services?category=${category}` : '/services',
        ),
      () => filterServices(category),
    ),

  searchServices: (query: string) =>
    withLocal(
      () => apiRequest<ReturnType<typeof searchServices>>(`/services/search?q=${encodeURIComponent(query)}`),
      () => searchServices(query),
    ),

  getService: (id: string) =>
    withLocal(
      () => apiRequest<NonNullable<ReturnType<typeof getService>>>(`/services/${id}`),
      () => getService(id),
    ),

  signatureServices: () =>
    withLocal(
      () => apiRequest<ReturnType<typeof signatureServices>>('/services/signature'),
      () => signatureServices(),
    ),

  newestServices: () =>
    withLocal(
      () => apiRequest<ReturnType<typeof newestServices>>('/services/newest'),
      () => newestServices(),
    ),

  groupsFor: (category: ServiceCategory) =>
    withLocal(
      () => apiRequest<string[]>(`/services/groups?category=${category}`),
      () => groupsFor(category),
    ),

  listLounges: (city?: City | 'all') =>
    withLocal(
      () =>
        apiRequest<typeof lounges>(
          city && city !== 'all' ? `/lounges?city=${encodeURIComponent(city)}` : '/lounges',
        ),
      () => filterLounges(city),
    ),

  getLounge: (id: string) =>
    withLocal(
      () => apiRequest<NonNullable<ReturnType<typeof getLounge>>>(`/lounges/${id}`),
      () => getLounge(id),
    ),

  giftCards: () =>
    withLocal(
      () => apiRequest<typeof giftCards>('/gifts'),
      () => giftCards,
    ),

  articles: () =>
    withLocal(
      () => apiRequest<typeof articles>('/journal'),
      () => articles,
    ),

  getArticle: (id: string) =>
    withLocal(
      () => apiRequest<NonNullable<ReturnType<typeof getArticle>>>(`/journal/${id}`),
      () => getArticle(id),
    ),

  faqs: () =>
    withLocal(
      () => apiRequest<typeof faqs>('/faqs'),
      () => faqs,
    ),

  about: () =>
    withLocal(
      async () => apiRequest<{ paragraphs: string[] }>('/about'),
      () => ({ paragraphs: aboutParagraphs }),
    ),

  care: () =>
    withLocal(
      async () => apiRequest<{ paragraphs: string[]; stats: typeof careStats }>('/care'),
      () => ({ paragraphs: careParagraphs, stats: careStats }),
    ),

  values: () =>
    withLocal(
      () => apiRequest<typeof values>('/values'),
      () => values,
    ),
};
