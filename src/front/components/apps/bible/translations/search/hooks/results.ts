import { BibleTranslationSingleAddress } from '$bible/basis/model/base';
import { atom, useAtom, useAtomSet, useAtomValue } from 'atomaric';

const listAtom = atom<BibleTranslationSingleAddress[]>([]);
const selectediAtom = atom<number | null>(null);

export const useBibleTranslationSearchResultList = () => useAtom(listAtom);

export const useBibleTranslationSearchResultSelectedValue = () => useAtomValue(selectediAtom);
export const useBibleTranslationSearchResultSelectedSet = () => useAtomSet(selectediAtom);
