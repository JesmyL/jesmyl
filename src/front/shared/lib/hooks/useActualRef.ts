import { useMemo } from 'react';

export type ActualRef<Value> = { readonly current: Value };

export const useActualRef = <Value>(value: Value): ActualRef<Value> => {
  const ref = useMemo(() => ({}), []) as { readonly current: Value };
  (ref as { current: Value }).current = value;

  return ref;
};
