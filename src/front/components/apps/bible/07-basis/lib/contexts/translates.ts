import { contextCreator } from '#shared/lib/contextCreator';
import { BibleBookTranslates } from '../../contexts/TranslatesContext';

export const [BibleTranslatesContext, useBibleTranslatesContext] = contextCreator<BibleBookTranslates>({});
