import { contextCreator } from '../../../shared/lib/contextCreator';
import { TranslationViewApp } from '../model/Translations.model';

export const [CurrentForceViweAppContext, useCurrentForceViweAppContext] = contextCreator<TranslationViewApp | und>(
  undefined,
);
