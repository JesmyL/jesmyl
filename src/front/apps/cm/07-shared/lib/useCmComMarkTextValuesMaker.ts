import { useMemo } from 'react';
import { CmComAudioMarkPackTime, HttpNumLeadLink } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { CmBroadcastMonolineSlide, CmBroadcastMonolineSlideOrdStrId } from 'shared/model/cm/broadcast';
import { TextCase } from 'shared/model/common';
import { extractNumber } from 'shared/utils';
import { checkIsArray, checkIsNil, checkIsNotNil } from 'shared/utils/checkIs';
import { convertCmBroadcastMonolineSlideOrdLineId } from 'shared/utils/cm/com/makeCmBroadcastMonolineSlideOrdId';
import { forEachObjectEntries, objectKeys } from 'shared/utils/object.utils';
import { cmIDB } from '../state';

export const useCmComMarkTextValuesMaker = (com: CmCom | und, src: HttpNumLeadLink | nil) => {
  const marks = cmIDB.useAudioTrackMarks(com?.wid);
  const trackMarks = com && checkIsNotNil(src) ? marks?.marks?.[src] : null;
  const markTimes = useMemo(() => objectKeys(trackMarks).map(extractNumber), [trackMarks]);
  const slides = useMemo(() => com?.makeExpandSlides(true, true, TextCase.AsIs) ?? [], [com]);

  const { timeSlideDict, slideIdTimeSetDict } = useMemo(() => {
    const timeSlideDict: SPRecord<CmComAudioMarkPackTime, CmBroadcastMonolineSlide> = {};
    const slideIdTimeSetDict: SPRecord<CmBroadcastMonolineSlideOrdStrId, Set<CmComAudioMarkPackTime>> = {};

    const result = { timeSlideDict, slideIdTimeSetDict };

    if (checkIsNil(trackMarks) || !slides.length) return result;

    const idSlideDict: Record<CmBroadcastMonolineSlideOrdStrId, CmBroadcastMonolineSlide> = {};

    slides.forEach(slide => (idSlideDict[slide.id] = slide));

    forEachObjectEntries(trackMarks, (time, selector) => {
      if (!checkIsArray(selector)) return;

      const id = convertCmBroadcastMonolineSlideOrdLineId(selector);
      timeSlideDict[time] = idSlideDict[id];

      (slideIdTimeSetDict[id] ??= new Set()).add(extractNumber(time));
    });

    return result;
  }, [slides, trackMarks]);

  return {
    slides,
    markTimes,
    timeSlideDict,
    slideIdTimeSetDict,
    takeSlide: (timei: number) => timeSlideDict[markTimes[timei]],
  };
};
