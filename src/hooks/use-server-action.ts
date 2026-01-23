/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslations } from 'next-intl';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

export const useServerAction = <T, R>(action: (data: T) => Promise<R>) => {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<R | null>(null);
  const t = useTranslations('Error');

  const run = async (
    data: T,
    options?: { onSuccess?: (result: R) => void },
  ) => {
    return new Promise<R | null>((resolve) => {
      startTransition(async () => {
        try {
          const res = await action(data);
          setResult(res);
          options?.onSuccess?.(res);
          resolve(res);
        } catch (error: any) {
          if (error.message === 'NEXT_REDIRECT') {
            throw error;
          }

          let message = 'something_went_wrong';

          if (error instanceof Error) {
            const isKey =
              !error.message.includes(' ') && error.message.length < 50;

            if (isKey) {
              message = error.message;
            }
          }

          toast.error(t(message));
          resolve(null);
        }
      });
    });
  };

  return { run, isPending, result };
};
