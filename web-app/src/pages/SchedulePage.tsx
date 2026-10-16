import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '@shared/hooks/useBooking';
import { contactFromProfile } from '@shared/services/booking.services';
import { daySlots, upcomingDates } from '@shared/utils/dates';
import { Button, PageHeader } from '../components/ui';

export function SchedulePage() {
  const navigate = useNavigate();
  const { draft, profile, updateDraft } = useBooking();
  const days = useMemo(() => upcomingDates(14), []);
  const [date, setDate] = useState(draft.date || days[0]?.id || '');
  const [time, setTime] = useState(draft.time || '');
  const sections = useMemo(() => daySlots(date), [date]);
  const month = days.find(day => day.id === date)?.month ?? '';

  if (!draft.serviceId) {
    return (
      <div className="empty card">
        <h3>Choose a service first</h3>
        <p>Pick a treatment before selecting date and time.</p>
        <div style={{ marginTop: 16 }}>
          <Button onClick={() => navigate('/services')}>Browse services</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader kicker="Booking" title="Date & time" lead={month} />
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, marginBottom: 20 }}>
        {days.map(day => (
          <button
            key={day.id}
            type="button"
            className={`chip ${day.id === date ? 'chip--on' : ''}`}
            style={{ minWidth: 72, flexDirection: 'column', borderRadius: 16 }}
            onClick={() => {
              setDate(day.id);
              setTime('');
            }}>
            <span style={{ fontSize: 11 }}>{day.weekday}</span>
            <strong style={{ fontSize: 18 }}>{day.day}</strong>
          </button>
        ))}
      </div>

      {sections.map(section => (
        <section key={section.id} style={{ marginBottom: 22 }}>
          <p className="kicker">{section.label}</p>
          <div className="chip-row" style={{ marginTop: 10 }}>
            {section.slots.map(slot => (
              <button
                key={slot}
                type="button"
                className={`chip ${slot === time ? 'chip--on' : ''}`}
                onClick={() => setTime(slot)}>
                {slot}
              </button>
            ))}
          </div>
        </section>
      ))}

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
        <Button
          disabled={!date || !time}
          onClick={() => {
            updateDraft({
              date,
              time,
              ...contactFromProfile(draft, profile),
            });
            navigate('/book/review');
          }}>
          Review
        </Button>
      </div>
    </div>
  );
}
