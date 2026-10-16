import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { formatClock, type SlotSection } from '../../../utils/dates';

type Props = {
  sections: SlotSection[];
  value: string;
  onChange: (slot: string) => void;
};

export function SlotGrid({ sections, value, onChange }: Props) {
  if (!sections.length) {
    return <Text style={styles.empty}>No times left on this day. Try another day.</Text>;
  }

  return (
    <View>
      {sections.map(section => (
        <View key={section.id} style={styles.section}>
          <Text style={styles.label}>{section.label}</Text>
          <View style={styles.grid}>
            {section.slots.map(slot => {
              const selected = slot === value;
              return (
                <Pressable
                  key={slot}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  onPress={() => onChange(slot)}
                  style={[styles.slot, selected && styles.slotOn]}>
                  <Text style={[styles.slotText, selected && styles.slotTextOn]}>
                    {formatClock(slot)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 20,
  },
  label: {
    ...typography.label,
    color: colors.muted,
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  slot: {
    width: '31%',
    paddingVertical: 13,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.paper,
  },
  slotOn: {
    backgroundColor: colors.copper,
    borderColor: colors.copper,
  },
  slotText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.ink,
  },
  slotTextOn: {
    color: colors.white,
  },
  empty: {
    ...typography.body,
    color: colors.muted,
    marginTop: 24,
  },
});
