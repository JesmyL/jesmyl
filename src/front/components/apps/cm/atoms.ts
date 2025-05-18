import { atom, useAtom } from 'atomaric';

export const translationBlockAtom = atom(0);
export const useComTranslationBlock = () => useAtom(translationBlockAtom);

export const cmChordHardLevelAtom = atom<1 | 2 | 3>(2, 'cm:chord-hard-level');
export const cmIsComMiniAnchorAtom = atom(false, 'cm:is-com-mini-anchor');
export const cmIsShowCatBindsInCompositionAtom = atom(false);
