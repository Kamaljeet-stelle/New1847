import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

type Props = {
  kicker: string;
  title: string;
  subtitle?: string;
};

export function PageHeading({ kicker, title, subtitle }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.kicker}>{kicker}</Text>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  kicker: {
    ...typography.label,
    color: colors.copper,
  },
  title: {
    ...typography.screenTitle,
    color: colors.ink,
    marginTop: 8,
  },
  subtitle: {
    ...typography.body,
    color: colors.muted,
    marginTop: 10,
  },
});
