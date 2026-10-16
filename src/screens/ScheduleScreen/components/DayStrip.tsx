import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import type { DayOption } from '../../../utils/dates';

type Props = {
  days: DayOption[];
  value: string;
  onChange: (id: string) => void;
};

export function DayStrip({ days, value, onChange }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}>
      {days.map(day => {
        const selected = day.id === value;
        return (
          <Pressable
            key={day.id}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => onChange(day.id)}
            style={[styles.day, selected && styles.dayOn]}>
            <Text style={[styles.weekday, selected && styles.textOn]}>{day.weekday}</Text>
            <Text style={[styles.number, selected && styles.textOn]}>{day.day}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 10,
    paddingVertical: 4,
  },
  day: {
    width: 58,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.paper,
  },
  dayOn: {
    backgroundColor: colors.ink,
    borderColor: colors.ink,
  },
  weekday: {
    ...typography.label,
    fontSize: 10,
    color: colors.muted,
  },
  number: {
    ...typography.sectionTitle,
    color: colors.ink,
    marginTop: 6,
  },
  textOn: {
    color: colors.parchment,
  },
});
