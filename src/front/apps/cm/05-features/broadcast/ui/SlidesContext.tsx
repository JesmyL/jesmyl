import { CmBroadcastShowChordedSlideMode } from '#shared/model/cm/Cm.model';
import { HorizontalDirection } from '#shared/model/Direction';
import { cmBroadcastCurrentSlideiAtom, cmBroadcastSwitchBlockDirectionAtom } from '$cm/entities/broadcast';
import { useCmComCurrent } from '$cm/entities/com';
import { cmShowChordedSlideModeAtom } from '$cm/shared/state';
import { useCmBroadcastScreenConfig } from '$cm/widgets/broadcast';
import { useAtomValue } from 'atomaric';
import { useEffect, useMemo } from 'react';
import { CmBroadcastMonolineSlide } from 'shared/model/cm/broadcast';
import { cmTransformToReadableLines } from 'shared/utils/cm/transformToReadableText';
import { CmBroadcastSlidesContextState } from '../model/slides';
import { CmBroadcastInnerSlidesContext } from '../state/slides';

export const CmBroadcastSlidesContext = ({ children, configi }: { children: React.ReactNode; configi: number }) => {
  const config = useCmBroadcastScreenConfig(configi);
  const { slidei, slideId } = useAtomValue(cmBroadcastCurrentSlideiAtom);
  const com = useCmComCurrent();
  const showChordedSlideMode = useAtomValue(cmShowChordedSlideModeAtom);
  const slides = useMemo(() => com?.makeExpandSlides(true, false) ?? [], [com]);
  const isHiddenChordsMode =
    showChordedSlideMode === CmBroadcastShowChordedSlideMode.Hide ||
    showChordedSlideMode === CmBroadcastShowChordedSlideMode.Pass;

  let currentSlidei = slidei;

  if (slideId) {
    const checkIsHasCurrentSlideId = () => slides.at(currentSlidei)?.ids.has(slideId!);

    if (!checkIsHasCurrentSlideId()) {
      currentSlidei = slidei - 1;

      if (!checkIsHasCurrentSlideId()) {
        currentSlidei = slidei + 1;

        if (!checkIsHasCurrentSlideId()) {
          currentSlidei = slides.findIndex(checkIsHasCurrentSlideId);

          if (!checkIsHasCurrentSlideId()) currentSlidei = slidei;
        }
      }
    }
  }

  let nextSlidei = currentSlidei + 1;

  if (isHiddenChordsMode) {
    const currentSlide = slides.at(currentSlidei);
    if (currentSlide && currentSlide.ord.isChBlock()) currentSlidei = findSlideOrdRealTextIndex(slides, currentSlidei);

    nextSlidei = currentSlidei + 1;

    const nextSlide = slides.at(nextSlidei);
    if (nextSlide && nextSlide.ord.isChBlock()) nextSlidei = findSlideOrdRealTextIndex(slides, nextSlidei);
  }

  useEffect(() => {
    if (com?.wid == null) return;
    cmBroadcastCurrentSlideiAtom.reset();
  }, [com?.wid]);

  useEffect(() => {
    const nextd = window.document.getElementById(`broadcast-window-slidei-${currentSlidei}`);

    if (nextd) {
      const nextParent = nextd.parentElement;
      if (nextParent) nextParent.scrollLeft = nextd.offsetLeft + nextd.clientWidth / 2 - nextParent.clientWidth / 2;
    }
  }, [currentSlidei]);

  const state = useMemo(
    (): CmBroadcastSlidesContextState => ({
      slides,
      html: cmTransformToReadableLines(slides.at(currentSlidei)?.lines, config?.case).lines.join('\n'),
      nextHtml: cmTransformToReadableLines(slides.at(nextSlidei)?.lines, config?.case).lines.join('\n'),
      hash: slides.at(currentSlidei)?.textHash ?? '',
      slidei: currentSlidei,
      nextSlidei,
      slideId: slides.at(currentSlidei)?.id ?? slideId,
      toSlide: dir => state.setSlidei(currentSlidei + dir),
      setSlidei: (newSlidei: number) => {
        const isRtL = currentSlidei > newSlidei;

        if (isHiddenChordsMode && slides[newSlidei]?.ord.isChBlock()) {
          newSlidei = isRtL
            ? slides.slice(0, newSlidei).findLastIndex(checkIsSlideOrdRealText)
            : slides.slice(newSlidei).findIndex(checkIsSlideOrdRealText) + newSlidei;
        }

        if (newSlidei >= slides.length || newSlidei < 0) return;

        cmBroadcastSwitchBlockDirectionAtom.set(
          isRtL ? HorizontalDirection.RightToLeft : HorizontalDirection.LeftToRight,
        );

        cmBroadcastCurrentSlideiAtom.set({ slidei: newSlidei, slideId: slides.at(newSlidei)?.id ?? slideId });
      },
    }),
    [config?.case, currentSlidei, isHiddenChordsMode, nextSlidei, slideId, slides],
  );

  return <CmBroadcastInnerSlidesContext value={state}>{children}</CmBroadcastInnerSlidesContext>;
};

const checkIsSlideOrdRealText = (slide: CmBroadcastMonolineSlide) => !slide.ord.isChBlock();
const findSlideOrdRealTextIndex = (slides: CmBroadcastMonolineSlide[], slidei: number) =>
  slides.slice(slidei).findIndex(checkIsSlideOrdRealText) + slidei;
