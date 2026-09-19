import { translateBase } from '#basis/locale';
import { BibleBroadcastKeyListenScope } from '$bible/shared/model/broadcast';

export const bibleBroadcastSearchAreaConfigDict = {
  [BibleBroadcastKeyListenScope.SearchInText]: {
    title: () => translateBase(it => it.txt),
    htmlTitle: 'F2',
  },

  [BibleBroadcastKeyListenScope.SearchInChapter]: {
    title: () => translateBase(it => it.bible.chapter),
    htmlTitle: 'F3',
  },

  [BibleBroadcastKeyListenScope.SearchByAddress]: {
    title: () => translateBase(it => it.link),
    htmlTitle: 'F4',
  },
} satisfies PRecord<BibleBroadcastKeyListenScope, { title: () => string; htmlTitle: string }>;
