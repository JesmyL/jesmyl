import { atom, Atom } from 'atomaric';
import { useMemo } from 'react';

export const WithAtom = <Value,>({
  init,
  children,
}: {
  init: Value;
  children: (value: Atom<Value>) => React.ReactNode;
  // eslint-disable-next-line react-hooks/exhaustive-deps
}) => children(useMemo(() => atom(init), []));
