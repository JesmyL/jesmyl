import { atom } from 'atomaric';

export const rootAppModalTextContentAtom = atom<{
  text: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}>({ text: null });
