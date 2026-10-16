import { StyleSheet, Text, View } from 'react-native';
import { formatAed } from '../../data/bookingOptions';
import { priceBreakdown, vatRate } from '../../services/booking.services';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

type Props = {
  priceAed: number | null;
};

function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.label, strong && styles.strong]}>{label}</Text>
      <Text style={[styles.value, strong && styles.strong]}>{value}</Text>
    </View>
  );
}

export function PriceSummary({ priceAed }: Props) {
  if (priceAed == null) {
    return (
      <View style={styles.card}>
        <Row label="Price" value="Confirmed at the lounge" strong />
      </View>
    );
  }

  const { subtotal, tax, total } = priceBreakdown(priceAed);
  return (
    <View style={styles.card}>
      <Row label="Subtotal" value={formatAed(subtotal)} />
      <Row label={`VAT (${vatRate * 100}%)`} value={formatAed(tax)} />
      <View style={styles.rule} />
      <Row label="Total" value={formatAed(total)} strong />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.paper,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  label: {
    ...typography.body,
    fontSize: 15,
    color: colors.muted,
  },
  value: {
    ...typography.body,
    fontSize: 15,
    color: colors.ink,
  },
  strong: {
    fontWeight: '700',
    color: colors.ink,
  },
  rule: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.line,
    marginVertical: 8,
  },
});
