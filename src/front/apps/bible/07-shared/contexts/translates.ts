import { contextCreator } from '#shared/lib/contextCreator';
import { BibleBookTranslates } from '../state/TranslatesContext';

export const [BibleTranslatesContext, useBibleTranslatesContext] = contextCreator<BibleBookTranslates>({});
