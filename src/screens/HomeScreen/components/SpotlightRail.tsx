import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { serviceImages } from '../../../data/serviceImages';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import type { Service } from '../../../types/catalog';

const CARD_WIDTH = 248;
const GAP = 12;
const fadeSteps = [120];

type Props = {
  services: Service[];
  onPress: (service: Service) => void;
};

export function SpotlightRail({ services, onPress }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={CARD_WIDTH + GAP}
      decelerationRate="fast"
      contentContainerStyle={styles.row}>
      {services.map(service => (
        <Pressable
          key={service.id}
          accessibilityRole="button"
          accessibilityLabel={service.name}
          onPress={() => onPress(service)}
          style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
          <Image source={serviceImages[service.category]} resizeMode="cover" style={styles.image} />
          {fadeSteps.map(height => (
            <View key={height} style={[styles.shade, { height }]} />
          ))}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>New</Text>
          </View>
          <View style={styles.copy}>
            <Text style={styles.group}>{service.group}</Text>
            <Text style={styles.title}>{service.name}</Text>
            <Text style={styles.summary} numberOfLines={2}>
              {service.summary}
            </Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: GAP,
    paddingRight: 8,
  },
  card: {
    width: CARD_WIDTH,
    height: 300,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: colors.ink,
  },
  pressed: {
    opacity: 0.92,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  shade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(18, 16, 14, 0.2)',
  },
  badge: {
    position: 'absolute',
    top: 14,
    left: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: colors.parchment,
  },
  badgeText: {
    ...typography.label,
    fontSize: 10,
    color: colors.ink,
  },
  copy: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
  },
  group: {
    ...typography.label,
    fontSize: 10,
    color: colors.copperSoft,
  },
  title: {
    ...typography.serifTitle,
    color: colors.white,
    marginTop: 6,
  },
  summary: {
    ...typography.caption,
    color: 'rgba(255, 252, 248, 0.8)',
    marginTop: 4,
  },
});
