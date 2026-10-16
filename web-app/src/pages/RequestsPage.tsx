import { useNavigate } from 'react-router-dom';
import { useBooking } from '@shared/hooks/useBooking';
import { Button, EmptyState, PageHeader } from '../components/ui';

export function RequestsPage() {
  const navigate = useNavigate();
  const { inquiries } = useBooking();

  return (
    <div>
      <PageHeader
        kicker="Account"
        title="Your requests"
        action={<Button size="sm" onClick={() => navigate('/contact')}>New request</Button>}
      />
      {inquiries.length === 0 ? (
        <EmptyState title="No requests yet" body="Messages you send from Contact or Shop appear here." action={<Button onClick={() => navigate('/contact')}>Contact</Button>} />
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {inquiries.map(item => (
            <article key={item.id} className="card">
              <p className="kicker">{item.kind}</p>
              <strong>{item.name}</strong>
              <p style={{ color: 'var(--muted)', marginTop: 6 }}>{item.message}</p>
              <p style={{ fontSize: 12, color: 'var(--placeholder)', marginTop: 8 }}>{new Date(item.createdAt).toLocaleString()}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
