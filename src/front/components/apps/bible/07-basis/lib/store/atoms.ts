import { BibleBooki, BibleChapteri, BibleTranslationJoinAddress, BibleVersei } from '$bible/basis/model/base';
import { atom } from 'atomaric';
import { BibleTranslateName } from 'shared/api';

export const bibleBookiAtom = atom(BibleBooki.def, 'bible:booki');
export const bibleChapteriAtom = atom(BibleChapteri.def, 'bible:chapteri');
export const bibleVerseiAtom = atom(BibleVersei.def, 'bible:versei');
export const bibleShowTranslatesAtom = atom<BibleTranslateName[]>([BibleTranslateName.rst], 'bible:showTranslates');
export const bibleMyTranslatesAtom = atom<BibleTranslateName[]>([BibleTranslateName.rst], 'bible:myTranslates');
export const bibleJoinAddressAtom = atom<BibleTranslationJoinAddress | nil>(null, 'bible:joinAddress');
