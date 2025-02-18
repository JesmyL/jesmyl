import { atom, useAtomSet, useAtomValue } from 'front/08-shared/lib/atoms';
import { useScreenTranslationCurrentConfigi } from './configs';

export type TranslationWindow = {
  win: Window;
  focus: () => void;
  blur: () => void;
};

const windowsAtom = atom<(nil | TranslationWindow)[]>([]);

export const useScreenTranslationWindows = () => useAtomValue(windowsAtom);
export const useUpdateScreenTranslationWindows = () => useAtomSet(windowsAtom);
export const useScreenTranslationCurrentWindow = () => useAtomValue(windowsAtom)[useScreenTranslationCurrentConfigi()];
