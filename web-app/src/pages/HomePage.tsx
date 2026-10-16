import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBooking } from '@shared/hooks/useBooking';
import { nextBooking } from '@shared/services/booking.services';
import { greetingFor, formatClock, formatVisitDate, todayIso } from '@shared/utils/dates';
import type { Service } from '@shared/types/catalog';
import { catalogApi } from '../api/adapters/catalog';
import { Button } from '../components/ui';
import { categoryCards, serviceImages } from '../media/images';

export function HomePage() {
  const navigate = useNavigate();
  const { profile, signedIn, bookings } = useBooking();
  const [signature, setSignature] = useState<Service[]>([]);
  const [newest, setNewest] = useState<Service[]>([]);
  const upcoming = nextBooking(bookings, todayIso());

  useEffect(() => {
    void Promise.all([catalogApi.signatureServices(), catalogApi.newestServices()]).then(
      ([sig, neu]) => {
        setSignature(sig);
        setNewest(neu);
      },
    );
  }, []);

  return (
    <div>
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 20,
          marginBottom: 28,
        }}
        className="home-hero-grid">
        <div
          className="card"
          style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: 380,
            padding: 0,
            border: 'none',
            background: 'var(--ink)',
          }}>
          <img
            src={serviceImages.barber}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, opacity: 0.85 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 20%, rgba(18,16,14,0.78))' }} />
          <div style={{ position: 'relative', padding: 28, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: 'var(--white)' }}>
            <p className="kicker" style={{ color: 'var(--copper-soft)' }}>
              {greetingFor()}
            </p>
            <h1 className="serif" style={{ margin: '10px 0 0', fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.1 }}>
              {signedIn && profile.firstName ? `${profile.firstName},` : 'Welcome,'}
              <br />
              <span style={{ opacity: 0.8 }}>your chair is waiting.</span>
            </h1>
            {upcoming ? (
              <p style={{ marginTop: 12, opacity: 0.85 }}>
                Next visit · {formatVisitDate(upcoming.date)}, {formatClock(upcoming.time)}
              </p>
            ) : null}
            <div style={{ marginTop: 20 }}>
              <Button onClick={() => navigate('/services')}>Book a visit</Button>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          {[
            { title: 'Quick Book', body: 'Soonest slot', to: '/services', dark: true },
            { title: 'Reserve', body: 'Pick a lounge', to: '/lounges' },
            { title: 'Visits', body: upcoming ? '1 upcoming' : 'Your bookings', to: '/appointments' },
          ].map(item => (
            <Link
              key={item.title}
              to={item.to}
              className="card"
              style={{
                background: item.dark ? 'var(--ink)' : 'var(--paper)',
                color: item.dark ? 'var(--parchment)' : 'var(--ink)',
                borderColor: item.dark ? 'var(--ink)' : 'var(--line)',
              }}>
              <strong style={{ fontSize: 18 }}>{item.title}</strong>
              <div style={{ opacity: 0.7, marginTop: 4 }}>{item.body}</div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 14 }}>
          <div>
            <p className="kicker">Explore</p>
            <h2 className="serif" style={{ margin: '6px 0 0', fontSize: 28 }}>
              What are you in for?
            </h2>
          </div>
          <Link to="/services" style={{ textDecoration: 'underline', fontWeight: 700 }}>
            All services
          </Link>
        </div>
        <div className="grid-4">
          {categoryCards.map(card => (
            <Link key={card.id} to={`/services/${card.id}`} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <img src={serviceImages[card.id]} alt="" style={{ height: 140, width: '100%', objectFit: 'cover' }} />
              <div style={{ padding: 16 }}>
                <strong>{card.title}</strong>
                <p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: 13 }}>{card.detail}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 36 }}>
        <p className="kicker">Now in the lounge</p>
        <h2 className="serif" style={{ margin: '6px 0 14px', fontSize: 28 }}>
          New this season
        </h2>
        <div className="grid-3">
          {newest.map(service => (
            <Link key={service.id} to={`/services/item/${service.id}`} className="card" style={{ padding: 0, overflow: 'hidden', position: 'relative', minHeight: 280 }}>
              <img src={serviceImages[service.category]} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent, rgba(18,16,14,0.75))' }} />
              <div style={{ position: 'relative', padding: 18, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: 'var(--white)' }}>
                <span style={{ alignSelf: 'flex-start', background: 'var(--parchment)', color: 'var(--ink)', borderRadius: 999, padding: '4px 10px', fontSize: 10, fontWeight: 800, marginBottom: 'auto' }}>
                  NEW
                </span>
                <p className="kicker" style={{ color: 'var(--copper-soft)' }}>{service.group}</p>
                <h3 className="serif" style={{ margin: '6px 0 0', fontSize: 24 }}>{service.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 36 }}>
        <p className="kicker">Signature</p>
        <h2 className="serif" style={{ margin: '6px 0 14px', fontSize: 28 }}>
          The 1847 rituals
        </h2>
        <div className="card" style={{ padding: 8 }}>
          {signature.map(service => (
            <Link
              key={service.id}
              to={`/services/item/${service.id}`}
              style={{ display: 'flex', gap: 14, alignItems: 'center', padding: 12, borderBottom: '1px solid var(--line)' }}>
              <img src={serviceImages[service.category]} alt="" style={{ width: 64, height: 64, borderRadius: 14, objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <p className="kicker">{service.group}</p>
                <strong>{service.name}</strong>
                <p style={{ margin: '2px 0 0', color: 'var(--muted)', fontSize: 13 }}>{service.summary}</p>
              </div>
              <span>→</span>
            </Link>
          ))}
        </div>
      </section>

      <Link to="/shop" className="card" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', padding: 0, overflow: 'hidden', background: 'var(--ink)', color: 'var(--parchment)', border: 'none' }}>
        <div style={{ padding: 28 }}>
          <p className="kicker">Gift cards</p>
          <h2 className="serif" style={{ margin: '8px 0 0', fontSize: 30 }}>Give someone a good hour.</h2>
          <span className="btn btn--ghost" style={{ marginTop: 18, borderColor: 'var(--copper)', color: 'var(--parchment)' }}>
            Shop gifts
          </span>
        </div>
        <img src={serviceImages.body} alt="" style={{ height: '100%', minHeight: 180, objectFit: 'cover' }} />
      </Link>

      <style>{`
        @media (max-width: 900px) {
          .home-hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
