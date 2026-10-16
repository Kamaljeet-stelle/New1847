import { Image, Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { serviceImages } from '../../../data/serviceImages';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { categoryLabels, type ServiceCategory } from '../../../types/catalog';

const categories = Object.keys(categoryLabels) as ServiceCategory[];

export function CategoryRail({ onPress }: { onPress: (category: ServiceCategory) => void }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}>
      {categories.map(category => (
        <Pressable
          key={category}
          accessibilityRole="button"
          accessibilityLabel={categoryLabels[category]}
          onPress={() => onPress(category)}
          style={({ pressed }) => [styles.item, pressed && styles.pressed]}>
          <Image source={serviceImages[category]} resizeMode="cover" style={styles.image} />
          <Text style={styles.label}>{categoryLabels[category]}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 16,
    paddingRight: 8,
  },
  item: {
    width: 78,
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
  image: {
    width: 74,
    height: 74,
    borderRadius: 37,
    borderWidth: 2,
    borderColor: colors.copperSoft,
    backgroundColor: colors.ink,
  },
  label: {
    ...typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: colors.ink,
    textAlign: 'center',
    marginTop: 8,
  },
});
