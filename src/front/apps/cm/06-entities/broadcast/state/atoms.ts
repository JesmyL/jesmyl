import { HorizontalDirection } from '#shared/model/Direction';
import { atom } from 'atomaric';
import { CmBroadcastMonolineSlideOrdStrId } from 'shared/model/cm/broadcast';

export const cmBroadcastCurrentNameSpaceiAtom = atom(0, 'broadcast:nameSpacei');

export const cmBroadcastCurrentSlideiAtom = atom<{ slidei: number; slideId: nil | CmBroadcastMonolineSlideOrdStrId }>({
  slidei: 0,
  slideId: null,
});
export const cmBroadcastSwitchBlockDirectionAtom = atom(HorizontalDirection.Center);
