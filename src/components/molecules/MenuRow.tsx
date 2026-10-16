import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

type Props = {
  title: string;
  onPress: () => void;
  icon?: ComponentProps<typeof MaterialDesignIcons>['name'];
  danger?: boolean;
  last?: boolean;
};

export function MenuRow({ title, onPress, icon, danger = false, last = false }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        !last && styles.border,
        pressed && styles.pressed,
      ]}>
      {icon ? (
        <View style={styles.icon}>
          <MaterialDesignIcons name={icon} size={20} color={danger ? colors.error : colors.ink} />
        </View>
      ) : null}
      <Text style={[styles.title, danger && styles.danger]}>{title}</Text>
      {danger ? null : (
        <MaterialDesignIcons name="chevron-right" size={22} color={colors.placeholder} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 54,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  pressed: {
    backgroundColor: colors.overlay,
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.copperSoft,
  },
  title: {
    ...typography.body,
    color: colors.ink,
    flex: 1,
  },
  danger: {
    color: colors.error,
  },
});
