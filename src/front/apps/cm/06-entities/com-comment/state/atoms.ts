import { atom } from 'atomaric';
import { CmComCommentBlockSimpleSelector, CmComWid } from 'shared/api';

export const cmComCommentRedactOrdSelectorIdAtom = atom<CmComCommentBlockSimpleSelector | null>(null);
export const cmComCommentCurrentComw2OpenAltiDictAtom = atom<PRecord<CmComWid, number> & { lasti: number }>(
  { lasti: 0 },
  'cm:comCommentCurrentComw2OpenAltiDict',
);

export const cmComCommentRegisteredAltKeysAtom = atom((): string[] => [], 'cm:comCommentRegisteredAltKeysAtom');
