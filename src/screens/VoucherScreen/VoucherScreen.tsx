import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { InquiryForm } from '../../components/organisms/InquiryForm';
import { StoryPage } from '../../components/organisms/StoryPage';
import { voucherParagraphs } from '../../data/stories';
import type { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Vouchers'>;

export function VoucherScreen({ route }: Props) {
  const occasion = route.params?.occasion;
  return (
    <StoryPage
      kicker="Vouchers"
      title={occasion ?? 'A gift, confirmed by the team.'}
      paragraphs={
        occasion
          ? [`A ${occasion} card. Tell the team the amount and the name.`, ...voucherParagraphs]
          : voucherParagraphs
      }>
      <InquiryForm
        kind="voucher"
        messageLabel={occasion ? `${occasion} — amount and recipient` : 'Amount and who it is for'}
        submitLabel="Request voucher"
      />
    </StoryPage>
  );
}
