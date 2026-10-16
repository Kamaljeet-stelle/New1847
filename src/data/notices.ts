import { referralOffer } from '../screens/ReferralScreen/data';
import type { InboxItem } from '../types/catalog';
import { services } from './services';

type FeedNotice = Omit<InboxItem, 'at'> & { hoursAgo: number };

const seasonal = services.find(service => service.newest);

const feed: FeedNotice[] = [
  ...(seasonal
    ? [
        {
          id: `season-${seasonal.id}`,
          kind: 'offer' as const,
          title: `New this season: ${seasonal.name}`,
          body: seasonal.summary,
          cta: 'Explore treatment',
          target: { screen: 'ServiceDetail' as const, serviceId: seasonal.id },
          image: seasonal.category,
          hoursAgo: 2,
        },
      ]
    : []),
  {
    id: 'welcome',
    kind: 'lounge',
    title: 'Welcome to 1847',
    body: 'Your account is ready. Save your details once and book any lounge in a few taps.',
    cta: 'Book a visit',
    target: { screen: 'Services' },
    hoursAgo: 5,
  },
  {
    id: 'gift-cards',
    kind: 'offer',
    title: 'Gift a good hour',
    body: 'Gift cards for birthdays, thank-yous and every occasion in between.',
    cta: 'Shop gift cards',
    target: { screen: 'Shop' },
    image: 'gift',
    hoursAgo: 28,
  },
  {
    id: 'care-tips',
    kind: 'lounge',
    title: 'Care between visits',
    body: 'Simple routines to keep your cut, beard and skin sharp at home.',
    cta: 'Read the guide',
    target: { screen: 'Care' },
    hoursAgo: 52,
  },
  {
    id: 'referral',
    kind: 'offer',
    title: `Share 1847, get AED ${referralOffer.creditAed}`,
    body: `Friends get AED ${referralOffer.friendAed} off their first service, and you earn credit after their visit.`,
    cta: 'Invite a friend',
    target: { screen: 'Referral' },
    hoursAgo: 96,
  },
  {
    id: 'journal',
    kind: 'lounge',
    title: 'From the Journal',
    body: 'Fresh notes on grooming rituals and life inside the lounge.',
    cta: 'Open the Journal',
    target: { screen: 'Journal' },
    hoursAgo: 200,
  },
];

export function feedNotices(now: Date): InboxItem[] {
  return feed.map(({ hoursAgo, ...notice }) => ({
    ...notice,
    at: new Date(now.getTime() - hoursAgo * 3600000).toISOString(),
  }));
}
