import type { Service } from '../types/catalog';

export const services: Service[] = [
  {
    id: 'signature-shave',
    name: 'Signature Shave',
    category: 'barber',
    group: 'Beard and Shave',
    priceList: 'Beard',
    signature: true,
    summary:
      'A close shave treated as part of the grooming routine, finished with the care of a barber who works on men every day.',
  },
  {
    id: 'signature-manicure',
    name: 'Signature Manicure',
    category: 'hands',
    group: 'Manicures',
    priceList: 'Hands & Feet',
    signature: true,
    summary:
      'An executive manicure with a herbal exfoliating mask, a paraffin or hydro-jelly treatment, and a forearm massage.',
  },
  {
    id: 'muscle-melt',
    name: 'Muscle Melt Massage',
    category: 'body',
    group: 'Massages',
    priceList: 'Body & Massages',
    signature: true,
    summary:
      'Firm pressure and slow strokes aimed at deep tension, easier movement, and a full physical reset.',
  },
  {
    id: 'oxygen',
    name: 'Oxygen Therapy',
    category: 'face',
    group: 'Facial Treatments',
    priceList: 'Face',
    newest: true,
    summary:
      'A pure oxygen infusion meant to settle the body, support circulation, and leave skin looking more alive.',
  },
  {
    id: 'japanese-manicure',
    name: 'Japanese Manicure',
    category: 'hands',
    group: 'Manicures',
    priceList: 'Hands & Feet',
    newest: true,
    summary:
      'Hand care shaped by a Japanese routine: precise, quiet, and built around the condition of the skin.',
  },
  {
    id: 'presidential',
    name: 'Presidential Treatment',
    category: 'barber',
    group: 'Presidential Treatment',
    priceList: 'Hair',
    newest: true,
    summary:
      'The Presidential Hair Experience — a long-form cut and finish for men who want the lounge’s fullest barber visit.',
  },
  {
    id: 'recovery-room',
    name: 'Recovery Room',
    category: 'body',
    group: 'Recovery Room',
    priceList: 'Body & Massages',
    newest: true,
    summary:
      'A dedicated recovery sitting after body work, for clients who want the visit to end slower than it started.',
  },
  {
    id: 'combo-hair-beard',
    name: 'Combo Hair and Beard',
    category: 'barber',
    group: 'Hair',
    priceList: 'Hair',
    summary:
      'A cut and a beard shape in one sitting, so the hairline and the beard agree with each other.',
  },
  {
    id: 'haircut',
    name: 'Haircut',
    category: 'barber',
    group: 'Hair',
    priceList: 'Hair',
    summary:
      'A cut planned around face shape, hair density, and how the style has to live between visits.',
  },
  {
    id: 'junior-cut',
    name: 'Junior Haircut & Style',
    category: 'barber',
    group: 'Hair',
    priceList: 'Hair',
    summary: 'A shorter sitting for a younger client, with the same finish as the main floor.',
  },
  {
    id: 'hair-styling',
    name: 'Hair Styling',
    category: 'barber',
    group: 'Hair',
    priceList: 'Hair',
    summary: 'A style and finish without a full cut, for a dinner, a meeting, or a photograph.',
  },
  {
    id: 'beard-trim',
    name: 'Beard Trim',
    category: 'barber',
    group: 'Beard and Shave',
    priceList: 'Beard',
    summary:
      'Shape, neckline, and cheek line brought back into proportion without changing the beard you asked for.',
  },
  {
    id: 'hair-system',
    name: 'Hair Replacement System',
    category: 'barber',
    group: 'Hair Replacement System',
    priceList: 'Hair',
    summary:
      'A discreet hair replacement fitting and maintenance path for men dealing with thinning hair.',
  },
  {
    id: 'pedicure',
    name: 'Pedicure',
    category: 'hands',
    group: 'Pedicures',
    priceList: 'Hands & Feet',
    summary:
      'A men’s pedicure focused on skin, nails, and the tiredness that collects in the feet.',
  },
  {
    id: 'hand-massage',
    name: 'Massage Add-On',
    category: 'hands',
    group: 'Massage Add-Ons',
    priceList: 'Hands & Feet',
    summary:
      'A short massage added to a manicure or pedicure when the hands or forearms need more time.',
  },
  {
    id: 'hand-treatment',
    name: 'Treatment Add-On',
    category: 'hands',
    group: 'Treatment Add-Ons',
    priceList: 'Hands & Feet',
    summary:
      'A mask or restorative step added when the skin on the hands or feet needs more than a tidy.',
  },
  {
    id: 'deep-tissue',
    name: 'Deep Tissue Massage',
    category: 'body',
    group: 'Massages',
    priceList: 'Body & Massages',
    summary:
      'Slower, heavier work for backs and shoulders that spend the week at a desk.',
  },
  {
    id: 'hot-stone',
    name: 'Hot Stone Massage',
    category: 'body',
    group: 'Massages',
    priceList: 'Body & Massages',
    summary:
      'Heated stones used with massage to ease muscle tightness and help the body let go.',
  },
  {
    id: 'thai',
    name: 'Thai Massage',
    category: 'body',
    group: 'Massages',
    priceList: 'Body & Massages',
    summary:
      'Assisted stretches and pressure along the body, closer to movement than to a lie-down massage.',
  },
  {
    id: 'body-treatment',
    name: 'Body Treatment',
    category: 'body',
    group: 'Body Treatments',
    priceList: 'Body & Massages',
    summary:
      'A body ritual beyond massage — scrub, mask, or targeted care chosen with the therapist.',
  },
  {
    id: 'body-hair-removal',
    name: 'Body Hair Removal',
    category: 'body',
    group: 'Hair Removal',
    priceList: 'Hair Removal',
    summary:
      'Hair removal for the body, planned around skin sensitivity and the area being treated.',
  },
  {
    id: 'booster-facial',
    name: 'Advanced Booster Facial',
    category: 'face',
    group: 'Facial Treatments',
    priceList: 'Face',
    summary:
      'A results-led facial for men: cleanse, correct, and leave the skin calmer and clearer.',
  },
  {
    id: 'face-hair-removal',
    name: 'Face Hair Removal',
    category: 'face',
    group: 'Hair Removal',
    priceList: 'Hair Removal',
    summary:
      'Precise hair removal on the face, kept inside a men’s grooming room rather than a mixed salon.',
  },
  {
    id: 'lash-brow',
    name: 'Lash and Brow',
    category: 'face',
    group: 'Lash and Brow Treatments',
    priceList: 'Face',
    summary:
      'Brow shape and lash tidy so the face reads sharper without looking styled for someone else.',
  },
];
