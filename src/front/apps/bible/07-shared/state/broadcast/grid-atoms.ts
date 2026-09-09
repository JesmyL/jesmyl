import { makeBroadcastGridNetElectronTabIdFreeAtom } from '#widgets/broadcast/lib/makeBroadcastGridNetElectronTabIdFree';
import { BroadcastGridNumberNetPack } from '#widgets/broadcast/model/TabConfig';
import { BibleBroadcastKeyListenScope, BibleBroadcastTabId } from '$bible/shared/model/broadcast';
import { atom } from 'atomaric';

const electronTabIdSet = new Set<BibleBroadcastTabId>([BibleBroadcastTabId.WorkDir]);

export const bibleBroadcastGridTabsAtom = makeBroadcastGridNetElectronTabIdFreeAtom(
  electronTabIdSet,
  [
    [BibleBroadcastTabId.Preview, BibleBroadcastTabId.Slide],
    [BibleBroadcastTabId.List],
    [BibleBroadcastTabId.Control, BibleBroadcastTabId.Alert],
    //
    [BibleBroadcastTabId.Configs, BibleBroadcastTabId.WorkDir],
    [BibleBroadcastTabId.Search],
    [BibleBroadcastTabId.History, BibleBroadcastTabId.Plan],
  ],
  'bible-bro:gridTabOrder',
);

export const bibleBroadcastGridSizesAtom = atom<BroadcastGridNumberNetPack>(
  [50, 25, 25, 25, 0, 25],
  'bible-bro:gridSizes',
);
export const bibleBroadcastGridActiveTabiAtom = atom<BroadcastGridNumberNetPack>([0, 0, 0, 0, 0, 0]);

export const bibleBroadcastKeyListenScopeAtom = atom(BibleBroadcastKeyListenScope.AAAddressNav);
export const bibleBroadcastKeyListenSameScopeAtom = atom(0);
