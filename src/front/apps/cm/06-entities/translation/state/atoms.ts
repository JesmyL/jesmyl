import { atom, useAtom } from 'atomaric';

export const cmTranslationBlockAtom = atom(0);
export const useCmTranslationBlock = () => useAtom(cmTranslationBlockAtom);
