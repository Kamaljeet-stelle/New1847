import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBooking } from '@shared/hooks/useBooking';
import { hasErrors, priceBreakdown, validateBooking } from '@shared/services/booking.services';
import { getLounge, getService } from '@shared/services/catalog.services';
import { formatAed, priceLabel } from '@shared/data/bookingOptions';
import { formatClock, formatVisitDate } from '@shared/utils/dates';
import { bookingApi } from '../api/adapters/booking';
import { Button, Field, TextArea, TextInput, PageHeader, Toast } from '../components/ui';
import { useToast } from '../hooks/useToast';

export function ReviewPage() {
  const navigate = useNavigate();
  const { draft, updateDraft, saveBooking } = useBooking();
  const [agreed, setAgreed] = useState(false);
  const { toast, show, dismiss } = useToast();
  const service = getService(draft.serviceId);
  const lounge = getLounge(draft.loungeId);
  const breakdown = draft.priceAed == null ? null : priceBreakdown(draft.priceAed);

  if (!draft.serviceId || !draft.date || !draft.time) {
    return (
      <div className="empty card">
        <h3>Booking incomplete</h3>
        <p>Finish service and schedule first.</p>
        <Button onClick={() => navigate('/services')}>Start again</Button>
      </div>
    );
  }

  async function submit() {
    const errors = validateBooking(draft);
    if (hasErrors(errors)) {
      show(Object.values(errors)[0] ?? 'Check your details', 'error');
      return;
    }
    if (!agreed) {
      show('Please agree to the terms', 'error');
      return;
    }
    try {
      const remote = await bookingApi.createRemote(draft);
      const booking = remote ?? saveBooking();
      navigate(`/book/confirm/${booking.id}`, { state: { booking } });
    } catch {
      show('Could not save the booking. Try again.', 'error');
    }
  }

  return (
    <div>
      <PageHeader kicker="Booking" title="Review" lead="Confirm the visit details before you reserve." />
      <div className="card" style={{ background: 'var(--ink)', color: 'var(--parchment)', border: 'none', marginBottom: 18 }}>
        <p className="kicker" style={{ color: 'var(--copper)' }}>Visit</p>
        <h2 className="serif" style={{ margin: '8px 0 0', fontSize: 36 }}>{formatClock(draft.time)}</h2>
        <p>{formatVisitDate(draft.date)}</p>
        <p style={{ opacity: 0.75 }}>{lounge ? `${lounge.name}, ${lounge.city}` : 'Lounge'}</p>
      </div>

      <div className="card" style={{ marginBottom: 18 }}>
        <strong>{service?.name}</strong>
        <p style={{ color: 'var(--muted)', marginTop: 6 }}>
          {draft.variantName}
          {draft.addonName ? ` · ${draft.addonName}` : ''}
          {draft.staffName ? ` · ${draft.staffName}` : ''}
        </p>
        <p style={{ marginTop: 10 }}>{priceLabel(draft.priceAed)}</p>
      </div>

      <div className="grid-2" style={{ marginBottom: 16 }}>
        <Field label="Name">
          <TextInput value={draft.name} onChange={e => updateDraft({ name: e.target.value })} />
        </Field>
        <Field label="Email">
          <TextInput type="email" value={draft.email} onChange={e => updateDraft({ email: e.target.value })} />
        </Field>
        <Field label="Phone">
          <TextInput value={draft.phone} onChange={e => updateDraft({ phone: e.target.value })} />
        </Field>
      </div>
      <Field label="Notes">
        <TextArea value={draft.note} onChange={e => updateDraft({ note: e.target.value })} placeholder="Anything the lounge should know" />
      </Field>

      {breakdown ? (
        <div className="card" style={{ marginTop: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Subtotal</span><span>{formatAed(breakdown.subtotal)}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}><span>VAT 5%</span><span>{formatAed(breakdown.tax)}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontWeight: 700 }}><span>Total</span><span>{formatAed(breakdown.total)}</span></div>
        </div>
      ) : (
        <p style={{ color: 'var(--muted)', marginTop: 16 }}>Confirmed at the lounge</p>
      )}

      <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 18 }}>
        <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
        <span>
          I agree to the <Link to="/terms" style={{ textDecoration: 'underline' }}>terms</Link> for this reservation.
        </span>
      </label>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 22 }}>
        <Button disabled={!agreed} onClick={() => void submit()}>
          Book reservation
        </Button>
      </div>
      {toast ? <Toast message={toast.message} tone={toast.tone} onDismiss={dismiss} /> : null}
    </div>
  );
}
