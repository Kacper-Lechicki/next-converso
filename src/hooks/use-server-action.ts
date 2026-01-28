import { useTranslations } from 'next-intl';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

export const useServerAction = <T, R>(action: (data: T) => Promise<R>) => {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<R | null>(null);
  const t = useTranslations('Error');

  const run = async (
    data: T,
    options?: {
      onSuccess?: (result: R) => void;
      onError?: (error: unknown) => void;
    },
  ) => {
    return new Promise<R | null>((resolve) => {
      startTransition(async () => {
        try {
          const res = await action(data);
          setResult(res);
          options?.onSuccess?.(res);
          resolve(res);
        } catch (error) {
          if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
            throw error;
          }

          const message =
            error instanceof Error ? error.message : 'something_went_wrong';

          toast.error(t(message));

          options?.onError?.(error);
          resolve(null);
        }
      });
    });
  };

  return { run, isPending, result };
};
