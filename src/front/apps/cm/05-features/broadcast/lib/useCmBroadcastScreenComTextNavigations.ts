import { currentBroadcastConfigiAtom } from '#features/broadcast/atoms';
import { HorizontalDirection } from '#shared/model/Direction';
import { cmBroadcastCurrentSlideiAtom, cmBroadcastSwitchBlockDirectionAtom } from '$cm/entities/broadcast';
import { useAtomValue } from 'atomaric';
import { useCmBroadcastMinimalConfigSlides } from './useCmBroadcastMinimalConfigLines';

export const useCmBroadcastScreenComTextNavigations = () => {
  const currentSlidei = useAtomValue(cmBroadcastCurrentSlideiAtom);
  const currentConfigi = useAtomValue(currentBroadcastConfigiAtom);
  const { minimalSlides } = useCmBroadcastMinimalConfigSlides(currentConfigi);

  const state = {
    text: minimalSlides[currentSlidei]?.lines.join('\n'),
    currentSlidei: currentSlidei,
    nextSlide: () => {
      if (currentSlidei < minimalSlides.length - 1) state.setSlidei(currentSlidei + 1);
    },
    prevSlide: () => {
      if (currentSlidei > 0) state.setSlidei(currentSlidei - 1);
    },
    setSlidei: (texti: number) => {
      cmBroadcastSwitchBlockDirectionAtom.set(
        cmBroadcastCurrentSlideiAtom.get() > texti ? HorizontalDirection.RightToLeft : HorizontalDirection.LeftToRight,
      );

      cmBroadcastCurrentSlideiAtom.set(texti);
      const nextd = window.document.getElementById(`broadcast-window-line-${texti}`);

      if (nextd) {
        const nextParent = nextd.parentElement;
        if (nextParent) nextParent.scrollLeft = nextd.offsetLeft + nextd.clientWidth / 2 - nextParent.clientWidth / 2;
      }
    },
  };

  return state;
};
