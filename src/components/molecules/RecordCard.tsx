import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

type Props = {
  title: string;
  subtitle?: string;
  meta?: string;
  badge?: string;
  selected?: boolean;
  onPress?: () => void;
};

export function RecordCard({
  title,
  subtitle,
  meta,
  badge,
  selected = false,
  onPress,
}: Props) {
  const body = (
    <View style={[styles.card, styles.fill, selected && styles.selected]}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        {badge ? <Text style={styles.badge}>{badge}</Text> : null}
      </View>
      {meta ? <Text style={styles.meta}>{meta}</Text> : null}
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );

  if (!onPress) {
    return body;
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [styles.fill, pressed && styles.pressed]}>
      {body}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  card: {
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  selected: {
    borderColor: colors.copper,
    backgroundColor: colors.copperSoft,
  },
  pressed: {
    opacity: 0.86,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  title: {
    ...typography.cardTitle,
    color: colors.ink,
    flex: 1,
  },
  badge: {
    ...typography.label,
    color: colors.copper,
  },
  meta: {
    ...typography.caption,
    color: colors.sage,
    marginTop: 6,
  },
  subtitle: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 8,
  },
});
