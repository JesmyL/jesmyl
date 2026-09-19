import { Atom, atom } from 'atomaric';
import { BibleTranslateName } from 'shared/model/bible';
import { iife } from 'shared/utils';

export const takeBibleTranslateBookSizesAtom = iife(() => {
  const result = {} as Record<BibleTranslateName, Atom<(number[] | nil)[]>>;
  return (tName: BibleTranslateName) => (result[tName] ??= atom([] as (number[] | nil)[], `bible:${tName}-tranLenNet`));
});
