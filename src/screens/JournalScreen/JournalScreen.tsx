import { useCallback } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BackArrow } from '../../components/atoms/BackArrow';
import { PageHeading } from '../../components/molecules/PageHeading';
import { RecordCard } from '../../components/molecules/RecordCard';
import { ScreenScaffold } from '../../components/organisms/ScreenScaffold';
import { articles } from '../../data/stories';
import type { Article } from '../../types/catalog';
import type { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Journal'>;

export function JournalScreen({ navigation }: Props) {
  const renderItem = useCallback(
    ({ item }: { item: Article }) => (
      <RecordCard
        title={item.title}
        meta={`${item.month} · ${item.minutes}`}
        subtitle={item.excerpt}
        onPress={() => navigation.navigate('Article', { articleId: item.id })}
      />
    ),
    [navigation],
  );

  return (
    <ScreenScaffold>
      <FlatList
        data={articles}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <>
            <BackArrow onPress={() => navigation.goBack()} />
            <PageHeading
              kicker="Journal"
              title="Notes, not the full archive."
              subtitle="A short set of the subjects 1847 writes about. The long archive stays on the website."
            />
          </>
        }
        ListEmptyComponent={<Text style={styles.empty}>No notes yet.</Text>}
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
  empty: {
    paddingVertical: 12,
  },
});
