import { useMemo, useState, type FormEvent } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useBooking } from '@shared/hooks/useBooking';
import { useInbox } from '@shared/hooks/useInbox';
import { getLounge } from '@shared/services/catalog.services';
import { initials } from '@shared/services/profile.services';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/lounges', label: 'Lounges' },
  { to: '/shop', label: 'Shop' },
  { to: '/appointments', label: 'Appointments' },
  { to: '/inbox', label: 'Inbox' },
  { to: '/account', label: 'Account' },
];

const phoneTabs = [
  { to: '/', label: 'Home', icon: '⌂', end: true },
  { to: '/services', label: 'Services', icon: '☰' },
  { to: '/shop', label: 'Shop', icon: '◇' },
  { to: '/appointments', label: 'Visits', icon: '◷' },
  { to: '/account', label: 'Account', icon: '◎' },
];

export function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedLoungeId, profile, signedIn } = useBooking();
  const { unreadCount } = useInbox();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const lounge = useMemo(() => getLounge(selectedLoungeId), [selectedLoungeId]);
  const hidePhoneSearch = location.pathname.startsWith('/book/');

  function submitSearch(event: FormEvent) {
    event.preventDefault();
    navigate(`/services?q=${encodeURIComponent(query.trim())}`);
    setOpen(false);
  }

  return (
    <div className="shell">
      {open ? <div className="drawer-backdrop" onClick={() => setOpen(false)} /> : null}
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="brand">1847</div>
        <nav className="nav" onClick={() => setOpen(false)}>
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? 'active' : '')}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-foot">Grooming for men · UAE</div>
      </aside>

      <div className="shell-main">
        <header className="topbar">
          <button
            type="button"
            className="menu-toggle"
            aria-label="Open menu"
            onClick={() => setOpen(true)}>
            ☰
          </button>
          <button type="button" className="lounge-chip" onClick={() => navigate('/lounges')}>
            <span className="pin">◎</span>
            <span className="lounge-copy">
              <span>Your lounge</span>
              <strong>{lounge ? `${lounge.name}, ${lounge.city}` : 'Choose a lounge'}</strong>
            </span>
          </button>
          <form className="top-search" onSubmit={submitSearch}>
            <span aria-hidden>⌕</span>
            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search haircut, massage, facial…"
              aria-label="Search services"
            />
          </form>
          <button
            type="button"
            className="icon-btn"
            aria-label="Notifications"
            onClick={() => navigate('/inbox')}>
            ⌾
            {unreadCount > 0 ? <span className="badge">{unreadCount}</span> : null}
          </button>
          <button
            type="button"
            className="avatar desktop-only"
            aria-label="Account"
            onClick={() => navigate('/account')}>
            {signedIn ? initials(profile) || 'G' : 'G'}
          </button>
        </header>

        {!hidePhoneSearch ? (
          <form className="phone-search" onSubmit={submitSearch}>
            <span aria-hidden>⌕</span>
            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search services…"
              aria-label="Search services"
            />
          </form>
        ) : null}

        <main className="content">
          <Outlet />
        </main>

        <nav className="phone-tabs" aria-label="Primary">
          {phoneTabs.map(tab => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) => (isActive ? 'active' : '')}>
              <span className="phone-tab-icon" aria-hidden>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
