import { contextCreator } from '#shared/lib/contextCreator';
import { TranslationViewApp } from './Translations.model';

export const [CurrentForceViweAppContext, useCurrentForceViweAppContext] = contextCreator<TranslationViewApp | und>(
  undefined,
);
