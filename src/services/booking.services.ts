import type {
  Booking,
  BookingDraft,
  BookingErrors,
  Inquiry,
  InquiryErrors,
  Profile,
} from '../types/catalog';
import { fullName } from './profile.services';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function digits(value: string) {
  return value.replace(/[^\d]/g, '');
}

export function validateBooking(draft: BookingDraft): BookingErrors {
  const errors: BookingErrors = {};
  if (!draft.loungeId) {
    errors.loungeId = 'Choose a lounge.';
  }
  if (!draft.serviceId) {
    errors.serviceId = 'Choose a service.';
  }
  if (draft.serviceId && !draft.variantId) {
    errors.variantId = 'Choose a variant.';
  }
  if (draft.serviceId && !draft.staffId) {
    errors.staffId = 'Choose a therapist.';
  }
  if (!draft.date) {
    errors.date = 'Choose a day.';
  }
  if (!draft.time) {
    errors.time = 'Choose a time.';
  }
  if (draft.name.trim().length < 2) {
    errors.name = 'Enter your name.';
  }
  if (!emailPattern.test(draft.email.trim())) {
    errors.email = 'Enter a valid email.';
  }
  if (digits(draft.phone).length < 8) {
    errors.phone = 'Enter a phone number.';
  }
  return errors;
}

export function validateInquiry(draft: Pick<Inquiry, 'name' | 'email' | 'phone' | 'message'>): InquiryErrors {
  const errors: InquiryErrors = {};
  if (draft.name.trim().length < 2) {
    errors.name = 'Enter your name.';
  }
  if (!emailPattern.test(draft.email.trim())) {
    errors.email = 'Enter a valid email.';
  }
  if (digits(draft.phone).length < 8) {
    errors.phone = 'Enter a phone number.';
  }
  if (draft.message.trim().length < 4) {
    errors.message = 'Add a short message.';
  }
  return errors;
}

export function hasErrors(errors: BookingErrors | InquiryErrors) {
  return Object.keys(errors).length > 0;
}

export function contactFromProfile(draft: BookingDraft, profile: Profile) {
  return {
    name: draft.name || fullName(profile),
    email: draft.email || profile.email,
    phone: draft.phone || (profile.phone ? `${profile.dialCode} ${profile.phone}` : ''),
  };
}

export function serviceLines(draft: BookingDraft) {
  return [
    draft.variantName,
    draft.addonName ? `+ ${draft.addonName}` : '',
    `${draft.minutes} min · ${draft.staffName}`,
  ].filter(Boolean);
}

export function nextBooking(bookings: Booking[], today: string) {
  return bookings
    .filter(booking => booking.date >= today)
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))[0];
}

export const vatRate = 0.05;

function roundAed(amount: number) {
  return Math.round(amount * 100) / 100;
}

export function priceBreakdown(total: number) {
  const subtotal = roundAed(total / (1 + vatRate));
  return { subtotal, tax: roundAed(total - subtotal), total };
}
