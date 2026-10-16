import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { InquiryForm } from '../../components/organisms/InquiryForm';
import { StoryPage } from '../../components/organisms/StoryPage';
import type { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Contact'>;

const copy = {
  question: {
    title: 'Have a question. Send it here.',
    paragraphs: [
      'Name, email, phone, and the question. The lounge team is who answers — this app only keeps your copy.',
    ],
    label: 'Message',
    submit: 'Submit your request',
  },
  franchise: {
    title: 'Become a franchise.',
    paragraphs: [
      'Tell them the city you have in mind and how you want to operate. This is an introduction, not an application pack.',
    ],
    label: 'City and what you want to ask',
    submit: 'Send franchise note',
  },
  voucher: {
    title: 'Voucher note.',
    paragraphs: ['Include the amount and the name on the gift.'],
    label: 'Message',
    submit: 'Send',
  },
};

export function ContactScreen({ route }: Props) {
  const kind = route.params?.kind ?? 'question';
  const page = copy[kind];

  return (
    <StoryPage kicker="Contact" title={page.title} paragraphs={page.paragraphs}>
      <InquiryForm
        kind={kind}
        messageLabel={route.params?.prompt ?? page.label}
        submitLabel={page.submit}
      />
    </StoryPage>
  );
}
