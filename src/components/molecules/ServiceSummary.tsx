import { Image, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

type Props = {
  image: ImageSourcePropType;
  title: string;
  lines: string[];
  price?: string;
};

export function ServiceSummary({ image, title, lines, price }: Props) {
  return (
    <View style={styles.card}>
      <Image source={image} resizeMode="cover" style={styles.thumb} />
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        {lines.map(line => (
          <Text key={line} style={styles.line}>
            {line}
          </Text>
        ))}
      </View>
      {price ? <Text style={styles.price}>{price}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.paper,
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.ink,
  },
  copy: {
    flex: 1,
  },
  title: {
    ...typography.cardTitle,
    color: colors.ink,
  },
  line: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 2,
  },
  price: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.ink,
  },
});
