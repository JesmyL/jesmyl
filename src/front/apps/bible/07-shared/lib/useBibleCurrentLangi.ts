import { useAtomValue } from 'atomaric';
import { Langi } from 'shared/api';
import { bibleTranslateLanguage } from '../const/consts';
import { bibleShowTranslatesAtom } from '../state/atoms';

export const useBibleCurrentLangi = () => bibleTranslateLanguage[useAtomValue(bibleShowTranslatesAtom)[0]] ?? Langi.Ru;
