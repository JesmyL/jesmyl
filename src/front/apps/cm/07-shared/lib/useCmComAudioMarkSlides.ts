import { useMemo } from 'react';
import { CmAudioSlide, HttpNumLeadLink, Langi } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { makeCmComAudioMarkTitleEmptySelectorLazy } from 'shared/const/cm/order/makeCmComAudioMarkTitleBySelector';
import { TextCase } from 'shared/model/common';
import { checkIsString } from 'shared/utils/checkIs';
import { makeSymbolFreeUpperCaseSlavicText } from 'shared/utils/cm/com/const';
import { makeCmComOrderRepeatedText } from 'shared/utils/cm/order';
import { useCmComMarkTextValuesMaker } from './useCmComMarkTextValuesMaker';

export const useCmComAudioMarkSlides = (com: CmCom | und, src: HttpNumLeadLink | nil, textCase: TextCase | nil) => {
  const { markTimes, timeSlideDict, srcMarks } = useCmComMarkTextValuesMaker(com, src, textCase);
  const langi = com?.langi ?? Langi.Ru;

  const audioSlides = useMemo(() => {
    const audioSlides: CmAudioSlide[] = [];

    for (let timei = markTimes.length - 1; timei >= 0; timei--) {
      const time = markTimes[timei];

      let audioSlide: CmAudioSlide = { text: '', time, timei, isChorded: true };

      const slide = timeSlideDict[time];

      if (slide) audioSlide = { slide, text: slide.lines.join('\n'), time, timei, isChorded: slide.ord.isChBlock() };

      if (checkIsString(srcMarks?.[time]))
        audioSlide = {
          text: makeCmComAudioMarkTitleEmptySelectorLazy()(srcMarks[time], srcMarks, time, langi),
          time,
          timei,
          isChorded: !srcMarks[time],
        };

      if (audioSlide) {
        const prevSlide = audioSlides.at(0);

        if (prevSlide) prevSlide.minText ??= makeSymbolFreeUpperCaseSlavicText(prevSlide.text);
        audioSlide.minText ??= makeSymbolFreeUpperCaseSlavicText(audioSlide.text);

        if (prevSlide?.minText === audioSlide.minText) {
          audioSlide.rem = (prevSlide.rem ??= 1) + 1;
          (audioSlide.r = prevSlide.r ??= { r: 1 }).r++;
        }

        audioSlides.unshift(audioSlide);
      }
    }

    audioSlides.forEach(slide => {
      if (slide.r) slide.text = makeCmComOrderRepeatedText(slide.text, slide.r.r, slide.rem);
    });

    return audioSlides;
  }, [langi, markTimes, srcMarks, timeSlideDict]);

  return { audioSlides, markTimes, timeSlideDict };
};
