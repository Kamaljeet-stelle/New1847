import barber from '@assets/services/barber.jpg';
import hands from '@assets/services/hands.jpg';
import body from '@assets/services/body.jpg';
import face from '@assets/services/face.jpg';
import valentine from '@assets/gifts/valentine.jpg';
import thanks from '@assets/gifts/thanks.jpg';
import holidays from '@assets/gifts/holidays.jpg';
import father from '@assets/gifts/father.jpg';
import type { ServiceCategory } from '@shared/types/catalog';

export const serviceImages: Record<ServiceCategory, string> = {
  barber,
  hands,
  body,
  face,
};

export const giftImages: Record<string, string> = {
  valentine,
  thanks,
  holidays,
  father,
};

export const categoryCards: {
  id: ServiceCategory;
  title: string;
  detail: string;
}[] = [
  { id: 'barber', title: 'Barber', detail: 'Hair, beard, and the close shave' },
  { id: 'hands', title: 'Hands & Feet', detail: 'Manicure, pedicure, and the quiet finish' },
  { id: 'body', title: 'Body', detail: 'Massage, recovery, and hair removal' },
  { id: 'face', title: 'Face', detail: 'Facials, brows, and skin' },
];
