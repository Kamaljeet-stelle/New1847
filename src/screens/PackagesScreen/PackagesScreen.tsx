import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EmptyState } from '../../components/molecules/EmptyState';
import { ScreenScaffold } from '../../components/organisms/ScreenScaffold';
import { StackHeader } from '../../components/organisms/StackHeader';
import type { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Packages'>;

export function PackagesScreen({ navigation }: Props) {
  return (
    <ScreenScaffold>
      <StackHeader title="Series packages" onBack={() => navigation.goBack()} />
      <EmptyState
        title="No packages yet"
        body="Series packages bundle repeat visits at a lower price per visit. Ask the lounge which packages they offer."
        action="Ask a lounge"
        onAction={() =>
          navigation.navigate('Contact', {
            kind: 'question',
            prompt: 'Which series package are you interested in?',
          })
        }
      />
    </ScreenScaffold>
  );
}
