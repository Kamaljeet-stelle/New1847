import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '@shared/hooks/useBooking';
import { useInbox } from '@shared/hooks/useInbox';
import type { InboxItem, InboxKind } from '@shared/types/catalog';
import { inboxApi } from '../api/adapters/inbox';
import { Button, EmptyState, PageHeader } from '../components/ui';
import { giftImages, serviceImages } from '../media/images';

type Filter = InboxKind | 'all';

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'booking', label: 'Bookings' },
  { id: 'offer', label: 'Offers' },
  { id: 'lounge', label: 'Lounge' },
];

export function InboxPage() {
  const navigate = useNavigate();
  const { bookings } = useBooking();
  const { readIds, unreadCount, markRead, markAllRead } = useInbox();
  const [filter, setFilter] = useState<Filter>('all');
  const items = useMemo(() => inboxApi.build(bookings), [bookings]);
  const sections = useMemo(
    () => inboxApi.sections(inboxApi.filter(items, filter)),
    [items, filter],
  );

  function openNotice(item: InboxItem) {
    markRead([item.id]);
    const { target } = item;
    switch (target.screen) {
      case 'ServiceDetail':
        navigate(`/services/item/${target.serviceId}`);
        break;
      case 'Shop':
        navigate('/shop');
        break;
      case 'Services':
        navigate('/services');
        break;
      case 'Appointments':
        navigate('/appointments');
        break;
      case 'Referral':
        navigate('/account/referral');
        break;
      case 'Care':
        navigate('/care');
        break;
      case 'Journal':
        navigate('/journal');
        break;
    }
  }

  return (
    <div>
      <PageHeader
        kicker="Inbox"
        title="Notifications"
        action={
          <Button variant="ghost" size="sm" onClick={() => navigate('/account/settings/notifications')}>
            Settings
          </Button>
        }
      />

      <div className="card" style={{ background: 'var(--ink)', color: 'var(--parchment)', border: 'none', marginBottom: 18 }}>
        <p className="kicker" style={{ color: 'var(--copper)' }}>Your inbox</p>
        <h2 className="serif" style={{ margin: '8px 0 0', fontSize: 28 }}>
          {unreadCount === 0 ? "You're all caught up" : `${unreadCount} new ${unreadCount === 1 ? 'update' : 'updates'}`}
        </h2>
        <p style={{ opacity: 0.7, marginTop: 8 }}>Bookings, reminders, new treatments and lounge news.</p>
        {unreadCount > 0 ? (
          <Button variant="copper" size="sm" style={{ marginTop: 14 }} onClick={markAllRead}>
            Mark all as read
          </Button>
        ) : null}
      </div>

      <div className="chip-row" style={{ marginBottom: 18 }}>
        {filters.map(item => (
          <button
            key={item.id}
            type="button"
            className={`chip ${filter === item.id ? 'chip--on' : ''}`}
            onClick={() => setFilter(item.id)}>
            {item.label}
          </button>
        ))}
      </div>

      {sections.length === 0 ? (
        <EmptyState title="Nothing here yet" body="New updates in this category will show up here." />
      ) : (
        sections.map(section => (
          <section key={section.id} style={{ marginBottom: 24 }}>
            <p className="kicker" style={{ color: 'var(--muted)' }}>{section.title}</p>
            <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
              {section.data.map(item => {
                const unread = !readIds.has(item.id);
                const image =
                  item.image === 'gift'
                    ? giftImages.father
                    : item.image
                      ? serviceImages[item.image]
                      : null;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`card ${unread ? 'card--lift' : ''}`}
                    style={{ textAlign: 'left', cursor: 'pointer', width: '100%' }}
                    onClick={() => openNotice(item)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                      <span className="kicker">{item.kind}</span>
                      <span style={{ color: 'var(--placeholder)', fontSize: 12 }}>
                        {inboxApi.timeAgo(item.at)}
                        {unread ? ' · New' : ''}
                      </span>
                    </div>
                    <strong style={{ display: 'block', marginTop: 6 }}>{item.title}</strong>
                    <p style={{ color: 'var(--muted)', marginTop: 6 }}>{item.body}</p>
                    {image ? (
                      <img src={image} alt="" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 14, marginTop: 12 }} />
                    ) : null}
                    <div style={{ marginTop: 12, fontWeight: 700, color: 'var(--copper)' }}>{item.cta} →</div>
                  </button>
                );
              })}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
