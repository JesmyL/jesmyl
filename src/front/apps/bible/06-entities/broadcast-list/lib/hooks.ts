import { BibleBooki, BibleChapteri, BibleVersei } from '$bible/shared/model/base';
import { bibleBookiAtom, bibleChapteriAtom, bibleVerseiAtom } from '$bible/shared/state/atoms';
import { checkIsNotNil } from 'shared/utils/checkIs';

export const bibleBroadcastListSingleAddressSet = (
  booki?: BibleBooki | nil,
  chapteri?: BibleChapteri | nil,
  versei?: BibleVersei | nil,
) => {
  if (checkIsNotNil(booki)) bibleBookiAtom.set(booki);
  if (checkIsNotNil(chapteri)) bibleChapteriAtom.set(chapteri);
  if (checkIsNotNil(versei)) bibleVerseiAtom.set(versei);
};
