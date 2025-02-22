import { mylib } from '#shared/lib/my-lib';
import { bibleIDB } from '@bible/_db/bibleIDB';
import { BibleTranslationAddress } from '@bible/model';
import { useCallback } from 'react';

export const useBibleTranslationHistory = () => bibleIDB.useValue.translationHistory();

export const useBibleTranslationAddToHistory = () => {
  return useCallback(async (item: BibleTranslationAddress, isReplaceFirstNearVersei = false) => {
    const history = await bibleIDB.get.translationHistory();

    const previ = history.findIndex(historyItem => mylib.isEq(historyItem, item, true));
    const newHistory = [...history];
    if (previ > -1) newHistory.splice(previ, 1);

    if (isReplaceFirstNearVersei && mylib.isArr(newHistory[0])) {
      const [biblei, chapteri, versei] = newHistory[0];
      if (mylib.isEq(item, [biblei, chapteri, versei + 1]) || mylib.isEq(item, [biblei, chapteri, versei - 1])) {
        newHistory.shift();
      }
    }

    newHistory.unshift(item);
    if (newHistory.length > 50) newHistory.length = 50;

    bibleIDB.set.translationHistory(newHistory);
  }, []);
};

export const useBibleClearTranslationHistorySetter = () => {
  return useCallback(() => bibleIDB.set.translationHistory([]), []);
};
