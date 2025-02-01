import { atom, useAtom } from '../../../complect/atoms';

export const translationBlockAtom = atom(0);
export const useComTranslationBlock = () => useAtom(translationBlockAtom);

export const isOpenChordImagesAtom = atom(false);
export const cmIsShowCatBindsInCompositionAtom = atom(false);
