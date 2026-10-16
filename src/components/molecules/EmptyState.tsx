import { StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../atoms/PrimaryButton';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

type Props = {
  title: string;
  body: string;
  action?: string;
  onAction?: () => void;
};

export function EmptyState({ title, body, action, onAction }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      {action && onAction ? (
        <PrimaryButton title={action} onPress={onAction} style={styles.button} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: 48,
    alignItems: 'flex-start',
  },
  title: {
    ...typography.sectionTitle,
    color: colors.ink,
  },
  body: {
    ...typography.body,
    color: colors.muted,
    marginTop: 8,
    marginBottom: 18,
  },
  button: {
    alignSelf: 'flex-start',
    minWidth: 160,
  },
});
