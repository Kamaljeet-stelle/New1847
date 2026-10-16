import { Platform } from 'react-native';

const serif = Platform.OS === 'ios' ? 'Georgia' : 'serif';

export const typography = {
  display: {
    fontFamily: serif,
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: -0.4,
  },
  serifTitle: {
    fontFamily: serif,
    fontSize: 22,
    lineHeight: 28,
  },
  hero: {
    fontSize: 40,
    fontWeight: '700' as const,
    lineHeight: 44,
    letterSpacing: -1.2,
  },
  screenTitle: {
    fontSize: 34,
    fontWeight: '600' as const,
    lineHeight: 40,
    letterSpacing: -0.6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    letterSpacing: -0.3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  label: {
    fontSize: 11,
    fontWeight: '700' as const,
    letterSpacing: 1.4,
    textTransform: 'uppercase' as const,
  },
  caption: {
    fontSize: 13,
    fontWeight: '500' as const,
    lineHeight: 18,
  },
  button: {
    fontSize: 15,
    fontWeight: '700' as const,
    letterSpacing: 0.2,
  },
} as const;
