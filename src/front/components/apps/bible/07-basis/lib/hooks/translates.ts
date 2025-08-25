import { useAtom, useAtomValue } from 'atomaric';
import { bibleMyTranslatesAtom, bibleShowTranslatesAtom } from '../store/atoms';

export const useBibleMyTranslates = () => useAtom(bibleMyTranslatesAtom);
export const useBibleShowTranslates = () => useAtom(bibleShowTranslatesAtom);
export const useBibleShowTranslatesValue = () => useAtomValue(bibleShowTranslatesAtom);
