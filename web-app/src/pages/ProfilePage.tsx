import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '@shared/hooks/useBooking';
import { dialCodes, genders, validateProfile } from '@shared/services/profile.services';
import { formatBirthday } from '@shared/utils/dates';
import type { Profile } from '@shared/types/catalog';
import { profileApi } from '../api/adapters/profile';
import { Button, Field, PageHeader, Select, TextInput, Toast } from '../components/ui';
import { useToast } from '../hooks/useToast';

export function ProfilePage() {
  const navigate = useNavigate();
  const { profile, updateProfile } = useBooking();
  const [form, setForm] = useState<Profile>(profile);
  const [errors, setErrors] = useState<ReturnType<typeof validateProfile>>({});
  const { toast, show, dismiss } = useToast();

  function patch(next: Partial<Profile>) {
    setForm(current => ({ ...current, ...next }));
  }

  async function save() {
    const nextErrors = validateProfile(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      show('Please fix the highlighted fields', 'error');
      return;
    }
    try {
      await profileApi.updateRemote(form);
      updateProfile(form);
      show('Profile saved');
      navigate('/account');
    } catch {
      show('Could not save profile', 'error');
    }
  }

  return (
    <div style={{ maxWidth: 720 }}>
      <PageHeader kicker="Account" title="Edit profile" action={<Button onClick={() => void save()}>Save</Button>} />
      <div className="grid-2">
        <Field label="First name" error={errors.firstName}>
          <TextInput value={form.firstName} onChange={e => patch({ firstName: e.target.value })} />
        </Field>
        <Field label="Last name" error={errors.lastName}>
          <TextInput value={form.lastName} onChange={e => patch({ lastName: e.target.value })} />
        </Field>
        <Field label="Birthday" helper="YYYY-MM-DD" error={errors.dob}>
          <TextInput type="date" value={form.dob} onChange={e => patch({ dob: e.target.value })} />
        </Field>
        <Field label="Preview">
          <TextInput readOnly value={formatBirthday(form.dob) || '—'} />
        </Field>
        <Field label="Email" error={errors.email} helper="Used for booking confirmations on this device">
          <TextInput type="email" value={form.email} onChange={e => patch({ email: e.target.value })} />
        </Field>
        <Field label="Gender">
          <Select value={form.gender} onChange={e => patch({ gender: e.target.value })}>
            {genders.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </Select>
        </Field>
        <Field label="Country code">
          <Select value={form.dialCode} onChange={e => patch({ dialCode: e.target.value })}>
            {dialCodes.map(item => (
              <option key={item.id} value={item.id}>{item.flag} {item.id} · {item.label}</option>
            ))}
          </Select>
        </Field>
        <Field label="Phone" error={errors.phone}>
          <TextInput value={form.phone} onChange={e => patch({ phone: e.target.value })} />
        </Field>
      </div>
      {toast ? <Toast message={toast.message} tone={toast.tone} onDismiss={dismiss} /> : null}
    </div>
  );
}
