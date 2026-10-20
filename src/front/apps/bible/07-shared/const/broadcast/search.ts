import { translateBase } from '#basis/locale';
import { BibleBroadcastKeyListenScope } from '$bible/shared/model/broadcast';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const bibleBroadcastSearchAreaConfigDict = {
  [BibleBroadcastKeyListenScope.SearchInText]: {
    title: () => translateBase(BaseLocaleKey.Text),
    htmlTitle: 'F2',
  },

  [BibleBroadcastKeyListenScope.SearchInChapter]: {
    title: () => translateBase(BaseLocaleKey.BibleChapter),
    htmlTitle: 'F3',
  },

  [BibleBroadcastKeyListenScope.SearchByAddress]: {
    title: () => translateBase(BaseLocaleKey.Link),
    htmlTitle: 'F4',
  },
} satisfies PRecord<BibleBroadcastKeyListenScope, { title: () => string; htmlTitle: string }>;
