import { useCallback } from 'react';
import { atom, useAtom, useAtomValue } from '../../../../../complect/atoms';
import { TranslationViewApp } from '../Translations.model';

export const currentTranslationTextAppAtom = atom<TranslationViewApp>('cm', 'complect', 'currentTranslationTextApp');

export const useCurrentTranslationTextApp = () => useAtom(currentTranslationTextAppAtom);
export const useCurrentTranslationTextAppValue = () => useAtomValue(currentTranslationTextAppAtom);

export const useSwitchCurrentTranslationTextApp = () => {
  const [app, set] = useCurrentTranslationTextApp();

  return useCallback((setApp?: TranslationViewApp) => set(setApp ?? (app === 'cm' ? 'bible' : 'cm')), [app, set]);
};
