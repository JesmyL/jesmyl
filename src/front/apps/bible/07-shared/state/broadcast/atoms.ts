import { BroadcastGridNumberNetPack, BroadcastGridTabNet } from '#widgets/broadcast/model/TabConfig';
import { BibleBroadcastTabId } from '$bible/shared/model/broadcast';
import { atom } from 'atomaric';

export const bibleBroadcastGridTabsAtom = atom<BroadcastGridTabNet<BibleBroadcastTabId>>(
  [
    [BibleBroadcastTabId.Preview, BibleBroadcastTabId.Slide],
    [BibleBroadcastTabId.List],
    [BibleBroadcastTabId.Control, BibleBroadcastTabId.Alert],
    //
    [BibleBroadcastTabId.Configs],
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
