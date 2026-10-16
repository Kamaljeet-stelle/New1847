import { StyleSheet, Text, View } from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import { PrimaryButton } from '../../../components/atoms/PrimaryButton';
import { BottomSheet } from '../../../components/organisms/BottomSheet';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';

type Props = {
  visible: boolean;
  onDelete: () => void;
  onClose: () => void;
};

export function DeleteAccountSheet({ visible, onDelete, onClose }: Props) {
  return (
    <BottomSheet
      visible={visible}
      title="Delete your account"
      subtitle="We're sorry to see you go."
      onClose={onClose}>
      <View style={styles.notice}>
        <MaterialDesignIcons name="alert-circle-outline" size={20} color={colors.error} />
        <View style={styles.copy}>
          <Text style={styles.heading}>Before you go…</Text>
          <Text style={styles.body}>
            Deleting your account is permanent. Your profile, appointments, and saved cards
            cannot be recovered.
          </Text>
        </View>
      </View>
      <View style={styles.actions}>
        <PrimaryButton
          title="Initiate deletion"
          variant="outline"
          onPress={onDelete}
          style={styles.action}
        />
        <PrimaryButton title="Never mind" onPress={onClose} style={styles.action} />
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  notice: {
    flexDirection: 'row',
    gap: 10,
    padding: 14,
    marginTop: 18,
    borderRadius: 14,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
  },
  copy: {
    flex: 1,
  },
  heading: {
    ...typography.cardTitle,
    color: colors.ink,
  },
  body: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  action: {
    flex: 1,
  },
});
