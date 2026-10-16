import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  addonsFor,
  priceLabel,
  quoteFor,
  staffChoices,
  variantsFor,
} from '@shared/data/bookingOptions';
import { useBooking } from '@shared/hooks/useBooking';
import { categoryLabels, type Service, type ServiceCategory } from '@shared/types/catalog';
import { catalogApi } from '../api/adapters/catalog';
import { Button, Modal, PageHeader } from '../components/ui';
import { serviceImages } from '../media/images';

const categories = Object.keys(categoryLabels) as ServiceCategory[];

export function ServiceMenuPage() {
  const { category = 'barber' } = useParams<{ category: ServiceCategory }>();
  const navigate = useNavigate();
  const { selectedLoungeId, updateDraft } = useBooking();
  const [services, setServices] = useState<Service[]>([]);
  const [groups, setGroups] = useState<string[]>(['All']);
  const [group, setGroup] = useState('All');
  const [active, setActive] = useState<Service | null>(null);
  const [variantId, setVariantId] = useState('');
  const [addonId, setAddonId] = useState('');
  const [staffId, setStaffId] = useState('any');

  useEffect(() => {
    if (!categories.includes(category)) {
      navigate('/services', { replace: true });
      return;
    }
    void Promise.all([catalogApi.listServices(category), catalogApi.groupsFor(category)]).then(
      ([list, nextGroups]) => {
        setServices(list);
        setGroups(nextGroups);
        setGroup('All');
      },
    );
  }, [category, navigate]);

  const filtered = useMemo(
    () => (group === 'All' ? services : services.filter(service => service.group === group)),
    [group, services],
  );

  const variants = active ? variantsFor(active.id) : [];
  const addons = active ? addonsFor(active.id) : [];
  const variant = variants.find(item => item.id === variantId) ?? variants[0];
  const addon = addons.find(item => item.id === addonId);
  const staff = staffChoices.find(item => item.id === staffId) ?? staffChoices[0];
  const quote = variant ? quoteFor(variant, addon) : { minutes: 0, priceAed: null };

  function openService(service: Service) {
    setActive(service);
    const nextVariants = variantsFor(service.id);
    setVariantId(nextVariants[0]?.id ?? '');
    setAddonId('');
    setStaffId('any');
  }

  function addAndContinue() {
    if (!active || !variant || !staff) {
      return;
    }
    updateDraft({
      loungeId: selectedLoungeId,
      serviceId: active.id,
      variantId: variant.id,
      variantName: variant.name,
      addonId: addon?.id ?? '',
      addonName: addon?.name ?? '',
      staffId: staff.id,
      staffName: staff.name,
      minutes: quote.minutes,
      priceAed: quote.priceAed,
    });
    setActive(null);
    navigate('/book/schedule');
  }

  return (
    <div>
      <PageHeader
        kicker="Menu"
        title={categoryLabels[category] ?? 'Services'}
        lead="Pick a treatment, then choose sitting, therapist, and time."
      />

      <div className="chip-row" style={{ marginBottom: 16 }}>
        {categories.map(item => (
          <button
            key={item}
            type="button"
            className={`chip ${item === category ? 'chip--on' : ''}`}
            onClick={() => navigate(`/services/${item}`)}>
            {categoryLabels[item]}
          </button>
        ))}
      </div>

      <div className="chip-row" style={{ marginBottom: 18 }}>
        {groups.map(item => (
          <button
            key={item}
            type="button"
            className={`chip ${item === group ? 'chip--on' : ''}`}
            onClick={() => setGroup(item)}>
            {item}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: 20 }} className="menu-grid">
        <div className="card" style={{ padding: 8 }}>
          {filtered.map(service => (
            <button
              key={service.id}
              type="button"
              onClick={() => openService(service)}
              style={{
                width: '100%',
                display: 'flex',
                gap: 14,
                padding: 14,
                border: 'none',
                borderBottom: '1px solid var(--line)',
                background: 'transparent',
                textAlign: 'left',
                cursor: 'pointer',
              }}>
              <img src={serviceImages[service.category]} alt="" style={{ width: 84, height: 100, borderRadius: 14, objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <p className="kicker">{service.group}</p>
                <strong style={{ fontSize: 16 }}>{service.name}</strong>
                <p style={{ margin: '6px 0 0', color: 'var(--muted)', fontSize: 13 }}>{service.summary}</p>
              </div>
              <span style={{ alignSelf: 'center', color: 'var(--copper)', fontWeight: 700 }}>Explore</span>
            </button>
          ))}
        </div>

        <aside className="card" style={{ alignSelf: 'start', position: 'sticky', top: 88 }}>
          <p className="kicker">Tip</p>
          <h3 className="serif" style={{ margin: '8px 0 0', fontSize: 22 }}>Choose, then continue</h3>
          <p style={{ color: 'var(--muted)', marginTop: 10, lineHeight: 1.5 }}>
            Variant and therapist open in a panel. Prices shown for Muscle Melt; others are confirmed at the lounge.
          </p>
        </aside>
      </div>

      <Modal open={Boolean(active)} title={active?.name ?? 'Service'} onClose={() => setActive(null)}>
        {active ? (
          <div>
            <p style={{ color: 'var(--muted)', marginTop: 0 }}>{active.summary}</p>

            <p className="kicker" style={{ marginTop: 18 }}>Sitting</p>
            <div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
              {variants.map(item => (
                <button
                  key={item.id}
                  type="button"
                  className={`chip ${item.id === variant?.id ? 'chip--on' : ''}`}
                  style={{ justifyContent: 'space-between', display: 'flex', borderRadius: 14 }}
                  onClick={() => setVariantId(item.id)}>
                  <span>{item.name} · {item.minutes} min</span>
                  <span>{priceLabel(item.priceAed)}</span>
                </button>
              ))}
            </div>

            {addons.length > 0 ? (
              <>
                <p className="kicker" style={{ marginTop: 18 }}>Add-on</p>
                <div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
                  {addons.map(item => (
                    <button
                      key={item.id}
                      type="button"
                      className={`chip ${item.id === addonId ? 'chip--on' : ''}`}
                      style={{ justifyContent: 'space-between', display: 'flex', borderRadius: 14 }}
                      onClick={() => setAddonId(current => (current === item.id ? '' : item.id))}>
                      <span>{item.name}</span>
                      <span>{priceLabel(item.priceAed)}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : null}

            <p className="kicker" style={{ marginTop: 18 }}>Therapist</p>
            <div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
              {staffChoices.map(item => (
                <button
                  key={item.id}
                  type="button"
                  className={`chip ${item.id === staffId ? 'chip--on' : ''}`}
                  style={{ textAlign: 'left', borderRadius: 14 }}
                  onClick={() => setStaffId(item.id)}>
                  <strong>{item.name}</strong>
                  <div style={{ fontWeight: 500, opacity: 0.75 }}>{item.detail}</div>
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 22, gap: 12 }}>
              <strong>{priceLabel(quote.priceAed)}</strong>
              <Button onClick={addAndContinue}>Continue</Button>
            </div>
          </div>
        ) : null}
      </Modal>

      <style>{`
        @media (max-width: 900px) {
          .menu-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
