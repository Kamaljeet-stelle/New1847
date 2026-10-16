import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type { GiftCard } from '@shared/types/catalog';
import { catalogApi } from '../api/adapters/catalog';
import { Button, Field, PageHeader, TextArea, TextInput, Toast } from '../components/ui';
import { useToast } from '../hooks/useToast';
import { giftImages } from '../media/images';
import { useBooking } from '@shared/hooks/useBooking';
import { hasErrors, validateInquiry } from '@shared/services/booking.services';

export function ShopPage() {
  const { occasion } = useParams();
  const navigate = useNavigate();
  const { profile, saveInquiry } = useBooking();
  const [cards, setCards] = useState<GiftCard[]>([]);
  const [name, setName] = useState(profile.firstName);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [message, setMessage] = useState('');
  const { toast, show, dismiss } = useToast();

  useEffect(() => {
    void catalogApi.giftCards().then(setCards);
  }, []);

  const selected = occasion ? cards.find(card => card.id === occasion) : null;

  function submitVoucher() {
    const draft = {
      kind: 'voucher' as const,
      name,
      email,
      phone,
      message: message || `Interested in ${selected?.title ?? 'a gift card'}`,
    };
    const errors = validateInquiry(draft);
    if (hasErrors(errors)) {
      show(Object.values(errors)[0] ?? 'Check the form', 'error');
      return;
    }
    saveInquiry(draft);
    show('Request sent. The lounge will follow up.');
    navigate('/requests');
  }

  if (selected) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="shop-detail">
        <img src={giftImages[selected.id]} alt="" style={{ width: '100%', minHeight: 360, objectFit: 'cover', borderRadius: 24 }} />
        <div>
          <PageHeader kicker="Gift card" title={selected.title} lead={selected.note} />
          <div className="grid-2">
            <Field label="Name"><TextInput value={name} onChange={e => setName(e.target.value)} /></Field>
            <Field label="Email"><TextInput value={email} onChange={e => setEmail(e.target.value)} /></Field>
            <Field label="Phone"><TextInput value={phone} onChange={e => setPhone(e.target.value)} /></Field>
          </div>
          <Field label="Message" helper="Optional note for the lounge">
            <TextArea value={message} onChange={e => setMessage(e.target.value)} />
          </Field>
          <Button style={{ marginTop: 16 }} onClick={submitVoucher}>Request this card</Button>
        </div>
        {toast ? <Toast message={toast.message} tone={toast.tone} onDismiss={dismiss} /> : null}
        <style>{`@media (max-width: 900px) { .shop-detail { grid-template-columns: 1fr !important; } }`}</style>
      </div>
    );
  }

  return (
    <div>
      <PageHeader kicker="Shop" title="Gift cards" lead="Give someone a good hour at 1847." />
      <div className="grid-2">
        {cards.map(card => (
          <Link
            key={card.id}
            to={`/shop/${card.id}`}
            className="card"
            style={{ padding: 0, overflow: 'hidden', minHeight: 220, position: 'relative', color: 'var(--white)', border: 'none' }}>
            <img src={giftImages[card.id]} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent, rgba(18,16,14,0.7))' }} />
            <div style={{ position: 'relative', padding: 22, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <h2 className="serif" style={{ margin: 0, fontSize: 28 }}>{card.title}</h2>
              <p style={{ marginTop: 6, opacity: 0.85 }}>{card.note}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
