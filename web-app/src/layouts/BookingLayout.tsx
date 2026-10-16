import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useBooking } from '@shared/hooks/useBooking';
import { getLounge, getService } from '@shared/services/catalog.services';
import { priceLabel } from '@shared/data/bookingOptions';
import { Button } from '../components/ui';

const steps = [
  { id: 'service', label: 'Service', match: () => false },
  { id: 'schedule', label: 'Date & time', match: (path: string) => path.includes('/book/schedule') },
  { id: 'review', label: 'Review', match: (path: string) => path.includes('/book/review') },
  { id: 'confirm', label: 'Confirmed', match: (path: string) => path.includes('/book/confirm') },
];

export function BookingLayout() {
  const { draft } = useBooking();
  const location = useLocation();
  const navigate = useNavigate();
  const service = getService(draft.serviceId);
  const lounge = getLounge(draft.loungeId);

  return (
    <div className="booking-layout">
      <div>
        <div className="chip-row" style={{ marginBottom: 20 }}>
          {steps.map(step => {
            const on = step.match(location.pathname);
            return (
              <span key={step.id} className={`chip ${on ? 'chip--on' : ''}`}>
                {step.label}
              </span>
            );
          })}
        </div>
        <Outlet />
      </div>
      <aside className="card booking-summary">
        <p className="kicker">Your visit</p>
        <h3 className="serif" style={{ margin: '8px 0 0', fontSize: 22 }}>
          {service?.name ?? 'Choose a service'}
        </h3>
        <p style={{ color: 'var(--muted)', marginTop: 8, lineHeight: 1.5 }}>
          {draft.variantName || 'Variant pending'}
          {draft.addonName ? ` · ${draft.addonName}` : ''}
          {draft.staffName ? ` · ${draft.staffName}` : ''}
        </p>
        <p style={{ marginTop: 12, fontWeight: 700 }}>{priceLabel(draft.priceAed)}</p>
        <p style={{ color: 'var(--muted)', marginTop: 8 }}>
          {lounge ? `${lounge.name}, ${lounge.city}` : 'Lounge pending'}
        </p>
        {draft.date && draft.time ? (
          <p style={{ marginTop: 8 }}>
            {draft.date} · {draft.time}
          </p>
        ) : null}
        <Button
          variant="ghost"
          style={{ marginTop: 18, width: '100%' }}
          onClick={() => navigate('/services')}>
          Change service
        </Button>
      </aside>
    </div>
  );
}
