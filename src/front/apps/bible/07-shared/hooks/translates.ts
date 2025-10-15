import { useAtom, useAtomValue } from 'atomaric';
import { bibleMyTranslatesAtom, bibleShowTranslatesAtom } from '../state/atoms';

export const useBibleMyTranslates = () => useAtom(bibleMyTranslatesAtom);
export const useBibleShowTranslates = () => useAtom(bibleShowTranslatesAtom);
export const useBibleShowTranslatesValue = () => useAtomValue(bibleShowTranslatesAtom);
