import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import { serviceImages } from '../../../data/serviceImages';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import type { Service } from '../../../types/catalog';

type Props = {
  services: Service[];
  onPress: (service: Service) => void;
};

export function SignatureList({ services, onPress }: Props) {
  return (
    <View style={styles.group}>
      {services.map((service, index) => (
        <Pressable
          key={service.id}
          accessibilityRole="button"
          accessibilityLabel={service.name}
          onPress={() => onPress(service)}
          style={({ pressed }) => [
            styles.row,
            index < services.length - 1 && styles.rule,
            pressed && styles.pressed,
          ]}>
          <Image source={serviceImages[service.category]} resizeMode="cover" style={styles.thumb} />
          <View style={styles.copy}>
            <Text style={styles.kicker}>{service.group}</Text>
            <Text style={styles.title}>{service.name}</Text>
            <Text style={styles.summary} numberOfLines={1}>
              {service.summary}
            </Text>
          </View>
          <View style={styles.arrow}>
            <MaterialDesignIcons name="arrow-right" size={16} color={colors.ink} />
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.paper,
    paddingHorizontal: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
  },
  rule: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  pressed: {
    opacity: 0.8,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: colors.ink,
  },
  copy: {
    flex: 1,
  },
  kicker: {
    ...typography.label,
    fontSize: 10,
    color: colors.copper,
  },
  title: {
    ...typography.cardTitle,
    color: colors.ink,
    marginTop: 3,
  },
  summary: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 2,
  },
  arrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.copperSoft,
  },
});
