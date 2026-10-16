import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

type Props = {
  title: string;
  onPress: () => void;
};

export function TextButton({ title, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => pressed && styles.pressed}>
      <Text style={styles.label}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  label: {
    ...typography.label,
    color: colors.copper,
  },
  pressed: {
    opacity: 0.6,
  },
});
