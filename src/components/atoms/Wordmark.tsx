import { Platform, StyleSheet, Text } from 'react-native';
import { colors } from '../../theme/colors';

type Props = {
  size?: number;
  light?: boolean;
};

export function Wordmark({ size = 34, light = false }: Props) {
  return (
    <Text
      style={[
        styles.mark,
        { fontSize: size, lineHeight: size + 6 },
        light && styles.light,
      ]}>
      1847
    </Text>
  );
}

const styles = StyleSheet.create({
  mark: {
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    color: colors.ink,
    letterSpacing: 0.5,
  },
  light: {
    color: colors.parchment,
  },
});
