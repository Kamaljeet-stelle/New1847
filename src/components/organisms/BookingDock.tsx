import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PrimaryButton } from '../atoms/PrimaryButton';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

const DOCK_HEIGHT = 92;

type Props = {
  title: string;
  caption?: string;
  actionTitle: string;
  onAction: () => void;
  disabled?: boolean;
  children?: ReactNode;
};

export function useBookingDockSpace() {
  const insets = useSafeAreaInsets();
  return DOCK_HEIGHT + Math.max(insets.bottom, 12) + 16;
}

export function BookingDock({
  title,
  caption,
  actionTitle,
  onAction,
  disabled = false,
  children,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.dock, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      {children}
      <View style={styles.row}>
        <View style={styles.copy}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {caption ? (
            <Text style={styles.caption} numberOfLines={1}>
              {caption}
            </Text>
          ) : null}
        </View>
        <PrimaryButton
          title={actionTitle}
          onPress={onAction}
          disabled={disabled}
          style={styles.action}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dock: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 14,
    paddingHorizontal: 20,
    backgroundColor: colors.paper,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    shadowColor: colors.ink,
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: -6 },
    elevation: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  copy: {
    flex: 1,
  },
  title: {
    ...typography.sectionTitle,
    color: colors.ink,
  },
  caption: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 2,
  },
  action: {
    minWidth: 150,
  },
});
