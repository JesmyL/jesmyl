import { useCallback } from 'react';
import { complectIDB } from '../../_idb/complectIDB';
import { TranslationViewApp } from '../Translations.model';

export const useSwitchCurrentTranslationTextApp = () => {
  const app = complectIDB.useValue.currentTranslationTextApp();

  return useCallback(
    (setApp?: TranslationViewApp) =>
      complectIDB.set.currentTranslationTextApp(setApp ?? (app === 'cm' ? 'bible' : 'cm')),
    [app],
  );
};
