import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BackArrow } from '../atoms/BackArrow';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { ScreenScaffold } from './ScreenScaffold';

type Props = {
  kicker: string;
  title: string;
  paragraphs: string[];
  children?: ReactNode;
};

export function StoryPage({ kicker, title, paragraphs, children }: Props) {
  const navigation = useNavigation();

  return (
    <ScreenScaffold scroll>
      <BackArrow onPress={() => navigation.goBack()} />
      <Text style={styles.kicker}>{kicker}</Text>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rule} />
      {paragraphs.map(paragraph => (
        <Text key={paragraph} style={styles.body}>
          {paragraph}
        </Text>
      ))}
      {children}
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  kicker: {
    ...typography.label,
    color: colors.copper,
    marginTop: 18,
  },
  title: {
    ...typography.screenTitle,
    color: colors.ink,
    marginTop: 8,
  },
  rule: {
    height: 1,
    backgroundColor: colors.line,
    marginVertical: 18,
  },
  body: {
    ...typography.body,
    color: colors.ink,
    marginBottom: 14,
  },
});
