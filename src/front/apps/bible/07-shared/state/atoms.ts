import { atom, useAtomValue } from 'atomaric';
import { BibleTranslateName, Langi } from 'shared/api';
import { BibleTitleCodei } from 'shared/model/bible/enums';
import { translateLanguage } from '../const/consts';
import { BibleBroadcastJoinAddress, BibleChapteri, BibleVersei } from '../model/base';

export const bibleBookiAtom = atom(BibleTitleCodei.aБыт, 'bible:booki');
export const bibleChapteriAtom = atom(BibleChapteri.def, 'bible:chapteri');
export const bibleVerseiAtom = atom(BibleVersei.def, 'bible:versei');

export const bibleShowTranslatesAtom = atom<BibleTranslateName[]>([BibleTranslateName.rst], 'bible:showTranslates');
export const bibleMyTranslatesAtom = atom<BibleTranslateName[]>([BibleTranslateName.rst], 'bible:myTranslates');
export const bibleJoinAddressAtom = atom<[BibleBroadcastJoinAddress | nil]>([null], 'bible:joinAddress_v1');

export const useBibleCurrentLangi = () => translateLanguage[useAtomValue(bibleShowTranslatesAtom)[0]] ?? Langi.Ru;

export const biblePlanCurrentItemiAtom = atom(0);
