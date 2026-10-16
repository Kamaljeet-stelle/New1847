import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { priceLists } from '@shared/types/catalog';
import { servicesForPrice } from '@shared/services/catalog.services';
import { privateParagraphs, reviews } from '@shared/data/stories';
import { catalogApi } from '../api/adapters/catalog';
import { Button, PageHeader } from '../components/ui';

export function AboutPage() {
  const navigate = useNavigate();
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  useEffect(() => {
    void catalogApi.about().then(data => setParagraphs(data.paragraphs));
  }, []);
  return (
    <div style={{ maxWidth: 720 }}>
      <PageHeader kicker="About" title="Executive grooming for men." />
      {paragraphs.map(item => (
        <p key={item} style={{ lineHeight: 1.7, color: 'var(--sage)' }}>{item}</p>
      ))}
      <Button style={{ marginTop: 16 }} onClick={() => navigate('/lounges')}>See the lounges</Button>
    </div>
  );
}

export function CarePage() {
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [stats, setStats] = useState<{ figure: string; label: string }[]>([]);
  useEffect(() => {
    void catalogApi.care().then(data => {
      setParagraphs(data.paragraphs);
      setStats(data.stats);
    });
  }, []);
  return (
    <div style={{ maxWidth: 720 }}>
      <PageHeader kicker="Care" title="Driven by purpose, grounded in care." />
      {paragraphs.map(item => (
        <p key={item} style={{ lineHeight: 1.7, color: 'var(--sage)' }}>{item}</p>
      ))}
      <div className="grid-3" style={{ marginTop: 24 }}>
        {stats.map(stat => (
          <div key={stat.label} className="card">
            <h3 className="serif" style={{ margin: 0, fontSize: 28 }}>{stat.figure}</h3>
            <p style={{ color: 'var(--muted)', marginTop: 6 }}>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PrivatePage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <PageHeader kicker="Private" title="A quieter room" lead="Private bookings for when the usual floor is not enough." />
      {privateParagraphs.map(item => (
        <p key={item} style={{ lineHeight: 1.7, color: 'var(--sage)' }}>{item}</p>
      ))}
      <Link className="btn" to="/services" style={{ marginTop: 16, display: 'inline-flex' }}>Browse services</Link>
    </div>
  );
}

export function PricesPage() {
  return (
    <div>
      <PageHeader kicker="Prices" title="Price guide" lead="Many treatments are confirmed at the lounge. Muscle Melt shows AED in booking." />
      <div style={{ display: 'grid', gap: 18 }}>
        {priceLists.map(list => {
          const items = servicesForPrice(list);
          return (
            <section key={list} className="card">
              <h2 className="serif" style={{ margin: 0, fontSize: 24 }}>{list}</h2>
              <ul style={{ margin: '12px 0 0', paddingLeft: 18, color: 'var(--muted)' }}>
                {items.map(service => (
                  <li key={service.id} style={{ marginBottom: 6 }}>
                    <Link to={`/services/item/${service.id}`} style={{ textDecoration: 'underline' }}>{service.name}</Link>
                    {' · '}Priced at lounge
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export function FaqPage() {
  const [faqs, setFaqs] = useState<{ id: string; question: string; answer: string }[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  useEffect(() => {
    void catalogApi.faqs().then(data => {
      setFaqs(data);
      setOpenId(data[0]?.id ?? null);
    });
  }, []);
  return (
    <div style={{ maxWidth: 720 }}>
      <PageHeader kicker="Help" title="Questions" />
      <div style={{ display: 'grid', gap: 10 }}>
        {faqs.map(item => {
          const open = item.id === openId;
          return (
            <button
              key={item.id}
              type="button"
              className="card"
              style={{ textAlign: 'left', cursor: 'pointer' }}
              onClick={() => setOpenId(open ? null : item.id)}>
              <strong>{item.question}</strong>
              {open ? <p style={{ color: 'var(--muted)', marginTop: 8 }}>{item.answer}</p> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ReviewsBlock() {
  return (
    <div className="grid-2" style={{ marginTop: 24 }}>
      {reviews.slice(0, 4).map(item => (
        <blockquote key={item.id} className="card">
          <p style={{ fontStyle: 'italic' }}>“{item.quote}”</p>
          <footer style={{ marginTop: 10, color: 'var(--muted)' }}>{item.name} · {item.place}</footer>
        </blockquote>
      ))}
    </div>
  );
}

export function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      body={[
        'Details you enter on this device stay in local app memory unless a backend is configured.',
        'We do not store full card numbers — only brand, last four digits, and expiry.',
        'For the public site and lounge policies, visit 1847formen.com.',
      ]}
    />
  );
}

export function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      body={[
        'Reservations made in this app are held subject to lounge confirmation and availability.',
        'Prices shown as “Priced at lounge” are confirmed at the chair. VAT applies where priced.',
        'Cancel or change a visit by contacting your lounge.',
      ]}
    />
  );
}

function LegalPage({ title, body }: { title: string; body: string[] }) {
  return (
    <div style={{ maxWidth: 720 }}>
      <PageHeader kicker="Legal" title={title} />
      {body.map(item => (
        <p key={item} style={{ lineHeight: 1.7, color: 'var(--sage)' }}>{item}</p>
      ))}
      <a href="https://1847formen.com/" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline', fontWeight: 700 }}>
        1847formen.com
      </a>
    </div>
  );
}
