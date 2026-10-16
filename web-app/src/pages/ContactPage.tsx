import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useBooking } from '@shared/hooks/useBooking';
import { hasErrors, validateInquiry } from '@shared/services/booking.services';
import type { InquiryKind } from '@shared/types/catalog';
import { Button, Field, PageHeader, Select, TextArea, TextInput, Toast } from '../components/ui';
import { useToast } from '../hooks/useToast';

const kinds: { id: InquiryKind; label: string }[] = [
  { id: 'question', label: 'Question' },
  { id: 'voucher', label: 'Voucher' },
  { id: 'franchise', label: 'Franchise' },
];

export function ContactPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { profile, saveInquiry } = useBooking();
  const initialKind = (params.get('kind') as InquiryKind) || 'question';
  const [kind, setKind] = useState<InquiryKind>(kinds.some(item => item.id === initialKind) ? initialKind : 'question');
  const [name, setName] = useState(`${profile.firstName} ${profile.lastName}`.trim());
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [message, setMessage] = useState(params.get('prompt') ?? '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast, show, dismiss } = useToast();

  function submit() {
    const draft = { kind, name, email, phone, message };
    const nextErrors = validateInquiry(draft);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      show('Please complete the form', 'error');
      return;
    }
    saveInquiry(draft);
    show('Message sent');
    navigate('/requests');
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <PageHeader kicker="Contact" title="Write to the lounge" lead="We keep inquiries on this device until a backend is connected." />
      <Field label="Topic">
        <Select value={kind} onChange={e => setKind(e.target.value as InquiryKind)}>
          {kinds.map(item => (
            <option key={item.id} value={item.id}>{item.label}</option>
          ))}
        </Select>
      </Field>
      <div className="grid-2" style={{ marginTop: 12 }}>
        <Field label="Name" error={errors.name}><TextInput value={name} onChange={e => setName(e.target.value)} /></Field>
        <Field label="Email" error={errors.email}><TextInput value={email} onChange={e => setEmail(e.target.value)} /></Field>
        <Field label="Phone" error={errors.phone}><TextInput value={phone} onChange={e => setPhone(e.target.value)} /></Field>
      </div>
      <Field label="Message" error={errors.message}>
        <TextArea value={message} onChange={e => setMessage(e.target.value)} />
      </Field>
      <Button style={{ marginTop: 16 }} onClick={submit}>Send</Button>
      {toast ? <Toast message={toast.message} tone={toast.tone} onDismiss={dismiss} /> : null}
    </div>
  );
}
