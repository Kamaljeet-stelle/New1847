import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '@shared/hooks/useBooking';
import { getLounge, getService } from '@shared/services/catalog.services';
import { formatClock, formatVisitDate, todayIso } from '@shared/utils/dates';
import { Button, EmptyState, PageHeader } from '../components/ui';

export function AppointmentsPage() {
  const navigate = useNavigate();
  const { bookings } = useBooking();
  const [scope, setScope] = useState<'upcoming' | 'past'>('upcoming');
  const today = todayIso();
  const data = useMemo(() => {
    const upcoming = bookings.filter(item => item.date >= today);
    const past = bookings.filter(item => item.date < today);
    return scope === 'upcoming' ? upcoming : past;
  }, [bookings, scope, today]);

  return (
    <div>
      <PageHeader
        kicker="Visits"
        title="Appointments"
        action={<Button onClick={() => navigate('/lounges')}>Book reservation</Button>}
      />
      <div className="chip-row" style={{ marginBottom: 18 }}>
        <button type="button" className={`chip ${scope === 'upcoming' ? 'chip--on' : ''}`} onClick={() => setScope('upcoming')}>Upcoming</button>
        <button type="button" className={`chip ${scope === 'past' ? 'chip--on' : ''}`} onClick={() => setScope('past')}>Past</button>
      </div>

      {data.length === 0 ? (
        <EmptyState
          title={scope === 'upcoming' ? 'No appointments scheduled' : 'No past appointments yet'}
          body="Book one now and it will show here."
          action={<Button onClick={() => navigate('/services')}>Book reservation</Button>}
        />
      ) : (
        <>
          <div className="card appointments-table" style={{ padding: 0, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--line)' }}>
                  <th style={{ padding: 14 }}>Service</th>
                  <th style={{ padding: 14 }}>When</th>
                  <th style={{ padding: 14 }}>Lounge</th>
                  <th style={{ padding: 14 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => {
                  const service = getService(item.serviceId);
                  const lounge = getLounge(item.loungeId);
                  return (
                    <tr key={item.id} style={{ borderBottom: '1px solid var(--line)' }}>
                      <td style={{ padding: 14 }}>{service?.name ?? 'Visit'}</td>
                      <td style={{ padding: 14 }}>{formatVisitDate(item.date)} · {formatClock(item.time)}</td>
                      <td style={{ padding: 14 }}>{lounge?.name}</td>
                      <td style={{ padding: 14 }}>{scope === 'upcoming' ? 'Booked' : 'Past'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="appointments-cards" style={{ display: 'none', gap: 12 }}>
            {data.map(item => {
              const service = getService(item.serviceId);
              const lounge = getLounge(item.loungeId);
              return (
                <article key={item.id} className="card">
                  <strong>{service?.name ?? 'Visit'}</strong>
                  <p style={{ color: 'var(--muted)', marginTop: 6 }}>{formatVisitDate(item.date)} · {formatClock(item.time)}</p>
                  <p>{lounge?.name}</p>
                </article>
              );
            })}
          </div>
        </>
      )}
      <style>{`
        @media (max-width: 720px) {
          .appointments-table { display: none; }
          .appointments-cards { display: grid !important; }
        }
      `}</style>
    </div>
  );
}
