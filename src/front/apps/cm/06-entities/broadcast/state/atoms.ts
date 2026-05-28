import { HorizontalDirection } from '#shared/model/Direction';
import { atom } from 'atomaric';
import { CmBroadcastMonolineSlideOrdId } from 'shared/model/cm/broadcast';

export const cmBroadcastCurrentSlideiAtom = atom<{ slidei: number; slideId: nil | CmBroadcastMonolineSlideOrdId }>({
  slidei: 0,
  slideId: null,
});
export const cmBroadcastSwitchBlockDirectionAtom = atom(HorizontalDirection.Center);
