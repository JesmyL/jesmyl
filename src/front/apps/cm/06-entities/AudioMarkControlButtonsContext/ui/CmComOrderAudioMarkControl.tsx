import { Button } from '#shared/components/ui/button';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import {
  cmComAudioPlayerPlaySrcAtom,
  cmComAudioPlayerSwitchIsPlay,
  cmComAudioPlayerUpdateCurrentTime,
} from '$cm/entities/com-audio-player';
import { CmBroadcastSlidesContext, useCmComMarkTextValuesMaker } from '$cm/ext';
import { cmIDB } from '$cm/shared/state';
import { Atom, useAtomValue } from 'atomaric';
import { useMemo } from 'react';
import { CmComAudioMarkPackTime, CmComAudioMarkPackTimeZero, CmComAudioMarkSelector } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { makeCmComAudioMarkTitleBySelector } from 'shared/const/cm/order/makeCmComAudioMarkTitleBySelector';
import { CmBroadcastMonolineSlideSelectorId } from 'shared/model/cm/broadcast';
import { TextCase } from 'shared/model/common';
import { convertSecondsInStrTime, extractNumber } from 'shared/utils';
import { checkIsArray, checkIsNil, checkIsNotNil, checkIsString } from 'shared/utils/checkIs';
import { convertCmBroadcastMonolineSlideOrdLineId } from 'shared/utils/cm/com/makeCmBroadcastMonolineSlideOrdId';
import { forEachObjectEntries } from 'shared/utils/object.utils';
import styled from 'styled-components';
import { twMerge } from 'tailwind-merge';
import { CmAudioMarkControlButtonsContextAfterIdDict, CmAudioMarkControlButtonsContextIdDict } from '../model/common';
import { CmAudioMarkControlButtonsContextInner } from '../state/context';

type Props = {
  preTimeAtom: Atom<number>;
  isNeedCompute?: boolean;
  com: CmCom;
  isHideShortTime?: boolean;
  mapNode: (node: React.ReactNode, time: CmComAudioMarkPackTime, selector: CmComAudioMarkSelector) => React.ReactNode;
  children: React.ReactNode;
};

export const CmAudioMarkControlButtonsContext = (props: Props) => {
  return (
    <CmBroadcastSlidesContext
      textCase={TextCase.AsIs}
      com={props.com}
    >
      <Child {...props} />
    </CmBroadcastSlidesContext>
  );
};

const Child = ({ com, isHideShortTime, isNeedCompute, mapNode, preTimeAtom, children }: Props) => {
  const src = useAtomValue(cmComAudioPlayerPlaySrcAtom);
  const isActualSrc = !!src && com.audio?.includes(src);
  const audioTrackMarks = cmIDB.useAudioTrackMarks(com.wid);
  const actualMapNodeRef = useActualRef(mapNode);
  const comMarks = src ? audioTrackMarks?.marks?.[src] : null;
  const slides = useCmComMarkTextValuesMaker(com, src, TextCase.AsIs);

  const controls = useMemo(() => {
    const idDict: CmAudioMarkControlButtonsContextIdDict = {};
    const afterIdDict: CmAudioMarkControlButtonsContextAfterIdDict = {};

    const result = { idDict, afterIdDict };

    if (!isNeedCompute || !isActualSrc || checkIsNil(comMarks)) return result;

    let prevSelectorOrBefore: 'before' | CmBroadcastMonolineSlideSelectorId = 'before';
    const takeMinusTime = () => (preTimeAtom.get() < 0 ? 0 : preTimeAtom.get());

    forEachObjectEntries(comMarks, (time, selector, timei) => {
      const dataMeta = `${timei + 1} ${convertSecondsInStrTime(+time)}`;
      const titleProps = makeCmComAudioMarkTitleBySelector(extractNumber(time), com, selector, comMarks);

      if (checkIsNil(selector) || (isHideShortTime && titleProps.isShortTime)) return;
      const className = titleProps.isShortTime ? 'text-xKO' : undefined;

      const make = (node: React.ReactNode) => {
        return actualMapNodeRef.current(
          <ButtonWithMeta
            key={time}
            icon="PlayCircle"
            com-audio-mark-time-selector={time}
            data-meta={dataMeta}
            className={twMerge('relative mx-[.2em] max-w-[80vw]', className)}
            onClick={event => {
              event.stopPropagation();
              cmComAudioPlayerUpdateCurrentTime(+time - takeMinusTime());
              cmComAudioPlayerSwitchIsPlay(true);
            }}
          >
            {node && <span className="ellipsis w-full">{node}</span>}
          </ButtonWithMeta>,
          extractNumber(time),
          selector,
        );
      };

      if (checkIsString(selector)) {
        if (selector === '-') return;

        const value = make(<span className={className ?? 'text-x3'}>{titleProps.title}</span>);

        if (checkIsArray(prevSelectorOrBefore)) {
          (afterIdDict[convertCmBroadcastMonolineSlideOrdLineId(prevSelectorOrBefore)] ??= []).push(value);
          (afterIdDict[prevSelectorOrBefore[0]] ??= []).push(value);
        } else {
          (afterIdDict[prevSelectorOrBefore] ??= []).push(value);
        }

        return;
      }

      const value = make(null);

      (idDict[selector[0]] ??= []).push(value);
      const slideId = convertCmBroadcastMonolineSlideOrdLineId(selector);

      if (checkIsNotNil(slides.timeSlideDict[time])) (idDict[slideId] ??= []).push(value);
      else if (checkIsArray(prevSelectorOrBefore)) {
        const prevSlideId = convertCmBroadcastMonolineSlideOrdLineId(prevSelectorOrBefore);
        (afterIdDict[prevSlideId] ??= []).push(make(<span className="text-xKO">?????</span>));
      }

      prevSelectorOrBefore = selector;
    });

    if (checkIsArray(comMarks[CmComAudioMarkPackTimeZero])) delete afterIdDict.before;

    return result;
  }, [isNeedCompute, isActualSrc, comMarks, preTimeAtom, com, isHideShortTime, slides.timeSlideDict, actualMapNodeRef]);

  return (
    <CmAudioMarkControlButtonsContextInner value={useMemo(() => ({ controls, slides }), [controls, slides])}>
      {children}
    </CmAudioMarkControlButtonsContextInner>
  );
};

const ButtonWithMeta = styled(Button)<{ 'data-meta': string }>`
  &:before {
    content: attr(data-meta);
    position: absolute;
    left: 0;
    top: -1em;
    font-size: 0.6em;
  }
`;
