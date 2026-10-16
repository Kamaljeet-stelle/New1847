import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { SelectField } from '../../components/atoms/SelectField';
import { TextField } from '../../components/atoms/TextField';
import { OptionSheet } from '../../components/organisms/OptionSheet';
import { ScreenScaffold } from '../../components/organisms/ScreenScaffold';
import { StackHeader } from '../../components/organisms/StackHeader';
import { useBooking } from '../../hooks/useBooking';
import {
  dialCodes,
  genders,
  validateProfile,
  type ProfileErrors,
} from '../../services/profile.services';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import type { Profile } from '../../types/catalog';
import type { RootStackParamList } from '../../types/navigation';
import { formatBirthday } from '../../utils/dates';
import { BirthdaySheet } from './components/BirthdaySheet';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;
type Sheet = 'birthday' | 'dial' | 'gender' | null;

const dialOptions = dialCodes.map(code => ({
  id: code.id,
  label: code.label,
  leading: code.flag,
  detail: code.id,
}));
const genderOptions = genders.map(gender => ({ id: gender, label: gender }));

export function EditProfileScreen({ navigation }: Props) {
  const { profile, updateProfile } = useBooking();
  const [form, setForm] = useState<Profile>(profile);
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [sheet, setSheet] = useState<Sheet>(null);
  const dial = dialCodes.find(code => code.id === form.dialCode);

  const setField = (key: keyof Profile, value: string) => {
    setForm(current => ({ ...current, [key]: value }));
    setErrors(current => ({ ...current, [key]: undefined }));
  };

  const save = () => {
    const nextErrors = validateProfile(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    updateProfile(form);
    Toast.show({ type: 'success', text1: 'Profile saved' });
    navigation.goBack();
  };

  return (
    <ScreenScaffold scroll>
      <StackHeader
        title="Edit Profile"
        onBack={() => navigation.goBack()}
        actionTitle="Save"
        onAction={save}
      />

      <View style={styles.row}>
        <View style={styles.half}>
          <TextField
            label="First name *"
            value={form.firstName}
            textContentType="givenName"
            errorText={errors.firstName}
            onChangeText={value => setField('firstName', value)}
          />
        </View>
        <View style={styles.half}>
          <TextField
            label="Last name *"
            value={form.lastName}
            textContentType="familyName"
            errorText={errors.lastName}
            onChangeText={value => setField('lastName', value)}
          />
        </View>
      </View>

      <SelectField
        label="Birthday *"
        helper="You can edit your birthday here."
        value={formatBirthday(form.dob)}
        placeholder="Choose a date"
        icon="calendar-blank-outline"
        errorText={errors.dob}
        onPress={() => setSheet('birthday')}
      />

      <TextField
        label="Email *"
        helper="You'll always receive messages about your appointments."
        value={form.email}
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        errorText={errors.email}
        onChangeText={value => setField('email', value)}
      />

      <Text style={styles.label}>Phone number *</Text>
      <Text style={styles.helper}>
        By adding your number you agree to receive text messages. Message and data rates may apply.
      </Text>
      <View style={styles.row}>
        <SelectField
          value={dial ? `${dial.flag}  ${dial.id}` : form.dialCode}
          onPress={() => setSheet('dial')}
          style={styles.dial}
        />
        <View style={styles.phone}>
          <TextField
            value={form.phone}
            placeholder="Mobile number"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            errorText={errors.phone}
            onChangeText={value => setField('phone', value)}
          />
        </View>
      </View>

      <SelectField
        label="Gender"
        value={form.gender}
        placeholder="Choose"
        onPress={() => setSheet('gender')}
      />

      <BirthdaySheet
        visible={sheet === 'birthday'}
        value={form.dob}
        onChange={value => setField('dob', value)}
        onClose={() => setSheet(null)}
      />
      <OptionSheet
        visible={sheet === 'dial'}
        title="Country code"
        options={dialOptions}
        value={form.dialCode}
        onChange={value => setField('dialCode', value)}
        onClose={() => setSheet(null)}
      />
      <OptionSheet
        visible={sheet === 'gender'}
        title="Gender"
        options={genderOptions}
        value={form.gender}
        onChange={value => setField('gender', value)}
        onClose={() => setSheet(null)}
      />
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  half: {
    flex: 1,
  },
  label: {
    ...typography.label,
    color: colors.muted,
    marginBottom: 8,
  },
  helper: {
    ...typography.caption,
    color: colors.placeholder,
    marginTop: -2,
    marginBottom: 8,
  },
  dial: {
    width: 118,
  },
  phone: {
    flex: 1,
  },
});
