import { useCallback, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BackArrow } from '../../components/atoms/BackArrow';
import { PageHeading } from '../../components/molecules/PageHeading';
import { ScreenScaffold } from '../../components/organisms/ScreenScaffold';
import { faqs } from '../../data/stories';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import type { Faq } from '../../types/catalog';
import type { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Faq'>;

export function FaqScreen({ navigation }: Props) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  const renderItem = useCallback(
    ({ item }: { item: Faq }) => {
      const open = item.id === openId;
      return (
        <Pressable
          accessibilityRole="button"
          onPress={() => setOpenId(open ? null : item.id)}
          style={styles.card}>
          <Text style={styles.question}>{item.question}</Text>
          {open ? <Text style={styles.answer}>{item.answer}</Text> : null}
        </Pressable>
      );
    },
    [openId],
  );

  return (
    <ScreenScaffold>
      <FlatList
        data={faqs}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        extraData={openId}
        ListHeaderComponent={
          <>
            <BackArrow onPress={() => navigation.goBack()} />
            <PageHeading kicker="Questions" title="Before you visit." />
          </>
        }
        ListEmptyComponent={<Text style={styles.empty}>No questions yet.</Text>}
        contentContainerStyle={styles.list}
        initialNumToRender={8}
        windowSize={5}
      />
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 24,
    flexGrow: 1,
  },
  card: {
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingVertical: 16,
  },
  question: {
    ...typography.cardTitle,
    color: colors.ink,
  },
  answer: {
    ...typography.body,
    color: colors.muted,
    marginTop: 8,
  },
  empty: {
    paddingVertical: 12,
  },
});
