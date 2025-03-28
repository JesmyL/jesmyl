import { atom, useAtom, useAtomSet, useAtomValue } from '#shared/lib/atom';
import { BibleTranslationSingleAddress } from '$bible/basis/model/base';

const listAtom = atom<BibleTranslationSingleAddress[]>([]);
const selectediAtom = atom<number | null>(null);

export const useBibleTranslationSearchResultList = () => useAtom(listAtom);

export const useBibleTranslationSearchResultSelectedValue = () => useAtomValue(selectediAtom);
export const useBibleTranslationSearchResultSelectedSet = () => useAtomSet(selectediAtom);
