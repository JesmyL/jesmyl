import { currentBroadcastConfigiAtom } from '#features/broadcast/atoms';
import { HorizontalDirection } from '#shared/model/Direction';
import { cmBroadcastCurrentSlideiAtom, cmBroadcastSwitchBlockDirectionAtom } from '$cm/entities/broadcast';
import { CmBroadcastShowChordedSlideMode } from '$cm/shared/model';
import { cmShowChordedSlideModeAtom } from '$cm/shared/state';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { useCmBroadcastMinimalConfigSlides } from './useCmBroadcastMinimalConfigLines';

export const useCmBroadcastScreenComTextNavigations = () => {
  const currentSlidei = useAtomValue(cmBroadcastCurrentSlideiAtom);
  const currentConfigi = useAtomValue(currentBroadcastConfigiAtom);
  const { minimalSlides, com } = useCmBroadcastMinimalConfigSlides(currentConfigi);
  const showChordedSlideMode = useAtomValue(cmShowChordedSlideModeAtom);

  useEffect(() => {
    if (com?.wid == null) return;
    cmBroadcastCurrentSlideiAtom.reset();
  }, [com?.wid]);

  useEffect(() => {
    if (
      (showChordedSlideMode !== CmBroadcastShowChordedSlideMode.Pass &&
        showChordedSlideMode !== CmBroadcastShowChordedSlideMode.Hide) ||
      minimalSlides[currentSlidei] == null ||
      minimalSlides[currentSlidei].ord.isRealText()
    )
      return;

    const textedSlidei = minimalSlides.findIndex((slide, slidei) => slidei > currentSlidei && slide.ord.isRealText());
    if (minimalSlides[textedSlidei] == null || !minimalSlides[textedSlidei].ord.isRealText()) return;

    cmBroadcastCurrentSlideiAtom.set(textedSlidei);
  }, [currentSlidei, minimalSlides, showChordedSlideMode]);

  useEffect(() => {
    const nextd = window.document.getElementById(`broadcast-window-line-${currentSlidei}`);

    if (nextd) {
      const nextParent = nextd.parentElement;
      if (nextParent) nextParent.scrollLeft = nextd.offsetLeft + nextd.clientWidth / 2 - nextParent.clientWidth / 2;
    }
  }, [currentSlidei]);

  const state = {
    text: minimalSlides[currentSlidei]?.lines.join('\n'),
    currentSlidei: currentSlidei,
    nextSlide: () => state.setSlidei(currentSlidei + 1),
    prevSlide: () => state.setSlidei(currentSlidei - 1),
    setSlidei: (nextSlidei: number) => {
      const isRtL = currentSlidei > nextSlidei;

      if (
        (showChordedSlideMode === CmBroadcastShowChordedSlideMode.Pass ||
          showChordedSlideMode === CmBroadcastShowChordedSlideMode.Hide) &&
        !minimalSlides[nextSlidei].ord.isRealText()
      ) {
        nextSlidei = isRtL
          ? minimalSlides.findLastIndex((slide, slidei) => slidei < nextSlidei && slide.ord.isRealText())
          : minimalSlides.findIndex((slide, ordi) => ordi > nextSlidei && slide.ord.isRealText());
      }

      if (nextSlidei >= minimalSlides.length || nextSlidei < 0) return;

      cmBroadcastSwitchBlockDirectionAtom.set(
        isRtL ? HorizontalDirection.RightToLeft : HorizontalDirection.LeftToRight,
      );

      cmBroadcastCurrentSlideiAtom.set(nextSlidei);
    },
  };

  return state;
};
