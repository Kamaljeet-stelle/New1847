import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';

type Props = {
  kicker: string;
  title: string;
  action?: string;
  onAction?: () => void;
};

export function SectionHeader({ kicker, title, action, onAction }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.copy}>
        <Text style={styles.kicker}>{kicker}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      {action && onAction ? (
        <Pressable accessibilityRole="button" hitSlop={10} onPress={onAction}>
          <Text style={styles.action}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 34,
    marginBottom: 14,
  },
  copy: {
    flex: 1,
  },
  kicker: {
    ...typography.label,
    color: colors.copper,
  },
  title: {
    ...typography.serifTitle,
    color: colors.ink,
    marginTop: 6,
  },
  action: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.ink,
    textDecorationLine: 'underline',
  },
});
