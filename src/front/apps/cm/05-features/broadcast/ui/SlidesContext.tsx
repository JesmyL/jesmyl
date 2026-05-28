import { HorizontalDirection } from '#shared/model/Direction';
import { cmBroadcastCurrentSlideiAtom, cmBroadcastSwitchBlockDirectionAtom } from '$cm/entities/broadcast';
import { useCmComCurrent } from '$cm/entities/com';
import { CmCom } from '$cm/ext';
import { CmBroadcastShowChordedSlideMode } from '$cm/shared/model';
import { cmShowChordedSlideModeAtom } from '$cm/shared/state';
import { useCmBroadcastScreenConfig } from '$cm/widgets/broadcast';
import { useAtomValue } from 'atomaric';
import { useEffect, useMemo } from 'react';
import { CmBroadcastSlidesContextState } from '../model/slides';
import { CmBroadcastInnerSlidesContext } from '../state/slides';

export const CmBroadcastSlidesContext = ({ children, configi }: { children: React.ReactNode; configi: number }) => {
  const config = useCmBroadcastScreenConfig(configi);
  const currentSlidei = useAtomValue(cmBroadcastCurrentSlideiAtom);
  const com = useCmComCurrent();
  const showChordedSlideMode = useAtomValue(cmShowChordedSlideModeAtom);
  const slides = useMemo(() => com?.makeExpandSlides(true) ?? [], [com]);

  let nextSlidei = currentSlidei + 1;

  if (
    (showChordedSlideMode === CmBroadcastShowChordedSlideMode.Hide ||
      showChordedSlideMode === CmBroadcastShowChordedSlideMode.Pass) &&
    slides[nextSlidei] != null &&
    !slides[nextSlidei]?.ord.isRealText()
  ) {
    nextSlidei = slides.findIndex((slide, slidei) => slidei > nextSlidei && slide?.ord.isRealText());
  }

  useEffect(() => {
    if (com?.wid == null) return;
    cmBroadcastCurrentSlideiAtom.reset();
  }, [com?.wid]);

  useEffect(() => {
    const nextd = window.document.getElementById(`broadcast-window-line-${currentSlidei}`);

    if (nextd) {
      const nextParent = nextd.parentElement;
      if (nextParent) nextParent.scrollLeft = nextd.offsetLeft + nextd.clientWidth / 2 - nextParent.clientWidth / 2;
    }
  }, [currentSlidei]);

  const state = useMemo(
    (): CmBroadcastSlidesContextState => ({
      slides,
      html: CmCom.prepareEachTextLine(slides[currentSlidei]?.lines, config?.case).join('\n'),
      nextHtml: CmCom.prepareEachTextLine(slides[nextSlidei]?.lines, config?.case).join('\n'),
      currentSlidei,
      nextSlidei,
      toNextSlide: () => state.setSlidei(currentSlidei + 1),
      toPrevSlide: () => state.setSlidei(currentSlidei - 1),
      setSlidei: (nextSlidei: number) => {
        const isRtL = currentSlidei > nextSlidei;

        if (
          (showChordedSlideMode === CmBroadcastShowChordedSlideMode.Pass ||
            showChordedSlideMode === CmBroadcastShowChordedSlideMode.Hide) &&
          !slides[nextSlidei]?.ord.isRealText()
        ) {
          nextSlidei = isRtL
            ? slides.findLastIndex((slide, slidei) => slidei < nextSlidei && slide?.ord.isRealText())
            : slides.findIndex((slide, ordi) => ordi > nextSlidei && slide?.ord.isRealText());
        }

        if (nextSlidei >= slides.length || nextSlidei < 0) return;

        cmBroadcastSwitchBlockDirectionAtom.set(
          isRtL ? HorizontalDirection.RightToLeft : HorizontalDirection.LeftToRight,
        );

        cmBroadcastCurrentSlideiAtom.set(nextSlidei);
      },
    }),
    [config?.case, currentSlidei, nextSlidei, showChordedSlideMode, slides],
  );

  return <CmBroadcastInnerSlidesContext value={state}>{children}</CmBroadcastInnerSlidesContext>;
};
