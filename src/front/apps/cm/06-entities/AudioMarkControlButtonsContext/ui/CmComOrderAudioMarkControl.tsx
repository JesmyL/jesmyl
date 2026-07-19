import { Button } from '#shared/components/ui/button';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import {
  cmComAudioPlayerPlaySrcAtom,
  cmComAudioPlayerSwitchIsPlay,
  cmComAudioPlayerUpdateCurrentTime,
} from '$cm/entities/com-audio-player';
import { CmBroadcastSlidesContext, useCmBroadcastSlidesContext } from '$cm/ext';
import { cmIDB } from '$cm/shared/state';
import { Atom, useAtomValue } from 'atomaric';
import { useMemo } from 'react';
import { CmComAudioMarkPackTime, CmComAudioMarkSelector } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { makeCmComAudioMarkTitleBySelector } from 'shared/const/cm/order/makeCmComAudioMarkTitleBySelector';
import { CmBroadcastMonolineSlideSelectorId } from 'shared/model/cm/broadcast';
import { TextCase } from 'shared/model/common';
import { extractNumber } from 'shared/utils';
import { checkIsArray, checkIsNil, checkIsString } from 'shared/utils/checkIs';
import { convertCmBroadcastMonolineSlideOrdLineId } from 'shared/utils/cm/com/makeCmBroadcastMonolineSlideOrdId';
import { forEachObjectEntries } from 'shared/utils/object.utils';
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
  const isActualSrc = !!src && com.audio.includes(src);
  const audioTrackMarks = cmIDB.useAudioTrackMarks(com.wid);
  const actualMapNodeRef = useActualRef(mapNode);
  const comMarks = src ? audioTrackMarks?.marks?.[src] : null;
  const slides = useCmBroadcastSlidesContext();

  const controls = useMemo(() => {
    const idDict: CmAudioMarkControlButtonsContextIdDict = {};
    const afterIdDict: CmAudioMarkControlButtonsContextAfterIdDict = {};

    const result = { idDict, afterIdDict };

    if (!isNeedCompute || !isActualSrc || checkIsNil(comMarks)) return result;

    let lastSelectorOrBefore: 'before' | CmBroadcastMonolineSlideSelectorId = 'before';
    const takeMinusTime = () => (preTimeAtom.get() < 0 ? 0 : preTimeAtom.get());

    forEachObjectEntries(comMarks, (time, selector) => {
      const titleProps = makeCmComAudioMarkTitleBySelector(
        extractNumber(time),
        com,
        selector,
        comMarks,
        (repeats, title) => (
          <span className="text-x7">
            {repeats} {title}
          </span>
        ),
        title => (title.startsWith('+') ? title.slice(1) : title),
      );

      if (checkIsNil(selector) || (isHideShortTime && titleProps.isShortTime)) return;
      const className = titleProps.isShortTime ? 'text-xKO' : undefined;

      if (checkIsString(selector)) {
        if (selector === '-') return;

        const value = actualMapNodeRef.current(
          <Button
            key={time}
            icon="PlayCircle"
            com-audio-mark-time-selector={time}
            className={className}
            onClick={event => {
              event.stopPropagation();
              cmComAudioPlayerUpdateCurrentTime(+time - takeMinusTime());
              cmComAudioPlayerSwitchIsPlay(true);
            }}
          >
            <span className={className ?? 'text-x3'}>{titleProps.title}</span>
          </Button>,
          extractNumber(time),
          selector,
        );

        if (checkIsArray(lastSelectorOrBefore)) {
          (afterIdDict[convertCmBroadcastMonolineSlideOrdLineId(lastSelectorOrBefore)] ??= []).push(value);
          (afterIdDict[lastSelectorOrBefore[0]] ??= []).push(value);
        } else {
          (afterIdDict[lastSelectorOrBefore] ??= []).push(value);
        }

        return;
      }

      lastSelectorOrBefore = selector;

      const value = actualMapNodeRef.current(
        <Button
          key={time}
          icon="PlayCircle"
          com-audio-mark-time-selector={time}
          className={className}
          onClick={event => {
            event.stopPropagation();
            cmComAudioPlayerUpdateCurrentTime(+time - takeMinusTime());
            cmComAudioPlayerSwitchIsPlay(true);
          }}
        />,
        extractNumber(time),
        selector,
      );

      (idDict[selector[0]] ??= []).push(value);
      (idDict[convertCmBroadcastMonolineSlideOrdLineId(selector)] ??= []).push(value);
    });

    if (checkIsArray(comMarks[0 as CmComAudioMarkPackTime])) delete afterIdDict.before;

    return result;
  }, [isNeedCompute, isActualSrc, comMarks, preTimeAtom, com, isHideShortTime, actualMapNodeRef]);

  return (
    <CmAudioMarkControlButtonsContextInner value={useMemo(() => ({ controls, slides }), [controls, slides])}>
      {children}
    </CmAudioMarkControlButtonsContextInner>
  );
};
