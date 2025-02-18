import { bibleIDB, bibleTranslatesIDB } from '#basis/lib/idb/bible';
import { BibleTranslateName } from 'shared/api';

export const removeBibleTranslate = async (tName: BibleTranslateName) => {
  await bibleTranslatesIDB.remove[tName]();

  const showTranslates = new Set(await bibleIDB.get.showTranslates());
  const myTranslatesSet = new Set(await bibleIDB.get.myTranslates());
  myTranslatesSet.delete(tName);
  showTranslates.delete(tName);
  bibleIDB.set.myTranslates(Array.from(myTranslatesSet));
  if (!showTranslates.size) bibleIDB.set.showTranslates([Array.from(myTranslatesSet)[0]]);
};
