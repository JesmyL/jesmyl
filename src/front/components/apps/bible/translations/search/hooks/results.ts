import { atom, useAtom, useAtomSet, useAtomValue } from '#shared/lib/atoms';
import { BibleTranslationSingleAddress } from '@bible/model';

const listAtom = atom<BibleTranslationSingleAddress[]>([]);
const selectediAtom = atom<number | null>(null);

export const useBibleTranslationSearchResultList = () => useAtom(listAtom);

export const useBibleTranslationSearchResultSelectedValue = () => useAtomValue(selectediAtom);
export const useBibleTranslationSearchResultSelectedSet = () => useAtomSet(selectediAtom);
