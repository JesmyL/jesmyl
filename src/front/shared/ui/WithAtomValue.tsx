import { Atom, useAtomValue } from 'atomaric';

export const WithAtomValue = <Value,>({
  atom,
  children,
}: {
  atom: Atom<Value>;
  children: (value: Value) => React.ReactNode;
}) => children(useAtomValue(atom));
