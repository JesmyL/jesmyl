import { BibleTranslateName } from 'shared/model/bible';
import { bibleMyTranslatesAtom, bibleShowTranslatesAtom } from '../state/atoms';
import { bibleTBCVTranslatesIDB } from '../state/bibleIDB';
import { makeBibleTbcvPrefix } from './tbcv.parser';

export const removeBibleTranslate = async (tName: BibleTranslateName) => {
  await bibleTBCVTranslatesIDB.tb.list.where('k').startsWith(makeBibleTbcvPrefix(tName)).delete();

  const showTranslates = new Set(bibleShowTranslatesAtom.get());
  const myTranslatesSet = new Set(bibleMyTranslatesAtom.get());
  myTranslatesSet.delete(tName);
  showTranslates.delete(tName);
  bibleMyTranslatesAtom.set(Array.from(myTranslatesSet));
  if (!showTranslates.size) bibleShowTranslatesAtom.set([Array.from(myTranslatesSet)[0]]);
};
