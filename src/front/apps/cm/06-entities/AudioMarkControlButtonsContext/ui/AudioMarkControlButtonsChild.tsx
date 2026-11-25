import { cmComAudioPlayerPlaySrcAtom } from '$cm/entities/com-audio-player';
import { useCmComMarkTextValuesMaker } from '$cm/ext';
import { cmIDB } from '$cm/shared/state';
import { useAtomValue } from 'atomaric';
import { useMemo } from 'react';
import { CmAudioTail, CmComAudioMarkPack, parseCmAudioTail } from 'shared/api';
import { TextCase } from 'shared/model/common';
import { CmAudioMarkControlButtonsContextProps } from '../model/common';
import { CmAudioMarkControlButtonsContextInner } from '../state/context';
import { makeCmAudioMarkControlButtonsContextControls } from '../lib/makeCmAudioMarkControlButtonsContextControls';

const emptyMarks: NonNullable<CmComAudioMarkPack[CmAudioTail]> = {};

export const CmAudioMarkControlButtonsContextChild = ({
  com,
  isHideShortTime,
  isNeedCompute,
  mapNode,
  preTimeAtom,
  pendingMarks,
  children,
}: CmAudioMarkControlButtonsContextProps) => {
  const src = useAtomValue(cmComAudioPlayerPlaySrcAtom);
  const isActualSrc = !!src && com.audio?.some(audioSrc => audioSrc === src);
  const audioTrackMarks = cmIDB.useAudioTrackMarks(com.wid);
  const marksSrc = parseCmAudioTail(src);
  const marks = marksSrc ? audioTrackMarks?.marks?.[marksSrc] : null;
  const comMarks = marks ?? emptyMarks;
  const slides = useCmComMarkTextValuesMaker(com, marksSrc, TextCase.AsIs);
  const slideIds = useMemo(() => new Set(slides.slides?.map(slide => slide.id) ?? []), [slides.slides]);

  const controls = useMemo(() => {
    if (!isNeedCompute || !isActualSrc) return { idDict: {}, afterIdDict: {} };

    return makeCmAudioMarkControlButtonsContextControls({
      com,
      comMarks,
      pendingMarks,
      timeSlideDict: slides.timeSlideDict,
      slideIds,
      preTimeAtom,
      isHideShortTime,
      mapNode,
    });
  }, [
    isNeedCompute,
    isActualSrc,
    comMarks,
    pendingMarks,
    preTimeAtom,
    com,
    isHideShortTime,
    slides.timeSlideDict,
    slideIds,
    mapNode,
  ]);

  return (
    <CmAudioMarkControlButtonsContextInner value={useMemo(() => ({ controls, slides }), [controls, slides])}>
      {children}
    </CmAudioMarkControlButtonsContextInner>
  );
};
