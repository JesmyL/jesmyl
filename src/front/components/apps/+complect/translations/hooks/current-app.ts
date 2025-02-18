import { complectIDB } from '#basis/lib/idb/complect';
import { useCallback } from 'react';
import { TranslationViewApp } from '../../../../../07-basis/model/Translations.model';

export const useSwitchCurrentTranslationTextApp = () => {
  const app = complectIDB.useValue.currentTranslationTextApp();

  return useCallback(
    (setApp?: TranslationViewApp) =>
      complectIDB.set.currentTranslationTextApp(setApp ?? (app === 'cm' ? 'bible' : 'cm')),
    [app],
  );
};
