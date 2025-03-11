import { useMemo } from 'react';

export type ActualRef<Value> = { current: Value };

export const useActualRef = <Value>(value: Value): ActualRef<Value> => {
  const ref = useMemo(() => ({}), []) as { current: Value };
  (ref as { current: Value }).current = value;

  return ref;
};
