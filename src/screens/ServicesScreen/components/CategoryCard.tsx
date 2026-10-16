import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';

type Props = {
  title: string;
  detail: string;
  image: ImageSourcePropType;
  onPress: () => void;
};

export function CategoryCard({ title, detail, image, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <Image source={image} resizeMode="cover" style={styles.image} />
      {/* <View style={styles.shadeSoft} /> */}
      <View style={styles.shade} />
      <View style={styles.copy}>
        <Text style={styles.detail} numberOfLines={2}>
          {detail}
        </Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 188,
    borderRadius: 18,
    marginBottom: 14,
    overflow: 'hidden',
    backgroundColor: colors.ink,
  },
  pressed: {
    opacity: 0.94,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  shadeSoft: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 52,
    height: 56,
    backgroundColor: 'rgba(18, 16, 14, 0.22)',
  },
  shade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 78,
    backgroundColor: 'rgba(18, 16, 14, 0.3)',
  },
  copy: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 14,
  },
  detail: {
    ...typography.caption,
    color: 'rgba(255, 252, 248, 0.86)',
    marginBottom: 2,
  },
  title: {
    ...typography.sectionTitle,
    fontSize: 22,
    lineHeight: 26,
    color: colors.white,
  },
});
