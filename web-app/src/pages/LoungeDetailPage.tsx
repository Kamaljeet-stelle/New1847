import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Lounge } from '@shared/types/catalog';
import { useBooking } from '@shared/hooks/useBooking';
import { catalogApi } from '../api/adapters/catalog';
import { Button, PageHeader } from '../components/ui';

export function LoungeDetailPage() {
  const { loungeId = '' } = useParams();
  const navigate = useNavigate();
  const { setSelectedLounge } = useBooking();
  const [lounge, setLounge] = useState<Lounge | null | undefined>(undefined);

  useEffect(() => {
    void catalogApi.getLounge(loungeId).then(setLounge);
  }, [loungeId]);

  if (lounge === undefined) {
    return <div className="empty">Loading…</div>;
  }
  if (!lounge) {
    return <div className="empty card"><h3>Lounge not found</h3></div>;
  }

  return (
    <div className="card" style={{ maxWidth: 680 }}>
      <PageHeader kicker={lounge.city} title={lounge.name} lead={lounge.address} />
      <p><strong>Hours</strong> · {lounge.hours}</p>
      <p><strong>Phone</strong> · {lounge.phone}</p>
      <p><strong>Email</strong> · {lounge.email}</p>
      <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
        <Button
          onClick={() => {
            setSelectedLounge(lounge.id);
            navigate('/services');
          }}>
          Book this lounge
        </Button>
        <Button variant="ghost" onClick={() => navigate('/lounges')}>
          All lounges
        </Button>
      </div>
    </div>
  );
}
