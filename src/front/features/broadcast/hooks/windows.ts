import { atom, useAtomSet, useAtomValue } from 'atomaric';
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
