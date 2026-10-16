import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';

const giftImage = require('../../../assets/gifts/father.jpg');

export function GiftBanner({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Shop gift cards"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.copy}>
        <Text style={styles.kicker}>Gift cards</Text>
        <Text style={styles.title}>Give someone a good hour.</Text>
        <View style={styles.cta}>
          <Text style={styles.ctaText}>Shop gifts</Text>
        </View>
      </View>
      <Image source={giftImage} resizeMode="cover" style={styles.image} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    height: 176,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: colors.ink,
  },
  pressed: {
    opacity: 0.92,
  },
  copy: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  kicker: {
    ...typography.label,
    color: colors.copper,
  },
  title: {
    ...typography.serifTitle,
    color: colors.parchment,
    marginTop: 8,
  },
  cta: {
    alignSelf: 'flex-start',
    marginTop: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.copper,
  },
  ctaText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.parchment,
  },
  image: {
    width: '42%',
    height: '100%',
  },
});
