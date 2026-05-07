import { atom, Atom, useAtomValue } from 'atomaric';
import { useMemo } from 'react';

export const WithAtomWithValue = <Value,>({
  init,
  children,
}: {
  init: Value;
  children: (value: Value, atom: Atom<Value>) => React.ReactNode;
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const at = useMemo(() => atom(init), []);

  return children(useAtomValue(at), at);
};
