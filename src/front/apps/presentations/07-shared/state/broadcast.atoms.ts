import { makeBroadcastGridNetElectronTabIdFreeAtom } from '#widgets/broadcast/lib/makeBroadcastGridNetElectronTabIdFree';
import { BroadcastGridNumberNetPack, BroadcastGridTabNet } from '#widgets/broadcast/model/TabConfig';
import { PresentationsBroadcastTabId } from '$presentations/shared/model/broadcast';
import { PresentationSlide } from '$presentations/shared/model/model';
import { atom } from 'atomaric';
import { checkIsEq } from 'shared/utils/checkIsEq';

const gridTabNet: BroadcastGridTabNet<PresentationsBroadcastTabId> = [
  [PresentationsBroadcastTabId.WorkDir],
  [PresentationsBroadcastTabId.Slides],
  [PresentationsBroadcastTabId.Preview],
  [],
  [],
  [],
];

const legacyGridTabNet: BroadcastGridTabNet<PresentationsBroadcastTabId> = [
  [PresentationsBroadcastTabId.WorkDir],
  [PresentationsBroadcastTabId.Slides, PresentationsBroadcastTabId.Preview],
  [],
  [],
  [],
  [],
];

export const presentationsBroadcastGridTabsAtom = makeBroadcastGridNetElectronTabIdFreeAtom(
  new Set<PresentationsBroadcastTabId>(),
  gridTabNet,
  'presentations-bro:gridTabOrder',
);

if (checkIsEq(presentationsBroadcastGridTabsAtom.get(), legacyGridTabNet))
  presentationsBroadcastGridTabsAtom.set(gridTabNet);

const gridSizes: BroadcastGridNumberNetPack = [50, 25, 25, 25, 0, 25];
const legacyGridSizes: BroadcastGridNumberNetPack = [35, 65, 0, 0, 0, 0];

export const presentationsBroadcastGridSizesAtom = atom<BroadcastGridNumberNetPack>(
  gridSizes,
  'presentations-bro:gridSizes',
);

if (checkIsEq(presentationsBroadcastGridSizesAtom.get(), legacyGridSizes))
  presentationsBroadcastGridSizesAtom.set(gridSizes);

export const presentationsBroadcastGridActiveTabiAtom = atom<BroadcastGridNumberNetPack>([0, 0, 0, 0, 0, 0]);

export const presentationsCurrentFilePathAtom = atom<string | nil>(null);
export const presentationsCurrentSlidesAtom = atom<PresentationSlide[] | nil>(null);
export const presentationsCurrentSlidAtom = atom<number | nil>(null);
