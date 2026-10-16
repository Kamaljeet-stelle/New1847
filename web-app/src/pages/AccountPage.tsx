import { Link, useNavigate } from 'react-router-dom';
import { useBooking } from '@shared/hooks/useBooking';
import { fullName, initials } from '@shared/services/profile.services';
import { Button, Modal, PageHeader } from '../components/ui';
import { useState } from 'react';

const rows = [
  { to: '/appointments', title: 'Appointments', body: 'Upcoming and past visits' },
  { to: '/shop', title: 'Gift Cards', body: 'Send someone a good hour' },
  { to: '/account/packages', title: 'Series packages', body: 'Ask the lounge about packages' },
  { to: '/account/referral', title: 'Referral', body: 'Share 1847 and earn credit' },
  { to: '/account/payments', title: 'Payments', body: 'Saved cards on this device' },
  { to: '/account/settings/notifications', title: 'Manage Notifications', body: 'Reminders and offers' },
  { to: '/privacy', title: 'Privacy', body: 'How we handle your details' },
  { to: '/terms', title: 'Terms', body: 'Reservation terms' },
  { to: '/about', title: 'About', body: 'The 1847 story' },
  { to: '/journal', title: 'Journal', body: 'Notes from the lounge' },
  { to: '/prices', title: 'Price guide', body: 'Lists by category' },
  { to: '/faq', title: 'Questions', body: 'Common answers' },
  { to: '/contact', title: 'Contact', body: 'Send a note to the lounge' },
  { to: '/requests', title: 'Your requests', body: 'Inquiries from this device' },
];

export function AccountPage() {
  const navigate = useNavigate();
  const { profile, signedIn, signOut, deleteAccount } = useBooking();
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div>
      <PageHeader kicker="Account" title="Your account" />
      <div className="card" style={{ background: 'var(--ink)', color: 'var(--parchment)', border: 'none', marginBottom: 20, display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ width: 56, height: 56, borderRadius: 28, background: 'var(--copper)', display: 'grid', placeItems: 'center', fontWeight: 700 }}>
          {signedIn ? initials(profile) || 'G' : 'G'}
        </div>
        <div style={{ flex: 1 }}>
          <h2 className="serif" style={{ margin: 0, fontSize: 26 }}>{signedIn ? fullName(profile) || 'Guest' : 'Guest'}</h2>
          <p style={{ opacity: 0.7, marginTop: 4 }}>{profile.email || 'Add your email in profile'}</p>
        </div>
        <Button variant="copper" size="sm" onClick={() => navigate('/account/profile')}>
          Edit
        </Button>
      </div>

      <div className="card" style={{ padding: 8 }}>
        {rows.map(row => (
          <Link
            key={row.to}
            to={row.to}
            style={{ display: 'block', padding: 14, borderBottom: '1px solid var(--line)' }}>
            <strong>{row.title}</strong>
            <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 2 }}>{row.body}</div>
          </Link>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
        <Button variant="ghost" onClick={() => { signOut(); navigate('/'); }}>
          Log out
        </Button>
        <Button variant="ghost" onClick={() => setConfirmDelete(true)} style={{ color: 'var(--error)' }}>
          Delete account
        </Button>
      </div>

      <Modal open={confirmDelete} title="Delete account?" onClose={() => setConfirmDelete(false)}>
        <p style={{ color: 'var(--muted)' }}>
          This clears local profile, bookings, and cards on this device. There is no remote account yet.
        </p>
        <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
          <Button
            onClick={() => {
              deleteAccount();
              setConfirmDelete(false);
              navigate('/');
            }}>
            Initiate deletion
          </Button>
          <Button variant="ghost" onClick={() => setConfirmDelete(false)}>
            Never mind
          </Button>
        </div>
      </Modal>
    </div>
  );
}
