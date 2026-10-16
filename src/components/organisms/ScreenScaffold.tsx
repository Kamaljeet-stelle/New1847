import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import { colors } from '../../theme/colors';

type Props = {
  children: ReactNode;
  scroll?: boolean;
  safeBottom?: boolean;
};

export function ScreenScaffold({
  children,
  scroll = false,
  safeBottom = true,
}: Props) {
  const insets = useSafeAreaInsets();
  const { contentPadding, contentMaxWidth } = useResponsiveLayout();
  const bottom = safeBottom ? insets.bottom : 0;
  const frame = {
    paddingHorizontal: contentPadding,
    width: '100%' as const,
    maxWidth: contentMaxWidth,
    alignSelf: 'center' as const,
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {scroll ? (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.scroll,
            frame,
            { paddingBottom: bottom + 32 },
          ]}>
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.fill, frame, { paddingBottom: bottom }]}>
          {children}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.parchment,
  },
  fill: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingTop: 12,
  },
});
