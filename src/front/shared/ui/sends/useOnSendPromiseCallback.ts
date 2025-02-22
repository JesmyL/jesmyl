import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { useCallback, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CallbackWithDto<Dto = any, Ret = void> = Dto extends never ? () => Ret : (dto: Dto) => Ret;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useOnSendPromiseCallback = <Value, Dto = any>(
  onSend?: CallbackWithDto<Dto, Promise<Value> | void | nil>,
  onSuccess?: ((value: Value) => void) | nil,
  onFailure?: ((error: string) => void) | nil,
): [CallbackWithDto, string, boolean] => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const onSuccessRef = useActualRef(onSuccess);
  const onFailureRef = useActualRef(onFailure);
  const onSendRef = useActualRef(onSend);

  return [
    useCallback(
      (dto: Dto) => {
        if (onSendRef.current === undefined) return;
        const promise = onSendRef.current(dto);

        if (promise instanceof Promise) {
          setIsLoading(true);
          promise
            .then(val => {
              setIsLoading(false);
              onSuccessRef.current?.(val);
            })
            .catch(errorMessage => {
              setIsLoading(false);
              setError(errorMessage);
              onFailureRef.current?.(errorMessage);
            });
        }
      },
      [onFailureRef, onSendRef, onSuccessRef],
    ),
    error,
    isLoading,
  ] as const;
};
