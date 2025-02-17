import { contextCreator } from '../../../../07-shared/lib/contextCreator';
import { TranslationViewApp } from './Translations.model';

export const [CurrentForceViweAppContext, useCurrentForceViweAppContext] = contextCreator<TranslationViewApp | und>(
  undefined,
);
