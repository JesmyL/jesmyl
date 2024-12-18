import { atom, useAtom } from '../../../complect/atoms';

export const translationBlockAtom = atom(0);
export const useComTranslationBlock = () => useAtom(translationBlockAtom);

const numComUpdatesAtom = atom(0);
export const useNumComUpdates = () => useAtom(numComUpdatesAtom);
