import { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useBooking } from '@shared/hooks/useBooking';
import { priceBreakdown } from '@shared/services/booking.services';
import { getLounge, getService } from '@shared/services/catalog.services';
import { formatAed, priceLabel } from '@shared/data/bookingOptions';
import { formatClock, formatVisitDate } from '@shared/utils/dates';
import type { Booking } from '@shared/types/catalog';
import { Button, PageHeader } from '../components/ui';

export function ConfirmPage() {
  const { bookingId = '' } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { bookings } = useBooking();
  const fromState = (location.state as { booking?: Booking } | null)?.booking;
  const booking = useMemo(
    () => bookings.find(item => item.id === bookingId) ?? (fromState?.id === bookingId ? fromState : undefined),
    [bookings, bookingId, fromState],
  );
  const service = booking ? getService(booking.serviceId) : undefined;
  const lounge = booking ? getLounge(booking.loungeId) : undefined;
  const breakdown = booking?.priceAed == null ? null : priceBreakdown(booking.priceAed);

  if (!booking) {
    return (
      <div className="empty card">
        <h3>Booking not found</h3>
        <Button onClick={() => navigate('/')}>Back to home</Button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          background: 'var(--copper)',
          display: 'grid',
          placeItems: 'center',
          fontSize: 28,
          marginBottom: 16,
        }}>
        ✓
      </div>
      <PageHeader kicker="Confirmed" title="Appointment booked" lead="Your chair is held for this visit." />
      <div className="card">
        <p><strong>Lounge</strong> · {lounge?.name}, {lounge?.city}</p>
        <p><strong>Time</strong> · {formatVisitDate(booking.date)}, {formatClock(booking.time)}</p>
        <p><strong>Service</strong> · {service?.name} · {booking.variantName}</p>
        <p><strong>Total</strong> · {priceLabel(booking.priceAed)}</p>
        {breakdown ? (
          <p style={{ color: 'var(--muted)', marginTop: 8 }}>
            Incl. VAT {formatAed(breakdown.tax)}
          </p>
        ) : null}
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 22, flexWrap: 'wrap' }}>
        <Button onClick={() => navigate('/appointments')}>View appointments</Button>
        <Button variant="ghost" onClick={() => navigate('/')}>
          Back to home
        </Button>
      </div>
    </div>
  );
}
