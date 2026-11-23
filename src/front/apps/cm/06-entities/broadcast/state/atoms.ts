import { HorizontalDirection } from '#shared/model/Direction';
import { atom } from 'atomaric';
import { CmComWid } from 'shared/api';
import { CmBroadcastMonolineSlideOrdStrId } from 'shared/model/cm/broadcast';

export const cmBroadcastCurrentNameSpaceiAtom = atom(0, 'broadcast:nameSpacei');

export const cmBroadcastCurrentSlideiAtom = atom<{
  comw: CmComWid | nil;
  slidei: number;
  slideId: nil | CmBroadcastMonolineSlideOrdStrId;
}>({
  comw: null,
  slidei: 0,
  slideId: null,
});
export const cmBroadcastSwitchBlockDirectionAtom = atom(HorizontalDirection.Center);
