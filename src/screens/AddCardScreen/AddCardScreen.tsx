import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { TextField } from '../../components/atoms/TextField';
import { ScreenScaffold } from '../../components/organisms/ScreenScaffold';
import { StackHeader } from '../../components/organisms/StackHeader';
import { useBooking } from '../../hooks/useBooking';
import { validateCard } from '../../services/profile.services';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import type { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'AddCard'>;

export function AddCardScreen({ navigation }: Props) {
  const { addCard } = useBooking();
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<Partial<Record<'number' | 'expiry' | 'name', string>>>({});

  const save = () => {
    const result = validateCard({ number, expiry, name });
    setErrors(result.errors);
    if (Object.keys(result.errors).length > 0) {
      return;
    }
    addCard({ brand: result.brand, last4: result.last4, expiry: expiry.trim() });
    setNumber('');
    Toast.show({ type: 'success', text1: 'Card saved on this device' });
    navigation.goBack();
  };

  return (
    <ScreenScaffold scroll>
      <StackHeader title="Add Card" onBack={() => navigation.goBack()} />
      <Text style={styles.note}>
        The full number is checked, then discarded. Only the brand, expiry, and last four digits stay on the phone.
      </Text>
      <TextField
        label="Card number"
        value={number}
        keyboardType="number-pad"
        errorText={errors.number}
        onChangeText={value => {
          setNumber(value);
          setErrors(current => ({ ...current, number: undefined }));
        }}
      />
      <TextField
        label="Expiry"
        value={expiry}
        placeholder="MM/YY"
        errorText={errors.expiry}
        onChangeText={value => {
          setExpiry(value);
          setErrors(current => ({ ...current, expiry: undefined }));
        }}
      />
      <TextField
        label="Name on card"
        value={name}
        errorText={errors.name}
        onChangeText={value => {
          setName(value);
          setErrors(current => ({ ...current, name: undefined }));
        }}
      />
      <PrimaryButton title="Save card" onPress={save} />
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  note: {
    ...typography.caption,
    color: colors.muted,
    marginBottom: 18,
  },
});
