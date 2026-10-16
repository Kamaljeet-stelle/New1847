import type { Profile } from '../types/catalog';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ProfileErrors = Partial<
  Record<'firstName' | 'lastName' | 'email' | 'phone' | 'dob', string>
>;

export const dialCodes = [
  { id: '+971', label: 'United Arab Emirates', flag: '🇦🇪' },
  { id: '+968', label: 'Oman', flag: '🇴🇲' },
  { id: '+974', label: 'Qatar', flag: '🇶🇦' },
  { id: '+966', label: 'Saudi Arabia', flag: '🇸🇦' },
  { id: '+973', label: 'Bahrain', flag: '🇧🇭' },
  { id: '+965', label: 'Kuwait', flag: '🇰🇼' },
  { id: '+91', label: 'India', flag: '🇮🇳' },
  { id: '+44', label: 'United Kingdom', flag: '🇬🇧' },
];

export const genders = ['Male', 'Prefer not to say'];

function digits(value: string) {
  return value.replace(/[^\d]/g, '');
}

export function fullName(profile: Pick<Profile, 'firstName' | 'lastName'>) {
  return `${profile.firstName} ${profile.lastName}`.trim();
}

export function initials(profile: Pick<Profile, 'firstName' | 'lastName'>) {
  return `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase();
}

export function validateProfile(profile: Profile): ProfileErrors {
  const errors: ProfileErrors = {};
  if (!profile.firstName.trim()) {
    errors.firstName = 'Enter your first name.';
  }
  if (!profile.lastName.trim()) {
    errors.lastName = 'Enter your last name.';
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(profile.dob)) {
    errors.dob = 'Choose your birthday.';
  }
  if (!emailPattern.test(profile.email.trim())) {
    errors.email = 'Enter a valid email.';
  }
  if (digits(profile.phone).length < 7) {
    errors.phone = 'Enter a phone number.';
  }
  return errors;
}

export function referralCode(profile: Profile) {
  const seed = `${fullName(profile)}${profile.email}`;
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) % 65536;
  }
  const suffix = hash.toString(16).toUpperCase().padStart(4, '0').slice(-4);
  return `${profile.firstName.replace(/\s/g, '') || 'Guest'}${suffix}`;
}

export function cardBrand(number: string) {
  if (number.startsWith('4')) {
    return 'Visa';
  }
  if (number.startsWith('5')) {
    return 'Mastercard';
  }
  return 'Card';
}

export function validateCard(input: { number: string; expiry: string; name: string }) {
  const errors: Partial<Record<'number' | 'expiry' | 'name', string>> = {};
  const number = digits(input.number);
  if (number.length < 13 || number.length > 19) {
    errors.number = 'Enter the card number.';
  }
  if (!/^\d{2}\/\d{2}$/.test(input.expiry.trim())) {
    errors.expiry = 'Use MM/YY.';
  }
  if (input.name.trim().length < 2) {
    errors.name = 'Enter the name on the card.';
  }
  return { errors, last4: number.slice(-4), brand: cardBrand(number) };
}
