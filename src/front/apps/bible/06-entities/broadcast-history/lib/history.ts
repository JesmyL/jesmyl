import { mylib } from '#shared/lib/my-lib';
import { BibleBroadcastAddress } from '$bible/shared/model/base';
import { bibleIDB } from '$bible/shared/state/bibleIDB';
import { useCallback } from 'react';

export const useBibleBroadcastHistory = () => bibleIDB.useValue.broadcastHistory();

export const useBibleBroadcastHistoryAddToHistory = () => {
  return useCallback(async (item: BibleBroadcastAddress, isReplaceFirstNearVersei = false) => {
    const history = await bibleIDB.get.broadcastHistory();

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

    bibleIDB.set.broadcastHistory(newHistory);
  }, []);
};

export const useBibleBroadcastHistoryClearHistorySetter = () => {
  return useCallback(() => bibleIDB.set.broadcastHistory([]), []);
};
