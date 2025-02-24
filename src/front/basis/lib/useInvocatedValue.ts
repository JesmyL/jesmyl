import { addAbortControlledPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { useEffect, useState } from 'react';

export const useInvocatedValue = <Value>(
  initialValue: Value,
  invocation: (aborter: AbortController) => Promise<Value>,
  deps: unknown[],
) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    return hookEffectPipe()
      .pipe(
        addAbortControlledPipe(async aborter => {
          try {
            const value = await invocation(aborter);
            setValue(value);
            setIsLoading(false);
          } catch (error) {
            if (aborter.signal.aborted) return;
            setTimeout(setIsLoading, 100, false);
            setError(error);
          }
        }),
      )
      .effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [value, isLoading, error] as const;
};
