import type { ImageSourcePropType } from 'react-native';
import type { ServiceCategory } from '../types/catalog';

export const serviceImages: Record<ServiceCategory, ImageSourcePropType> = {
  barber: require('../assets/services/barber.jpg'),
  hands: require('../assets/services/hands.jpg'),
  body: require('../assets/services/body.jpg'),
  face: require('../assets/services/face.jpg'),
};
