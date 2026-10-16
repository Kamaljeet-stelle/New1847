import { useCallback, useState } from 'react';

export function useToast() {
  const [toast, setToast] = useState<{ message: string; tone: 'info' | 'error' } | null>(null);

  const show = useCallback((message: string, tone: 'info' | 'error' = 'info') => {
    setToast({ message, tone });
    window.setTimeout(() => setToast(null), 3200);
  }, []);

  const dismiss = useCallback(() => setToast(null), []);

  return { toast, show, dismiss };
}
