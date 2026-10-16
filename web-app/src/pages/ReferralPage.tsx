import { referralOffer, referralSteps, shareMessage } from '../data/referral';
import { useBooking } from '@shared/hooks/useBooking';
import { referralCode } from '@shared/services/profile.services';
import { Button, PageHeader, Toast } from '../components/ui';
import { useToast } from '../hooks/useToast';

export function ReferralPage() {
  const { profile } = useBooking();
  const code = referralCode(profile);
  const { toast, show, dismiss } = useToast();

  return (
    <div style={{ maxWidth: 720 }}>
      <PageHeader
        kicker="Referral"
        title="Share 1847"
        lead={`Friends get AED ${referralOffer.friendAed} off. You earn AED ${referralOffer.creditAed} after their visit.`}
      />
      <div className="card" style={{ borderStyle: 'dashed', textAlign: 'center', marginBottom: 18 }}>
        <p className="kicker">Your code</p>
        <h2 className="serif" style={{ margin: '10px 0', fontSize: 36, userSelect: 'all' }}>{code}</h2>
        <p style={{ color: 'var(--muted)' }}>Select and copy, or share below</p>
      </div>
      <ol style={{ paddingLeft: 18, lineHeight: 1.7, color: 'var(--muted)' }}>
        {referralSteps.map(step => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <Button
        style={{ marginTop: 18 }}
        onClick={async () => {
          const text = shareMessage(code);
          try {
            if (navigator.share) {
              await navigator.share({ text });
            } else if (navigator.clipboard) {
              await navigator.clipboard.writeText(text);
              show('Message copied');
            } else {
              show(text);
            }
          } catch {
            // intentional non-blocking
          }
        }}>
        Share
      </Button>
      {toast ? <Toast message={toast.message} tone={toast.tone} onDismiss={dismiss} /> : null}
    </div>
  );
}
