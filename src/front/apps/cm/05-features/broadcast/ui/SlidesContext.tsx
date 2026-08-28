import { CmBroadcastShowChordedSlideMode } from '#shared/model/cm/Cm.model';
import { HorizontalDirection } from '#shared/model/Direction';
import {
  cmBroadcastCurrentNameSpaceiAtom,
  cmBroadcastCurrentSlideiAtom,
  cmBroadcastSwitchBlockDirectionAtom,
} from '$cm/entities/broadcast';
import { cmShowChordedSlideModeAtom } from '$cm/shared/state';
import { useAtomValue } from 'atomaric';
import { useEffect, useMemo } from 'react';
import { CmCom } from 'shared/const/cm/Com';
import { CmBroadcastMonolineSlide } from 'shared/model/cm/broadcast';
import { TextCase } from 'shared/model/common';
import { makeCmComNbspHtmlText } from 'shared/utils/cm/com/const';
import { CmBroadcastSlidesContextState } from '../model/slides';
import { CmBroadcastInnerSlidesContext } from '../state/slides';

export const CmBroadcastSlidesContext = ({
  children,
  textCase,
  com: propsCom,
}: {
  children: React.ReactNode;
  textCase: TextCase | nil;
  com: CmCom;
}) => {
  const nameSpacei = useAtomValue(cmBroadcastCurrentNameSpaceiAtom);
  const com = useMemo(() => {
    if (nameSpacei) {
      //
    }
    return new CmCom(propsCom.top, propsCom.fix, propsCom.intp);
  }, [propsCom.fix, propsCom.intp, propsCom.top, nameSpacei]);

  const { slidei, slideId } = useAtomValue(cmBroadcastCurrentSlideiAtom);
  const showChordedSlideMode = useAtomValue(cmShowChordedSlideModeAtom);
  const slides = useMemo(
    () => com?.makeExpandSlides([nameSpacei, 0], false, textCase) ?? [],
    [com, textCase, nameSpacei],
  );
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

      html: makeCmComNbspHtmlText(slides.at(currentSlidei)?.text),
      nextHtml: makeCmComNbspHtmlText(slides.at(nextSlidei)?.text),

      hash: slides.at(currentSlidei)?.minText ?? '',
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
    [currentSlidei, isHiddenChordsMode, nextSlidei, slideId, slides],
  );

  return (
    <CmBroadcastInnerSlidesContext
      key={nameSpacei}
      value={state}
    >
      {children}
    </CmBroadcastInnerSlidesContext>
  );
};

const checkIsSlideOrdRealText = (slide: CmBroadcastMonolineSlide) => !slide.ord.isChBlock();
const findSlideOrdRealTextIndex = (slides: CmBroadcastMonolineSlide[], slidei: number) =>
  slides.slice(slidei).findIndex(checkIsSlideOrdRealText) + slidei;
