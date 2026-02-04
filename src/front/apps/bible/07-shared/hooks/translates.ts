import { useAtomValue } from 'atomaric';
import { bibleShowTranslatesAtom } from '../state/atoms';

export const useBibleShowTranslatesValue = () => useAtomValue(bibleShowTranslatesAtom);
