import { useBooking } from '@shared/hooks/useBooking';
import { PageHeader } from '../components/ui';

const rows = [
  {
    id: 'appointments' as const,
    title: 'Appointment reminders',
    body: 'A note before a visit you requested on this device.',
  },
  {
    id: 'offers' as const,
    title: 'Offers',
    body: 'New treatments and seasonal gift cards.',
  },
];

export function NotificationSettingsPage() {
  const { notices, updateNotices } = useBooking();

  return (
    <div style={{ maxWidth: 640 }}>
      <PageHeader kicker="Settings" title="Notification settings" />
      <div className="card" style={{ padding: 8 }}>
        {rows.map(row => {
          const on = notices[row.id];
          return (
            <button
              key={row.id}
              type="button"
              role="switch"
              aria-checked={on}
              onClick={() => updateNotices({ [row.id]: !on })}
              style={{
                width: '100%',
                display: 'flex',
                gap: 16,
                alignItems: 'center',
                padding: 14,
                border: 'none',
                borderBottom: '1px solid var(--line)',
                background: 'transparent',
                textAlign: 'left',
                cursor: 'pointer',
              }}>
              <span style={{ flex: 1 }}>
                <strong>{row.title}</strong>
                <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>{row.body}</div>
              </span>
              <span
                style={{
                  width: 48,
                  height: 28,
                  borderRadius: 14,
                  background: on ? 'var(--ink)' : 'var(--line)',
                  position: 'relative',
                  flexShrink: 0,
                }}>
                <span
                  style={{
                    position: 'absolute',
                    top: 3,
                    left: on ? 23 : 3,
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    background: 'var(--white)',
                    transition: 'left 0.15s ease',
                  }}
                />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
