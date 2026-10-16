import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../../../components/atoms/PrimaryButton';
import { BottomSheet } from '../../../components/organisms/BottomSheet';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';

const ITEM = 44;
const VISIBLE = 5;

type Option = { id: number; label: string };

type Props = {
  visible: boolean;
  value: string;
  onChange: (iso: string) => void;
  onClose: () => void;
};

const months: Option[] = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  label: new Date(2000, index, 1).toLocaleDateString('en-GB', { month: 'short' }),
}));

function parse(iso: string) {
  const [year, month, day] = iso.split('-').map(Number);
  return { year: year || 1990, month: month || 1, day: day || 1 };
}

function Wheel({
  data,
  value,
  onChange,
}: {
  data: Option[];
  value: number;
  onChange: (id: number) => void;
}) {
  const index = Math.max(0, data.findIndex(item => item.id === value));
  return (
    <FlatList
      style={styles.column}
      data={data}
      keyExtractor={item => `${item.id}`}
      initialScrollIndex={Math.max(0, index - Math.floor(VISIBLE / 2))}
      getItemLayout={(_, itemIndex) => ({
        length: ITEM,
        offset: ITEM * itemIndex,
        index: itemIndex,
      })}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        const selected = item.id === value;
        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => onChange(item.id)}
            style={[styles.cell, selected && styles.cellOn]}>
            <Text style={[styles.cellText, selected && styles.cellTextOn]}>{item.label}</Text>
          </Pressable>
        );
      }}
    />
  );
}

export function BirthdaySheet({ visible, value, onChange, onClose }: Props) {
  const initial = parse(value);
  const [day, setDay] = useState(initial.day);
  const [month, setMonth] = useState(initial.month);
  const [year, setYear] = useState(initial.year);

  const years = useMemo(() => {
    const latest = new Date().getFullYear() - 12;
    return Array.from({ length: 80 }, (_, index) => ({
      id: latest - index,
      label: `${latest - index}`,
    }));
  }, []);
  const daysInMonth = new Date(year, month, 0).getDate();
  const days = useMemo(
    () => Array.from({ length: daysInMonth }, (_, index) => ({ id: index + 1, label: `${index + 1}` })),
    [daysInMonth],
  );
  const safeDay = Math.min(day, daysInMonth);

  const done = () => {
    const pad = (part: number) => `${part}`.padStart(2, '0');
    onChange(`${year}-${pad(month)}-${pad(safeDay)}`);
    onClose();
  };

  return (
    <BottomSheet visible={visible} title="Birthday" subtitle="Day, month, and year." onClose={onClose}>
      <View style={styles.wheels}>
        <Wheel data={days} value={safeDay} onChange={setDay} />
        <Wheel data={months} value={month} onChange={setMonth} />
        <Wheel data={years} value={year} onChange={setYear} />
      </View>
      <PrimaryButton title="Done" onPress={done} />
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  wheels: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
    marginBottom: 16,
  },
  column: {
    flex: 1,
    height: ITEM * VISIBLE,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.white,
  },
  cell: {
    height: ITEM,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellOn: {
    backgroundColor: colors.ink,
  },
  cellText: {
    ...typography.body,
    color: colors.ink,
  },
  cellTextOn: {
    color: colors.parchment,
    fontWeight: '700',
  },
});
