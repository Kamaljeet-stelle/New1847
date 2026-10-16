import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { BottomSheet } from './BottomSheet';

export type SheetOptionItem = {
  id: string;
  label: string;
  leading?: string;
  detail?: string;
};

type Props = {
  visible: boolean;
  title: string;
  options: SheetOptionItem[];
  value: string;
  onChange: (id: string) => void;
  onClose: () => void;
};

export function OptionSheet({ visible, title, options, value, onChange, onClose }: Props) {
  return (
    <BottomSheet visible={visible} title={title} onClose={onClose}>
      <ScrollView style={styles.list}>
        {options.map(option => {
          const selected = option.id === value;
          return (
            <Pressable
              key={option.id}
              accessibilityRole="radio"
              accessibilityState={{ checked: selected }}
              onPress={() => {
                onChange(option.id);
                onClose();
              }}
              style={[styles.row, selected && styles.rowOn]}>
              {option.leading ? <Text style={styles.leading}>{option.leading}</Text> : null}
              <Text style={styles.label}>{option.label}</Text>
              {option.detail ? <Text style={styles.detail}>{option.detail}</Text> : null}
              {selected ? (
                <MaterialDesignIcons name="check" size={20} color={colors.copper} />
              ) : null}
            </Pressable>
          );
        })}
      </ScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 14,
  },
  row: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.white,
  },
  rowOn: {
    borderColor: colors.copper,
    backgroundColor: colors.copperSoft,
  },
  leading: {
    fontSize: 20,
  },
  label: {
    ...typography.body,
    color: colors.ink,
    flex: 1,
  },
  detail: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.muted,
  },
});
