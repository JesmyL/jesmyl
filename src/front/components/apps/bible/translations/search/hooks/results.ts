import { atom, useAtom, useAtomSet, useAtomValue } from 'front/08-shared/lib/atoms';
import { BibleTranslationSingleAddress } from '../../../../../../07-basis/model/bible';

const listAtom = atom<BibleTranslationSingleAddress[]>([]);
const selectediAtom = atom<number | null>(null);

export const useBibleTranslationSearchResultList = () => useAtom(listAtom);

export const useBibleTranslationSearchResultSelectedValue = () => useAtomValue(selectediAtom);
export const useBibleTranslationSearchResultSelectedSet = () => useAtomSet(selectediAtom);
