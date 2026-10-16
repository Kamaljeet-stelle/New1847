import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';

type Props = {
  title: string;
  minutes?: number;
  detail?: string;
  price?: string;
  leading?: ReactNode;
  selected: boolean;
  multiple?: boolean;
  onPress: () => void;
};

export function SheetOption({
  title,
  minutes,
  detail,
  price,
  leading,
  selected,
  multiple = false,
  onPress,
}: Props) {
  return (
    <Pressable
      accessibilityRole={multiple ? 'checkbox' : 'radio'}
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        selected && styles.rowOn,
        pressed && styles.pressed,
      ]}>
      {leading}
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        {minutes !== undefined ? (
          <View style={styles.metaRow}>
            <MaterialDesignIcons name="clock-outline" size={13} color={colors.muted} />
            <Text style={styles.meta}>{minutes} min</Text>
          </View>
        ) : null}
        {detail ? <Text style={styles.meta}>{detail}</Text> : null}
      </View>
      <View style={styles.end}>
        {price ? <Text style={styles.price}>{price}</Text> : null}
        <View
          style={[
            multiple ? styles.box : styles.radio,
            selected && styles.markOn,
          ]}>
          {selected ? (
            <MaterialDesignIcons name="check-bold" size={13} color={colors.parchment} />
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    marginBottom: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.white,
  },
  rowOn: {
    borderColor: colors.copper,
    backgroundColor: colors.copperSoft,
  },
  pressed: {
    opacity: 0.86,
  },
  copy: {
    flex: 1,
  },
  title: {
    ...typography.cardTitle,
    fontSize: 15,
    color: colors.ink,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  meta: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 2,
  },
  end: {
    alignItems: 'flex-end',
    gap: 8,
  },
  price: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.ink,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: colors.placeholder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.placeholder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markOn: {
    backgroundColor: colors.copper,
    borderColor: colors.copper,
  },
});
