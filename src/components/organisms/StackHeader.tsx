import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BackArrow } from '../atoms/BackArrow';
import { Wordmark } from '../atoms/Wordmark';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

type Props = {
  title?: string;
  onBack?: () => void;
  actionTitle?: string;
  onAction?: () => void;
};

export function StackHeader({ title, onBack, actionTitle, onAction }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.bar}>
        {onBack ? <BackArrow onPress={onBack} /> : <View style={styles.side} />}
        <Wordmark size={30} />
        <View style={styles.side} />
      </View>
      {title ? (
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
          {actionTitle && onAction ? (
            <Pressable
              accessibilityRole="button"
              hitSlop={10}
              onPress={onAction}
              style={({ pressed }) => [styles.action, pressed && styles.pressed]}>
              <Text style={styles.actionText}>{actionTitle}</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingBottom: 8,
  },
  bar: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  side: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
  },
  title: {
    ...typography.screenTitle,
    color: colors.ink,
    flexShrink: 1,
  },
  action: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: colors.ink,
  },
  pressed: {
    opacity: 0.8,
  },
  actionText: {
    ...typography.button,
    color: colors.parchment,
  },
});
