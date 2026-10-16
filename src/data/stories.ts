import type { Article, CareStat, Faq, Review, Value } from '../types/catalog';

export const values: Value[] = [
  {
    id: 'curated',
    index: '01',
    title: 'A curated approach',
    body: 'Products and rituals are chosen from more than one culture, then edited until they belong in a men’s lounge.',
  },
  {
    id: 'detail',
    index: '02',
    title: 'Attention to detail',
    body: 'The extra step — a neckline, a temperature, a quiet room — is the part clients notice on the way out.',
  },
  {
    id: 'authentic',
    index: '03',
    title: 'Authenticity',
    body: 'The welcome is the same for a chief executive and a graduate. Care is the point, not the title on the booking.',
  },
];

export const careStats: CareStat[] = [
  { id: 'paper', figure: '100%', label: 'of paper recycled' },
  { id: 'plastic', figure: '2.5 t', label: 'of plastic recycled' },
  { id: 'water', figure: '50%', label: 'less water, used with intent' },
];

export const faqs: Faq[] = [
  {
    id: 'different',
    question: 'What makes 1847 different from other men’s grooming lounges?',
    answer:
      'The lounges are for men only. Services, products, and rooms are built around precision, comfort, and discretion.',
  },
  {
    id: 'book',
    question: 'Do I need to book in advance?',
    answer:
      'Booking is the reliable way to keep your time and your lounge. Walk-ins are accepted when a chair is free.',
  },
  {
    id: 'private',
    question: 'Are there private grooming spaces?',
    answer:
      'Selected lounges have private rooms for clients who want the visit kept more discreet. Ask when you book.',
  },
  {
    id: 'skin',
    question: 'Are the products suitable for sensitive skin?',
    answer:
      'The professional products cover a range of skin types. Tell the team about a sensitivity and they will adjust the service.',
  },
];

export const reviews: Review[] = [
  {
    id: 'abdel',
    name: 'C Michael',
    place: 'Gate Avenue',
    quote: 'Great haircut every time from Abdel.',
  },
  {
    id: 'ismail',
    name: 'Javad Khangosstar',
    place: 'DIFC',
    quote:
      'Ismail is worth the drive. Sharp cut, careful detail, and a room that stays pristine.',
  },
  {
    id: 'atwi',
    name: 'A Debaji',
    place: 'Google',
    quote: 'Atwi is the reason to book the chair again.',
  },
];

export const articles: Article[] = [
  {
    id: 'oxygen-relaxed',
    title: 'Can oxygen therapy help you feel more relaxed?',
    month: 'October 2026',
    minutes: '1 min',
    excerpt:
      'Clients describe the oxygen sitting as a pause: slower breathing, warmer skin, and a clearer head on the way out.',
    body: [
      'Oxygen therapy at 1847 is a short infusion, not a medical treatment. People book it when they want the visit to include recovery, not only a haircut.',
      'What clients mention most is the quiet. Circulation and skin are part of the pitch; the feeling they report is simply being less rushed.',
    ],
  },
  {
    id: 'regular-hands',
    title: 'Why men book manicures and pedicures on a rhythm',
    month: 'October 2026',
    minutes: '1 min',
    excerpt:
      'Hands and feet show the week. A regular visit keeps skin, nails, and grip looking kept rather than corrected in a panic.',
    body: [
      'A first manicure is mostly orientation: what is filed, what is left, and how much massage you want.',
      'After that, the useful habit is spacing. Skin stays easier to treat when it is not ignored for a season.',
    ],
  },
  {
    id: 'desk-back',
    title: 'Can massage help with back pain from desk work?',
    month: 'September 2026',
    minutes: '1 min',
    excerpt:
      'Deep work on the back will not replace a better chair, but it does undo the grip a long desk day leaves in the shoulders.',
    body: [
      'Muscle Melt and deep tissue are the two sittings men use for this. Tell the therapist where the day actually sits — neck, mid-back, or hips.',
      'If something is sharp or new, say so before the session. The lounge can change pressure; it is not a clinic.',
    ],
  },
  {
    id: 'face-shape',
    title: 'Haircuts that follow the face, not the trend',
    month: 'September 2026',
    minutes: '1 min',
    excerpt:
      'A good barber starts with the head you have: width, hairline, and how much density is left to work with.',
    body: [
      'Face shape is a starting note, not a rule. Texture and the way hair grows at the crown usually matter more than a chart.',
      'Bring a photo of a length you can live with, then let the barber edit it for your hair.',
    ],
  },
  {
    id: 'records',
    title: 'Breaking records, making history',
    month: 'August 2026',
    minutes: '1 min',
    excerpt:
      '1847 holds a Guinness World Records title alongside the World Spa Awards recognition for men’s grooming.',
    body: [
      'The public record is part of the brand story: a men’s spa and barber that has been measured against the world, not only the neighbourhood.',
      'In the lounge, that shows up as consistency — the same standard in a mall, a hotel, and a financial district.',
    ],
  },
  {
    id: 'hair-loss',
    title: 'Choosing a barber when hair is thinning',
    month: 'August 2026',
    minutes: '1 min',
    excerpt:
      'Thinning hair needs a barber who will talk about density, not sell a style that only works in a photograph.',
    body: [
      'Ask for a cut that uses the hair you have, and ask about the hair replacement system if you want a longer conversation.',
      'The useful test is simple: does the barber look at the crown and the hairline before picking up scissors?',
    ],
  },
  {
    id: 'franchise',
    title: 'Owning an 1847 lounge',
    month: 'August 2026',
    minutes: '1 min',
    excerpt:
      'The brand offers a franchise path for operators who want a men’s grooming lounge with an existing service model.',
    body: [
      'A franchise conversation covers location, training, and how the lounge is run day to day. It is a business enquiry, not a booking.',
      'Use the franchise note in this app and the team can take it from there.',
    ],
  },
  {
    id: 'booster',
    title: 'What the advanced booster facial is for',
    month: 'January 2026',
    minutes: '1 min',
    excerpt:
      'The facial is built for men’s skin: congestion, dullness, and the dryness that follows travel and air conditioning.',
    body: [
      'Tell the therapist if you react to fragrance or acids. The service can be steered.',
      'One sitting will not rebuild a routine. It will show you what your skin does when it is properly cleaned and left alone.',
    ],
  },
];

export const aboutParagraphs = [
  '1847 is a men’s grooming house: barbering, hands and feet, massage, and skin, in lounges across the UAE.',
  'The work is executive by habit — timed, discreet, and finished with the same attention whether the visit is a shave or a long recovery sitting.',
  'The brand has spent decades on that craft. It holds a Guinness World Records title and is presented as a world leader in men’s spa and barbering.',
  'This app is a pocket index of the public lounges, services, and journal. Appointments you send here are saved on the device and treated as requests for the team.',
];

export const careParagraphs = [
  'The lounges publish three care figures: all paper is recycled, 2.5 tons of plastic are recycled, and water use is cut by half.',
  'Those numbers sit beside the service, not instead of it. A grooming house uses product, linen, and water every hour — the point is to waste less of each.',
];

export const privateParagraphs = [
  'Selected 1847 lounges keep a private room for clients who want the cut, shave, or treatment out of the main floor.',
  'Privacy is requested, not assumed. Add it as a note when you book and the lounge will say whether that room is free.',
];

export const voucherParagraphs = [
  'A voucher is a grooming gift: hair, beard, hands, face, or body, redeemed at an 1847 lounge.',
  'Send the amount and the name. The team confirms availability and how the voucher is delivered.',
];