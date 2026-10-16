export type ServiceVariant = {
  id: string;
  name: string;
  minutes: number;
  priceAed?: number;
};

export type ServiceAddon = {
  id: string;
  name: string;
  minutes: number;
  priceAed?: number;
};

export type StaffChoice = {
  id: string;
  name: string;
  detail: string;
  kind: 'any' | 'male' | 'female' | 'person';
};

export type ServiceChoice = {
  serviceId: string;
  variantId: string;
  variantName: string;
  addonId: string;
  addonName: string;
  staffId: string;
  staffName: string;
  minutes: number;
  priceAed: number | null;
};

export const emptyChoice: ServiceChoice = {
  serviceId: '',
  variantId: '',
  variantName: '',
  addonId: '',
  addonName: '',
  staffId: '',
  staffName: '',
  minutes: 0,
  priceAed: null,
};

const muscleMeltVariants: ServiceVariant[] = [
  {
    id: 'melt-60-thai',
    name: 'Muscle Melt 60 min + Thai 30 min',
    minutes: 90,
    priceAed: 600,
  },
  {
    id: 'melt-90-thai',
    name: 'Muscle Melt 90 min + Thai 30 min',
    minutes: 120,
    priceAed: 775,
  },
  {
    id: 'melt-hot-stone',
    name: 'Muscle Melt + Hot Stone, 60 min',
    minutes: 60,
    priceAed: 465,
  },
];

const muscleMeltAddons: ServiceAddon[] = [
  {
    id: 'hot-stone-addon',
    name: 'Hot stone during the massage',
    minutes: 0,
    priceAed: 60,
  },
];

export const staffChoices: StaffChoice[] = [
  { id: 'any', name: 'Any therapist', detail: 'The lounge assigns the chair', kind: 'any' },
  { id: 'any-male', name: 'Any male therapist', detail: 'First available', kind: 'male' },
  { id: 'any-female', name: 'Any female therapist', detail: 'First available', kind: 'female' },
  { id: 'joseph', name: 'Joseph', detail: 'Male therapist', kind: 'person' },
  { id: 'jeerapa', name: 'Jeerapa', detail: 'Therapist', kind: 'person' },
];

function defaultVariants(serviceId: string): ServiceVariant[] {
  return [
    { id: `${serviceId}-short`, name: 'Shorter sitting', minutes: 45 },
    { id: `${serviceId}-standard`, name: 'Standard sitting', minutes: 60 },
    { id: `${serviceId}-long`, name: 'Longer sitting', minutes: 90 },
  ];
}

export function variantsFor(serviceId: string) {
  if (serviceId === 'muscle-melt') {
    return muscleMeltVariants;
  }
  return defaultVariants(serviceId);
}

export function addonsFor(serviceId: string) {
  if (serviceId === 'muscle-melt') {
    return muscleMeltAddons;
  }
  return [];
}

export function formatAed(amount: number) {
  return `AED ${amount.toFixed(2)}`;
}

export function priceLabel(amount: number | null | undefined) {
  return amount == null ? 'Priced at lounge' : formatAed(amount);
}

export function quoteFor(variant: ServiceVariant, addon?: ServiceAddon) {
  const minutes = variant.minutes + (addon?.minutes ?? 0);
  const priceAed =
    variant.priceAed == null ? null : variant.priceAed + (addon?.priceAed ?? 0);
  return { minutes, priceAed };
}
