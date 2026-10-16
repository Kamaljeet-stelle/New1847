import { useWindowDimensions } from 'react-native';

export type LayoutMode = 'compact' | 'tablet' | 'desktop';

export function useResponsiveLayout() {
  const { width, height } = useWindowDimensions();

  const mode: LayoutMode =
    width >= 1100 ? 'desktop' : width >= 700 ? 'tablet' : 'compact';

  const contentPadding = mode === 'compact' ? 20 : mode === 'tablet' ? 28 : 40;
  const contentMaxWidth =
    mode === 'desktop' ? 1120 : mode === 'tablet' ? 920 : undefined;
  const isWide = mode !== 'compact';

  return {
    width,
    height,
    mode,
    isWide,
    contentPadding,
    contentMaxWidth,
  };
}
