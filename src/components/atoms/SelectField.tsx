import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

type Props = {
  label?: string;
  helper?: string;
  value: string;
  placeholder?: string;
  icon?: ComponentProps<typeof MaterialDesignIcons>['name'];
  errorText?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export function SelectField({
  label,
  helper,
  value,
  placeholder,
  icon = 'chevron-down',
  errorText,
  onPress,
  style,
}: Props) {
  return (
    <View style={[styles.wrap, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      {helper ? <Text style={styles.helper}>{helper}</Text> : null}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        onPress={onPress}
        style={[styles.field, !!errorText && styles.errored]}>
        <Text style={[styles.value, !value && styles.placeholder]} numberOfLines={1}>
          {value || placeholder}
        </Text>
        <MaterialDesignIcons name={icon} size={20} color={colors.muted} />
      </Pressable>
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 14,
  },
  label: {
    ...typography.label,
    color: colors.muted,
    marginBottom: 8,
  },
  helper: {
    ...typography.caption,
    color: colors.placeholder,
    marginTop: -2,
    marginBottom: 8,
  },
  field: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  errored: {
    borderColor: colors.error,
  },
  value: {
    fontSize: 16,
    color: colors.ink,
    flex: 1,
  },
  placeholder: {
    color: colors.placeholder,
  },
  error: {
    marginTop: 6,
    color: colors.error,
    fontSize: 12,
  },
});
