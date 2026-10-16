import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import type { Service } from '@shared/types/catalog';
import { catalogApi } from '../api/adapters/catalog';
import { PageHeader } from '../components/ui';
import { categoryCards, serviceImages } from '../media/images';

export function ServicesPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const query = params.get('q') ?? '';
  const [results, setResults] = useState<Service[]>([]);

  useEffect(() => {
    void catalogApi.searchServices(query).then(setResults);
  }, [query]);

  const grouped = useMemo(() => {
    if (!query.trim()) {
      return [];
    }
    return results;
  }, [query, results]);

  return (
    <div>
      <PageHeader
        kicker="Services"
        title={query.trim() ? `Results for “${query}”` : 'The menu'}
        lead="Choose a category, or search for a cut, massage, or facial."
      />

      {!query.trim() ? (
        <div className="grid-2">
          {categoryCards.map(card => (
            <button
              key={card.id}
              type="button"
              className="card"
              style={{
                display: 'grid',
                gridTemplateColumns: '140px 1fr',
                gap: 16,
                padding: 0,
                overflow: 'hidden',
                textAlign: 'left',
                cursor: 'pointer',
                border: '1px solid var(--line)',
                background: 'var(--paper)',
              }}
              onClick={() => navigate(`/services/${card.id}`)}>
              <img src={serviceImages[card.id]} alt="" style={{ width: 140, height: 160, objectFit: 'cover' }} />
              <div style={{ padding: '20px 20px 20px 0' }}>
                <h2 className="serif" style={{ margin: 0, fontSize: 26 }}>{card.title}</h2>
                <p style={{ color: 'var(--muted)', marginTop: 8 }}>{card.detail}</p>
              </div>
            </button>
          ))}
        </div>
      ) : grouped.length === 0 ? (
        <div className="empty card">
          <h3>No matches</h3>
          <p>Try another word, or browse by category.</p>
        </div>
      ) : (
        <div className="card" style={{ padding: 8 }}>
          {grouped.map(service => (
            <Link
              key={service.id}
              to={`/services/item/${service.id}`}
              style={{ display: 'flex', gap: 14, padding: 14, borderBottom: '1px solid var(--line)' }}>
              <img src={serviceImages[service.category]} alt="" style={{ width: 72, height: 72, borderRadius: 14, objectFit: 'cover' }} />
              <div>
                <p className="kicker">{service.group}</p>
                <strong>{service.name}</strong>
                <p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: 13 }}>{service.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
