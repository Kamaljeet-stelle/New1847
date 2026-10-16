import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';

export type QuickAction = {
  id: string;
  label: string;
  caption: string;
  icon: ComponentProps<typeof MaterialDesignIcons>['name'];
  onPress: () => void;
};

export function QuickActions({ actions }: { actions: QuickAction[] }) {
  return (
    <View style={styles.row}>
      {actions.map((action, index) => {
        const primary = index === 0;
        return (
          <Pressable
            key={action.id}
            accessibilityRole="button"
            accessibilityLabel={action.label}
            onPress={action.onPress}
            style={({ pressed }) => [
              styles.card,
              primary && styles.cardPrimary,
              pressed && styles.pressed,
            ]}>
            <View style={[styles.icon, primary && styles.iconPrimary]}>
              <MaterialDesignIcons
                name={action.icon}
                size={20}
                color={primary ? colors.ink : colors.copper}
              />
            </View>
            <Text style={[styles.label, primary && styles.labelPrimary]}>{action.label}</Text>
            <Text style={[styles.caption, primary && styles.captionPrimary]}>
              {action.caption}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  card: {
    flex: 1,
    padding: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.paper,
  },
  cardPrimary: {
    backgroundColor: colors.ink,
    borderColor: colors.ink,
  },
  pressed: {
    opacity: 0.88,
  },
  icon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.copperSoft,
    marginBottom: 14,
  },
  iconPrimary: {
    backgroundColor: colors.copper,
  },
  label: {
    ...typography.cardTitle,
    fontSize: 14,
    color: colors.ink,
  },
  labelPrimary: {
    color: colors.parchment,
  },
  caption: {
    ...typography.caption,
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },
  captionPrimary: {
    color: 'rgba(246, 241, 232, 0.7)',
  },
});
