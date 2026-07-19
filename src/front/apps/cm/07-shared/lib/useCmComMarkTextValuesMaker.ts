import { useCmBroadcastSlidesContext } from '$cm/ext';
import { useMemo } from 'react';
import { CmComAudioMarkPackTime, HttpNumLeadLink } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { CmBroadcastMonolineSlide, CmBroadcastMonolineSlideOrdStrId } from 'shared/model/cm/broadcast';
import { extractNumber } from 'shared/utils';
import { checkIsArray, checkIsNil, checkIsNotNil } from 'shared/utils/checkIs';
import { convertCmBroadcastMonolineSlideOrdLineId } from 'shared/utils/cm/com/makeCmBroadcastMonolineSlideOrdId';
import { forEachObjectEntries, objectKeys } from 'shared/utils/object.utils';
import { cmIDB } from '../state';

/** @deprecated  make contexted */
export const useCmComMarkTextValuesMaker = (com: CmCom | und, src: HttpNumLeadLink | nil) => {
  const marks = cmIDB.useAudioTrackMarks(com?.wid);
  const trackMarks = com && checkIsNotNil(src) ? marks?.marks?.[src] : null;
  const markTimes: CmComAudioMarkPackTime[] = useMemo(() => objectKeys(trackMarks).map(extractNumber), [trackMarks]);
  const slides = useCmBroadcastSlidesContext();

  const { timeSlideDict, slideIdTimeDict } = useMemo(() => {
    const timeSlideDict: SPRecord<CmComAudioMarkPackTime, CmBroadcastMonolineSlide> = {};
    const slideIdTimeDict: SPRecord<CmBroadcastMonolineSlideOrdStrId, CmComAudioMarkPackTime> = {};

    const result = { timeSlideDict, slideIdTimeDict };

    if (checkIsNil(trackMarks) || !slides?.slides.length) return result;

    const idSlideDict: Record<CmBroadcastMonolineSlideOrdStrId, CmBroadcastMonolineSlide> = {};

    slides.slides.forEach(slide => {
      idSlideDict[slide.id] = slide;
    });

    forEachObjectEntries(trackMarks, (time, selector) => {
      if (!checkIsArray(selector)) return;

      const id = convertCmBroadcastMonolineSlideOrdLineId(selector);
      timeSlideDict[time] = idSlideDict[id];

      slideIdTimeDict[id] = extractNumber(time);
    });

    return result;
  }, [slides?.slides, trackMarks]);

  return {
    markTimes,
    timeSlideDict,
    slideIdTimeDict,
    takeSlide: (timei: number) => timeSlideDict[markTimes[timei]],
  };
};
