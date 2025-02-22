import { contextCreator } from '#shared/lib/contextCreator';
import { BibleBookTranslates } from '../TranslatesContext';

export const [BibleTranslatesContext, useBibleTranslatesContext] = contextCreator<BibleBookTranslates>({});
