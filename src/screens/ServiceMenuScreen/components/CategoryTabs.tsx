import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { categoryLabels, type ServiceCategory } from '../../../types/catalog';

const categories = Object.keys(categoryLabels) as ServiceCategory[];

type Props = {
  value: ServiceCategory;
  onChange: (category: ServiceCategory) => void;
};

export function CategoryTabs({ value, onChange }: Props) {
  return (
    <View style={styles.wrap}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map(category => {
          const selected = category === value;
          return (
            <Pressable
              key={category}
              accessibilityRole="tab"
              accessibilityState={{ selected }}
              onPress={() => onChange(category)}
              style={styles.tab}>
              <Text style={[styles.label, selected && styles.labelOn]}>
                {categoryLabels[category]}
              </Text>
              <View style={[styles.bar, selected && styles.barOn]} />
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    marginBottom: 14,
  },
  tab: {
    marginRight: 22,
    paddingTop: 6,
  },
  label: {
    ...typography.body,
    fontSize: 15,
    color: colors.placeholder,
  },
  labelOn: {
    color: colors.ink,
    fontWeight: '700',
  },
  bar: {
    height: 2,
    marginTop: 8,
    borderRadius: 1,
    backgroundColor: 'transparent',
  },
  barOn: {
    backgroundColor: colors.copper,
  },
});
