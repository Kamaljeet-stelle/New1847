import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '@shared/hooks/useBooking';
import { cardBrand, validateCard } from '@shared/services/profile.services';
import { Button, EmptyState, Field, Modal, PageHeader, TextInput, Toast } from '../components/ui';
import { useToast } from '../hooks/useToast';

export function PaymentsPage() {
  const navigate = useNavigate();
  const { cards, addCard, removeCard } = useBooking();
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<Partial<Record<'number' | 'expiry' | 'name', string>>>({});
  const { toast, show, dismiss } = useToast();

  function saveCard() {
    const result = validateCard({ number, expiry, name });
    setErrors(result.errors);
    if (Object.keys(result.errors).length > 0) {
      show('Check the card details', 'error');
      return;
    }
    addCard({
      brand: result.brand || cardBrand(number),
      last4: result.last4,
      expiry: expiry.trim(),
    });
    setOpen(false);
    setNumber('');
    setExpiry('');
    setName('');
    show('Card saved on this device');
  }

  return (
    <div>
      <PageHeader
        kicker="Payments"
        title="Saved cards"
        lead="Only the last four digits are stored locally. Full numbers are never kept."
        action={<Button size="sm" onClick={() => setOpen(true)}>Add card</Button>}
      />
      {cards.length === 0 ? (
        <EmptyState title="No cards yet" body="Add a card to keep it handy for lounge visits." action={<Button onClick={() => setOpen(true)}>Add card</Button>} />
      ) : (
        <div className="grid-2">
          {cards.map(card => (
            <article key={card.id} className="card">
              <p className="kicker">{card.brand}</p>
              <h3 className="serif" style={{ margin: '8px 0 0' }}>•••• {card.last4}</h3>
              <p style={{ color: 'var(--muted)', marginTop: 6 }}>Expires {card.expiry}</p>
              <Button variant="ghost" size="sm" style={{ marginTop: 14 }} onClick={() => removeCard(card.id)}>
                Remove
              </Button>
            </article>
          ))}
        </div>
      )}
      <Button variant="ghost" style={{ marginTop: 18 }} onClick={() => navigate('/account')}>
        Back to account
      </Button>

      <Modal open={open} title="Add card" onClose={() => setOpen(false)}>
        <Field label="Name on card" error={errors.name}>
          <TextInput value={name} onChange={e => setName(e.target.value)} />
        </Field>
        <Field label="Card number" error={errors.number} helper="Processed on this device only; we store last 4 digits.">
          <TextInput value={number} onChange={e => setNumber(e.target.value)} inputMode="numeric" autoComplete="cc-number" />
        </Field>
        <Field label="Expiry MM/YY" error={errors.expiry}>
          <TextInput value={expiry} onChange={e => setExpiry(e.target.value)} placeholder="MM/YY" />
        </Field>
        <Button style={{ marginTop: 16 }} onClick={saveCard}>
          Save card
        </Button>
      </Modal>
      {toast ? <Toast message={toast.message} tone={toast.tone} onDismiss={dismiss} /> : null}
    </div>
  );
}
