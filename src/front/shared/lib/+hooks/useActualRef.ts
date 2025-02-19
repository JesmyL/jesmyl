import { useMemo } from 'react';
import { emptyArray } from 'shared/utils';

const setter = () => ({});

export type ActualRef<Value> = { readonly current: Value };

export const useActualRef = <Value>(value: Value): ActualRef<Value> => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ref = useMemo(setter as never, emptyArray as never) as { readonly current: Value };
  (ref as { current: Value }).current = value;

  return ref;
};
