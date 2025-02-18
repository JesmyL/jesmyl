import { TranslationViewApp } from '#basis/model/Translations.model';
import { contextCreator } from 'front/08-shared/lib/contextCreator';

export const [CurrentForceViweAppContext, useCurrentForceViweAppContext] = contextCreator<TranslationViewApp | und>(
  undefined,
);
