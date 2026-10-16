import type { ImageSourcePropType } from 'react-native';
import { serviceImages } from '../../data/serviceImages';
import type { ServiceCategory } from '../../types/catalog';

export const categoryCards: {
  id: ServiceCategory;
  title: string;
  detail: string;
  image: ImageSourcePropType;
}[] = [
  {
    id: 'barber',
    title: 'Barber',
    detail: 'Hair, beard, and the close shave',
    image: serviceImages.barber,
  },
  {
    id: 'hands',
    title: 'Hands & Feet',
    detail: 'Manicure, pedicure, and the quiet finish',
    image: serviceImages.hands,
  },
  {
    id: 'body',
    title: 'Body',
    detail: 'Massage, recovery, and hair removal',
    image: serviceImages.body,
  },
  {
    id: 'face',
    title: 'Face',
    detail: 'Facials, brows, and skin',
    image: serviceImages.face,
  },
];
