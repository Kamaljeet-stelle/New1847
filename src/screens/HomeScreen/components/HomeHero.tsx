import { Image, Pressable, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import { Wordmark } from '../../../components/atoms/Wordmark';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';

type Props = {
  image: ImageSourcePropType;
  greeting: string;
  firstName: string;
  nextVisit?: string;
  onBook: () => void;
  onVisit: () => void;
};

const fadeSteps = [300, 250, 200, 150, 100];

export function HomeHero({ image, greeting, firstName, nextVisit, onBook, onVisit }: Props) {
  return (
    <View style={styles.card}>
      <Image source={image} resizeMode="cover" style={styles.image} />
      <View style={styles.veil} />
      {fadeSteps.map(height => (
        <View key={height} style={[styles.fade, { height }]} />
      ))}

      <View style={styles.top}>
        {nextVisit ? (
          <Pressable accessibilityRole="button" onPress={onVisit} style={styles.chip}>
            <View style={styles.dot} />
            <Text style={styles.chipText} numberOfLines={1}>
              Next visit · {nextVisit}
            </Text>
          </Pressable>
        ) : (
          <View />
        )}
        <Wordmark size={22} light />
      </View>

      <View style={styles.copy}>
        <Text style={styles.greeting}>{greeting}</Text>
        <Text style={styles.title}>
          {firstName ? `${firstName},` : 'Welcome,'}
          {'\n'}
          <Text style={styles.titleSoft}>your chair is waiting.</Text>
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={onBook}
          style={({ pressed }) => [styles.cta, pressed && styles.pressed]}>
          <Text style={styles.ctaText}>Book a visit</Text>
          <View style={styles.ctaIcon}>
            <MaterialDesignIcons name="arrow-right" size={18} color={colors.parchment} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 400,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: colors.ink,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  veil: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(18, 16, 14, 0.2)',
  },
  fade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(18, 16, 14, 0.12)',
  },
  top: {
    position: 'absolute',
    top: 18,
    left: 18,
    right: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  chip: {
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: 'rgba(251, 248, 243, 0.16)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(251, 248, 243, 0.35)',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.copper,
  },
  chipText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.parchment,
    flexShrink: 1,
  },
  copy: {
    position: 'absolute',
    left: 22,
    right: 22,
    bottom: 52,
  },
  greeting: {
    ...typography.label,
    color: colors.copperSoft,
  },
  title: {
    ...typography.display,
    color: colors.white,
    marginTop: 10,
  },
  titleSoft: {
    color: 'rgba(255, 252, 248, 0.78)',
  },
  cta: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 6,
    paddingVertical: 6,
    borderRadius: 28,
    backgroundColor: colors.parchment,
  },
  pressed: {
    opacity: 0.88,
  },
  ctaText: {
    ...typography.button,
    color: colors.ink,
  },
  ctaIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ink,
  },
});
