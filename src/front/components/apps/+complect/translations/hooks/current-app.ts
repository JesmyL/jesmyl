import { complectIDB } from '#basis/idb';
import { useCallback } from 'react';
import { TranslationViewApp } from '../Translations.model';

export const useSwitchCurrentTranslationTextApp = () => {
  const app = complectIDB.useValue.currentTranslationTextApp();

  return useCallback(
    (setApp?: TranslationViewApp) =>
      complectIDB.set.currentTranslationTextApp(setApp ?? (app === 'cm' ? 'bible' : 'cm')),
    [app],
  );
};
