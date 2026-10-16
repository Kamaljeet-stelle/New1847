import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

type Props = TextInputProps & {
  label?: string;
  helper?: string;
  errorText?: string;
};

export function TextField({
  label,
  helper,
  errorText,
  style,
  onFocus,
  onBlur,
  ...inputProps
}: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.wrap}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      {helper ? <Text style={styles.helper}>{helper}</Text> : null}
      <TextInput
        accessibilityLabel={label}
        {...inputProps}
        placeholderTextColor={colors.placeholder}
        style={[
          styles.input,
          focused && styles.focused,
          !!errorText && styles.errored,
          style,
        ]}
        onFocus={event => {
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={event => {
          setFocused(false);
          onBlur?.(event);
        }}
      />
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
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.white,
    color: colors.ink,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    borderRadius: 10,
  },
  focused: {
    borderColor: colors.ink,
  },
  errored: {
    borderColor: colors.error,
  },
  error: {
    marginTop: 6,
    color: colors.error,
    fontSize: 12,
  },
});
