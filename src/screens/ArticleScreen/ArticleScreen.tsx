import { Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BackArrow } from '../../components/atoms/BackArrow';
import { ScreenScaffold } from '../../components/organisms/ScreenScaffold';
import { StoryPage } from '../../components/organisms/StoryPage';
import { getArticle } from '../../services/catalog.services';
import type { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Article'>;

export function ArticleScreen({ navigation, route }: Props) {
  const article = getArticle(route.params.articleId);

  if (!article) {
    return (
      <ScreenScaffold scroll>
        <BackArrow onPress={() => navigation.goBack()} />
        <Text>This note is missing.</Text>
      </ScreenScaffold>
    );
  }

  return (
    <StoryPage
      kicker={`${article.month} · ${article.minutes}`}
      title={article.title}
      paragraphs={[article.excerpt, ...article.body]}
    />
  );
}
