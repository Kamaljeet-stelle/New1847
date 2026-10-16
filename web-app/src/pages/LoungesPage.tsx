import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cities, type City, type Lounge } from '@shared/types/catalog';
import { useBooking } from '@shared/hooks/useBooking';
import { catalogApi } from '../api/adapters/catalog';
import { Button, PageHeader } from '../components/ui';

export function LoungesPage() {
  const navigate = useNavigate();
  const { setSelectedLounge } = useBooking();
  const [city, setCity] = useState<City | 'all'>('all');
  const [list, setList] = useState<Lounge[]>([]);

  useEffect(() => {
    void catalogApi.listLounges(city).then(setList);
  }, [city]);

  return (
    <div>
      <PageHeader
        kicker="Lounges"
        title="Find your chair"
        lead="Every lounge is men only. Pick one to book, or browse the details."
      />
      <div className="chip-row" style={{ marginBottom: 18 }}>
        <button type="button" className={`chip ${city === 'all' ? 'chip--on' : ''}`} onClick={() => setCity('all')}>
          All cities
        </button>
        {cities.map(item => (
          <button
            key={item}
            type="button"
            className={`chip ${city === item ? 'chip--on' : ''}`}
            onClick={() => setCity(item)}>
            {item}
          </button>
        ))}
      </div>
      <div className="grid-2">
        {list.map(lounge => (
          <article key={lounge.id} className="card">
            <p className="kicker">{lounge.city}</p>
            <h2 className="serif" style={{ margin: '8px 0 0', fontSize: 26 }}>{lounge.name}</h2>
            <p style={{ color: 'var(--muted)', marginTop: 8 }}>{lounge.address}</p>
            <p style={{ marginTop: 8 }}>{lounge.hours}</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
              <Button
                size="sm"
                onClick={() => {
                  setSelectedLounge(lounge.id);
                  navigate('/services');
                }}>
                Book here
              </Button>
              <Link className="btn btn--ghost btn--sm" to={`/lounges/${lounge.id}`}>
                Details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
