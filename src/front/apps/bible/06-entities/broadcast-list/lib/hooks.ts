import { BibleBooki, BibleChapteri, BibleVersei } from '$bible/shared/model/base';
import { bibleBookiAtom, bibleChapteriAtom, bibleVerseiAtom } from '$bible/shared/state/atoms';
import { checkIsNotUndefined } from 'shared/utils/checkIs';

export const bibleBroadcastListSingleAddressSet = (
  booki?: BibleBooki,
  chapteri?: BibleChapteri,
  versei?: BibleVersei,
) => {
  if (checkIsNotUndefined(booki)) bibleBookiAtom.set(booki);
  if (checkIsNotUndefined(chapteri)) bibleChapteriAtom.set(chapteri);
  if (checkIsNotUndefined(versei)) bibleVerseiAtom.set(versei);
};
