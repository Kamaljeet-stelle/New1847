import { useNavigate } from 'react-router-dom';
import { Button, EmptyState, PageHeader } from '../components/ui';

export function PackagesPage() {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader kicker="Packages" title="Series packages" lead="Packages are arranged with your lounge." />
      <EmptyState
        title="No packages on this device"
        body="Ask a lounge about series packages for regular visits."
        action={<Button onClick={() => navigate('/contact')}>Ask a lounge</Button>}
      />
    </div>
  );
}
