import { memo } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import type { Service } from '../../../types/catalog';

type Props = {
  service: Service;
  image: ImageSourcePropType;
  added: boolean;
  onOpen: (service: Service) => void;
  onRemove: () => void;
};

export const ServiceRow = memo(function ServiceRowCard({
  service,
  image,
  added,
  onOpen,
  onRemove,
}: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={service.name}
      onPress={() => onOpen(service)}
      style={({ pressed }) => [
        styles.card,
        added && styles.cardOn,
        pressed && styles.pressed,
      ]}>
      <Image source={image} resizeMode="cover" style={styles.thumb} />
      <View style={styles.copy}>
        <Text style={styles.group}>{service.group}</Text>
        <Text style={styles.title}>{service.name}</Text>
        <Text style={styles.summary} numberOfLines={2}>
          {service.summary}
        </Text>
        <View style={styles.actions}>
          {added ? (
            <>
              <View style={styles.added}>
                <MaterialDesignIcons name="check" size={14} color={colors.copper} />
                <Text style={styles.addedText}>Added</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Remove ${service.name}`}
                hitSlop={10}
                onPress={onRemove}
                style={styles.remove}>
                <MaterialDesignIcons name="delete-outline" size={18} color={colors.muted} />
              </Pressable>
            </>
          ) : (
            <View style={styles.explore}>
              <Text style={styles.exploreText}>Explore</Text>
              <MaterialDesignIcons name="chevron-right" size={16} color={colors.ink} />
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 14,
    padding: 12,
    marginBottom: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.paper,
  },
  cardOn: {
    borderColor: colors.copper,
    backgroundColor: colors.copperSoft,
  },
  pressed: {
    opacity: 0.9,
  },
  thumb: {
    width: 92,
    height: 112,
    borderRadius: 12,
    backgroundColor: colors.ink,
  },
  copy: {
    flex: 1,
  },
  group: {
    ...typography.label,
    fontSize: 10,
    color: colors.copper,
  },
  title: {
    ...typography.cardTitle,
    color: colors.ink,
    marginTop: 4,
  },
  summary: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
    paddingTop: 8,
  },
  explore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingLeft: 12,
    paddingRight: 6,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.ink,
  },
  exploreText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.ink,
  },
  added: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addedText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.copper,
  },
  remove: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.paper,
  },
});
