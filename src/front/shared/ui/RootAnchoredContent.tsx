import { Atom } from 'atomaric';
import { useEffect } from 'react';
import { useSetRootAnchoredContent } from './useSetRootAnchoredContent';

interface Props<Value> {
  children: React.ReactNode;
  openAtom: Atom<Value>;
}

export const RootAnchoredContent = <Value,>({ children, openAtom }: Props<Value>) => {
  const setContent = useSetRootAnchoredContent(openAtom, children);

  useEffect(() => setContent(), [children, setContent]);

  return <></>;
};
