import { cmBroadcastCurrentNameSpaceiAtom } from '$cm/entities/broadcast';
import { useCmComCurrent } from '$cm/entities/com';
import { useAtomValue } from 'atomaric';
import { useMemo } from 'react';
import { CmComAudioMarkPackTime, HttpNumLeadLink } from 'shared/api';
import { CmBroadcastMonolineSlide, CmBroadcastMonolineSlideOrdStrId } from 'shared/model/cm/broadcast';
import { TextCase } from 'shared/model/common';
import { extractNumber } from 'shared/utils';
import { checkIsArray, checkIsNil, checkIsNotNil } from 'shared/utils/checkIs';
import { convertCmBroadcastMonolineSlideOrdLineId } from 'shared/utils/cm/com/makeCmBroadcastMonolineSlideOrdId';
import { forEachObjectEntries, objectKeys, objectLength } from 'shared/utils/object.utils';
import { cmIDB } from '../state';

export const useCmComMarkTextValuesMaker = (src: HttpNumLeadLink | nil, textCase: TextCase | nil) => {
  const com = useCmComCurrent();
  const marks = cmIDB.useAudioTrackMarks(com?.wid);
  const srcMarks = com && checkIsNotNil(src) ? marks?.marks?.[src] : null;
  const markTimes = useMemo(() => objectKeys(srcMarks).map(extractNumber), [srcMarks]);
  const nameSpacei = useAtomValue(cmBroadcastCurrentNameSpaceiAtom);
  const slides = useMemo(
    () => com?.makeExpandSlides([nameSpacei, 0], true, textCase) ?? [],
    [com, nameSpacei, textCase],
  );

  const { timeSlideDict, slideIdTimeSetDict } = useMemo(() => {
    const timeSlideDict: SPRecord<CmComAudioMarkPackTime, CmBroadcastMonolineSlide> = {};
    const slideIdTimeSetDict: SPRecord<CmBroadcastMonolineSlideOrdStrId, Set<CmComAudioMarkPackTime>> = {};

    const result = { timeSlideDict, slideIdTimeSetDict };

    if (checkIsNil(srcMarks) || !objectLength(slides)) return result;

    const idSlideDict: Record<CmBroadcastMonolineSlideOrdStrId, CmBroadcastMonolineSlide> = {};

    slides.forEach(slide => (idSlideDict[slide.id] = slide));

    forEachObjectEntries(srcMarks, (time, selector) => {
      if (!checkIsArray(selector)) return;

      const id = convertCmBroadcastMonolineSlideOrdLineId(selector);
      if (idSlideDict[id]) {
        timeSlideDict[time] = idSlideDict[id];

        (slideIdTimeSetDict[id] ??= new Set()).add(extractNumber(time));
      }
    });

    return result;
  }, [slides, srcMarks]);

  return {
    slides,
    markTimes,
    timeSlideDict,
    slideIdTimeSetDict,
    srcMarks,
  };
};
