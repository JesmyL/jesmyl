import { BibleTranslateName } from 'shared/api';
import { bibleMyTranslatesAtom, bibleShowTranslatesAtom } from './store/atoms';
import { bibleTranslatesIDB } from './store/bibleIDB';

export const removeBibleTranslate = async (tName: BibleTranslateName) => {
  await bibleTranslatesIDB.remove[tName]();

  const showTranslates = new Set(bibleShowTranslatesAtom.get());
  const myTranslatesSet = new Set(bibleMyTranslatesAtom.get());
  myTranslatesSet.delete(tName);
  showTranslates.delete(tName);
  bibleMyTranslatesAtom.set(Array.from(myTranslatesSet));
  if (!showTranslates.size) bibleShowTranslatesAtom.set([Array.from(myTranslatesSet)[0]]);
};
