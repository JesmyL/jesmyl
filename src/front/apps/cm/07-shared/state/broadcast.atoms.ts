import { makeBroadcastGridNetElectronTabIdFreeAtom } from '#widgets/broadcast/lib/makeBroadcastGridNetElectronTabIdFree';
import { BroadcastGridNumberNetPack } from '#widgets/broadcast/model/TabConfig';
import { atom } from 'atomaric';
import { CmComWidDef, HttpNumLeadLink } from 'shared/api';
import { CmBroadcastTabId } from '../model/broadcast';

export const cmPlayerBroadcastComwAtom = atom(CmComWidDef);
export const cmPlayerBroadcastAudioSrcAtom = atom<HttpNumLeadLink | null>(null);

const electronTabIdSet = new Set<CmBroadcastTabId>([CmBroadcastTabId.WorkDir]);

export const cmBroadcastGridTabsAtom = makeBroadcastGridNetElectronTabIdFreeAtom(
  electronTabIdSet,
  [
    [CmBroadcastTabId.List],
    [CmBroadcastTabId.Preview],
    [CmBroadcastTabId.Alert],
    //
    [CmBroadcastTabId.Configs, CmBroadcastTabId.WorkDir],
    [CmBroadcastTabId.Slides],
    [CmBroadcastTabId.Dropdowns],
  ],
  'cm-bro:gridTabOrder',
);

export const cmBroadcastGridSizesAtom = atom<BroadcastGridNumberNetPack>([50, 25, 25, 25, 0, 25], 'cm-bro:gridSizes');
export const cmBroadcastGridActiveTabiAtom = atom<BroadcastGridNumberNetPack>([0, 0, 0, 0, 0, 0]);
