import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { PrimaryButton } from '../atoms/PrimaryButton';
import { TextField } from '../atoms/TextField';
import { useBooking } from '../../hooks/useBooking';
import { hasErrors, validateInquiry } from '../../services/booking.services';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import type { InquiryErrors, InquiryKind } from '../../types/catalog';
import type { RootStackParamList } from '../../types/navigation';

type Props = {
  kind: InquiryKind;
  messageLabel: string;
  submitLabel: string;
};

const empty = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

export function InquiryForm({ kind, messageLabel, submitLabel }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { saveInquiry } = useBooking();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<InquiryErrors>({});

  const setField = (key: keyof typeof empty, value: string) => {
    setForm(current => ({ ...current, [key]: value }));
    setErrors(current => ({ ...current, [key]: undefined }));
  };

  const onSubmit = () => {
    const nextErrors = validateInquiry(form);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      return;
    }
    saveInquiry({ kind, ...form });
    setForm(empty);
    Toast.show({ type: 'success', text1: 'Request saved on this device' });
    navigation.navigate('Requests');
  };

  return (
    <>
      <TextField
        label="Full name"
        value={form.name}
        errorText={errors.name}
        onChangeText={value => setField('name', value)}
      />
      <TextField
        label="Email"
        value={form.email}
        autoCapitalize="none"
        keyboardType="email-address"
        errorText={errors.email}
        onChangeText={value => setField('email', value)}
      />
      <TextField
        label="Phone number"
        value={form.phone}
        keyboardType="phone-pad"
        errorText={errors.phone}
        onChangeText={value => setField('phone', value)}
      />
      <TextField
        label={messageLabel}
        value={form.message}
        multiline
        errorText={errors.message}
        onChangeText={value => setField('message', value)}
        style={styles.message}
      />
      <PrimaryButton title={submitLabel} onPress={onSubmit} />
      <Text style={styles.note}>
        This stays on the phone until a lounge confirms it. It is not a live
        booking system.
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  message: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
  note: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 14,
  },
});
