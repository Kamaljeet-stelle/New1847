import { emptyDraft } from '../src/types/catalog';
import {
  hasErrors,
  priceBreakdown,
  validateBooking,
  validateInquiry,
} from '../src/services/booking.services';
import { filterLounges, filterServices } from '../src/services/catalog.services';

describe('booking validation', () => {
  it('requires lounge, service, time, and contact', () => {
    const errors = validateBooking(emptyDraft);
    expect(errors.loungeId).toBeTruthy();
    expect(errors.serviceId).toBeTruthy();
    expect(errors.date).toBeTruthy();
    expect(errors.name).toBeTruthy();
    expect(hasErrors(errors)).toBe(true);
  });

  it('accepts a complete request', () => {
    const errors = validateBooking({
      ...emptyDraft,
      loungeId: 'difc',
      serviceId: 'signature-shave',
      variantId: 'signature-shave-standard',
      staffId: 'any',
      date: '2026-10-20',
      time: '10:00',
      name: 'Kamal',
      email: 'kamal@example.com',
      phone: '+971500000000',
    });
    expect(hasErrors(errors)).toBe(false);
  });

  it('asks for a variant and therapist once a service is chosen', () => {
    const errors = validateBooking({ ...emptyDraft, serviceId: 'muscle-melt' });
    expect(errors.variantId).toBeTruthy();
    expect(errors.staffId).toBeTruthy();
  });

  it('splits a VAT-inclusive total', () => {
    expect(priceBreakdown(660)).toEqual({ subtotal: 628.57, tax: 31.43, total: 660 });
  });

  it('requires a message on enquiries', () => {
    const errors = validateInquiry({
      name: 'A',
      email: 'not-an-email',
      phone: '12',
      message: '',
    });
    expect(errors.name).toBeTruthy();
    expect(errors.email).toBeTruthy();
    expect(errors.phone).toBeTruthy();
    expect(errors.message).toBeTruthy();
  });
});

describe('catalog filters', () => {
  it('keeps Dubai lounges and barber services', () => {
    expect(filterLounges('Dubai').every(lounge => lounge.city === 'Dubai')).toBe(
      true,
    );
    expect(
      filterServices('barber').every(service => service.category === 'barber'),
    ).toBe(true);
    expect(filterLounges('all').length).toBeGreaterThan(filterLounges('Sharjah').length);
  });
});
