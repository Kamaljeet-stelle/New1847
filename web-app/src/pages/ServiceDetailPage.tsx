import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type { Service } from '@shared/types/catalog';
import { catalogApi } from '../api/adapters/catalog';
import { Button, PageHeader } from '../components/ui';
import { serviceImages } from '../media/images';

export function ServiceDetailPage() {
  const { serviceId = '' } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null | undefined>(undefined);

  useEffect(() => {
    void catalogApi.getService(serviceId).then(setService);
  }, [serviceId]);

  if (service === undefined) {
    return <div className="empty">Loading…</div>;
  }

  if (!service) {
    return (
      <div className="empty card">
        <h3>Service not found</h3>
        <p>This treatment is not on the menu.</p>
        <div style={{ marginTop: 16 }}>
          <Button onClick={() => navigate('/services')}>Back to services</Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 24 }} className="detail-grid">
      <img
        src={serviceImages[service.category]}
        alt=""
        style={{ width: '100%', minHeight: 420, objectFit: 'cover', borderRadius: 24 }}
      />
      <div>
        <PageHeader kicker={service.group} title={service.name} lead={service.summary} />
        <p style={{ color: 'var(--muted)' }}>Price list · {service.priceList}</p>
        <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
          <Button onClick={() => navigate(`/services/${service.category}`)}>Choose sitting</Button>
          <Link className="btn btn--ghost" to="/lounges">
            See lounges
          </Link>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
