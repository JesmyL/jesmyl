import { BroadcastGridNumberNetPack, BroadcastGridTabNet } from '#widgets/broadcast/model/TabConfig';
import { atom } from 'atomaric';
import { CmComWidDef, HttpNumLeadLink } from 'shared/api';
import { CmBroadcastTabId } from '../model/broadcast';

export const cmPlayerBroadcastComwAtom = atom(CmComWidDef);
export const cmPlayerBroadcastAudioSrcAtom = atom<HttpNumLeadLink | null>(null);

export const broadcastGridTabsAtom = atom<BroadcastGridTabNet<CmBroadcastTabId>>(
  [
    [CmBroadcastTabId.List],
    [CmBroadcastTabId.Preview],
    [CmBroadcastTabId.Alert],
    //
    [CmBroadcastTabId.Configs],
    [CmBroadcastTabId.Slides],
    [CmBroadcastTabId.Dropdowns],
  ],
  'cm-bro:gridTabOrder',
);

export const broadcastGridSizesAtom = atom<BroadcastGridNumberNetPack>([50, 25, 25, 25, 0, 25], 'cm-bro:gridSizes');
export const broadcastGridActiveTabiAtom = atom<BroadcastGridNumberNetPack>([0, 0, 0, 0, 0, 0], 'cm-bro:activeTabi');
