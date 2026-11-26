import { useMemo } from 'react';
import { CmAudioSlide, CmComAudioMarkPackTime, CmAudioSrc, Langi } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { makeCmComAudioMarkTitleEmptySelector } from 'shared/const/cm/order/makeCmComAudioMarkTitleBySelector';
import { TextCase } from 'shared/model/common';
import { checkIsArray, checkIsNil, checkIsString } from 'shared/utils/checkIs';
import { makeSymbolFreeUpperCaseSlavicText } from 'shared/utils/cm/com/const';
import { makeCmComOrderRepeatedText } from 'shared/utils/cm/order';
import { useCmComMarkTextValuesMaker } from './useCmComMarkTextValuesMaker';

export const useCmComAudioMarkSlides = (
  com: CmCom | und,
  src: CmAudioSrc | nil,
  textCase: TextCase | nil,
  nameSpaceiVariants?: number[],
) => {
  const {
    markTimes: wholeMarkTimes,
    timeSlideDict,
    srcMarks,
  } = useCmComMarkTextValuesMaker(com, src, textCase, nameSpaceiVariants);
  const langi = com?.langi ?? Langi.Ru;

  const { audioSlides, markTimes } = useMemo(() => {
    const audioSlides: CmAudioSlide[] = [];
    const markTimes: CmComAudioMarkPackTime[] = [];
    const markPairs: { audioSlide: CmAudioSlide; time: CmComAudioMarkPackTime }[] = [];

    if (!com) return { markTimes, audioSlides };

    for (let timei = wholeMarkTimes.length - 1; timei >= 0; timei--) {
      const time = wholeMarkTimes[timei];
      const selector = srcMarks?.[time];

      if (checkIsString(selector)) {
        if (selector === '-') continue;

        markPairs.push({
          time,
          audioSlide: {
            text: makeCmComAudioMarkTitleEmptySelector(selector, srcMarks, time, langi),
            time,
            timei,
            isChorded: !selector,
          },
        });

        continue;
      }

      if (checkIsNil(selector)) continue;
      if (!checkIsArray(selector)) continue;

      const slide = timeSlideDict[time];
      if (!slide) continue;

      markPairs.push({
        time,
        audioSlide: {
          slide,
          text: slide.lines.join('\n'),
          time,
          timei,
          isChorded: slide.ord.isChBlock(),
        },
      });
    }

    markPairs.sort((left, right) => left.time - right.time);

    for (let pairi = markPairs.length - 1; pairi >= 0; pairi--) {
      const { audioSlide, time } = markPairs[pairi];
      const prevSlide = audioSlides.at(0);

      if (prevSlide) prevSlide.minText ??= makeSymbolFreeUpperCaseSlavicText(prevSlide.text);
      audioSlide.minText ??= makeSymbolFreeUpperCaseSlavicText(audioSlide.text);

      if (prevSlide?.minText === audioSlide.minText) {
        audioSlide.rem = (prevSlide.rem ??= 1) + 1;
        (audioSlide.r = prevSlide.r ??= { r: 1 }).r++;
      }

      audioSlides.unshift(audioSlide);
      markTimes.unshift(time);
    }

    audioSlides.forEach(slide => {
      if (slide.r) slide.text = makeCmComOrderRepeatedText(slide.text, slide.r.r, slide.rem);
    });

    return { markTimes, audioSlides };
  }, [com, langi, srcMarks, timeSlideDict, wholeMarkTimes]);

  return { audioSlides, markTimes, timeSlideDict };
};
