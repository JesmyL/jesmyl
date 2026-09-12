import { useAtomValue } from 'atomaric';
import { Langi } from 'shared/api';
import { translateLanguage } from '../const/consts';
import { bibleShowTranslatesAtom } from '../state/atoms';

export const useBibleCurrentLangi = () => translateLanguage[useAtomValue(bibleShowTranslatesAtom)[0]] ?? Langi.Ru;
