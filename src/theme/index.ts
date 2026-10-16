import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

export type Theme = {
  colors: typeof colors;
  spacing: typeof spacing;
  typography: typeof typography;
};

const theme: Theme = {
  colors,
  spacing,
  typography,
};

export function useAppTheme(): Theme {
  return theme;
}

export { colors, spacing, typography };
