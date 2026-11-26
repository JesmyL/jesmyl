import {
  cmComAudioPlayerIsFromPlayerPageAtom,
  cmComAudioPlayerSwitchIsPlay,
  cmComAudioPlayerUpdateCurrentTime,
} from '$cm/entities/com-audio-player';
import { Atom } from 'atomaric';
import {
  CmAudioTail,
  CmComAudioMarkPack,
  CmComAudioMarkPackTime,
  CmComAudioMarkPackTimeZero,
  CmComAudioMarkSelector,
} from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { makeCmComAudioMarkTitleBySelector } from 'shared/const/cm/order/makeCmComAudioMarkTitleBySelector';
import {
  CmBroadcastMonolineSlide,
  CmBroadcastMonolineSlideOrdStrId,
  CmBroadcastMonolineSlideSelectorId,
} from 'shared/model/cm/broadcast';
import { convertSecondsInStrTime, extractNumber, itNumSort } from 'shared/utils';
import { checkIsArray, checkIsNil, checkIsNotNil, checkIsString } from 'shared/utils/checkIs';
import { convertCmBroadcastMonolineSlideOrdLineId } from 'shared/utils/cm/com/makeCmBroadcastMonolineSlideOrdId';
import { objectKeys, objectLength } from 'shared/utils/object.utils';
import { twMerge } from 'tailwind-merge';
import { StyledCmAudioMarkControlButtonsContextButtonMeta } from '../const';
import {
  CmAudioMarkControlButtonsContextAfterIdDict,
  CmAudioMarkControlButtonsContextIdDict,
  CmAudioMarkControlButtonsContextMapNode,
} from '../model/common';

type Props = {
  com: CmCom;
  comMarks: NonNullable<CmComAudioMarkPack[CmAudioTail]>;
  pendingMarks?: PRecord<CmComAudioMarkPackTime, CmComAudioMarkSelector | nil> | nil;
  timeSlideDict: SPRecord<CmComAudioMarkPackTime, CmBroadcastMonolineSlide>;
  slideIds: Set<CmBroadcastMonolineSlideOrdStrId>;
  preTimeAtom: Atom<number>;
  isHideShortTime?: boolean;
  mapNode: CmAudioMarkControlButtonsContextMapNode;
};

export const makeCmAudioMarkControlButtonsContextControls = ({
  com,
  comMarks,
  pendingMarks,
  timeSlideDict,
  slideIds,
  ...props
}: Props) => {
  const idDict: CmAudioMarkControlButtonsContextIdDict = {};
  const afterIdDict: CmAudioMarkControlButtonsContextAfterIdDict = {};

  const result = { idDict, afterIdDict };

  if (!objectLength(comMarks) && !objectLength(pendingMarks)) return result;

  let prevSelectorOrBefore: 'before' | CmBroadcastMonolineSlideSelectorId = 'before';
  const takeMinusTime = () => (props.preTimeAtom.get() < 0 ? 0 : props.preTimeAtom.get());

  const times = Array.from(
    new Set([...objectKeys(comMarks).map(extractNumber), ...objectKeys(pendingMarks).map(extractNumber)]),
  ).sort(itNumSort);

  times.forEach((time, timei) => {
    const isConfirmed = Object.hasOwn(comMarks, time);
    const selector = isConfirmed ? comMarks[time] : pendingMarks?.[time];
    const isPending = !isConfirmed && checkIsNotNil(selector);
    const dataMeta = `${timei + 1} ${convertSecondsInStrTime(+time)}`;
    const titleProps = makeCmComAudioMarkTitleBySelector(time, com, selector, comMarks);

    if (checkIsNil(selector) || (props.isHideShortTime && titleProps.isShortTime)) return;
    const className = titleProps.isShortTime && 'text-xKO';

    const make = (node: React.ReactNode, isUnknownMark?: boolean) =>
      props.mapNode(
        <StyledCmAudioMarkControlButtonsContextButtonMeta
          key={time}
          icon="PlayCircle"
          com-audio-mark-time-selector={time}
          data-meta={dataMeta}
          className={twMerge('relative mx-[.2em] max-w-[80vw]', className)}
          onClick={event => {
            event.stopPropagation();
            cmComAudioPlayerIsFromPlayerPageAtom.set(false);
            cmComAudioPlayerUpdateCurrentTime(+time - takeMinusTime());
            cmComAudioPlayerSwitchIsPlay(true);
          }}
        >
          {node && <span className="ellipsis w-full">{node}</span>}
        </StyledCmAudioMarkControlButtonsContextButtonMeta>,
        time,
        selector,
        !!isUnknownMark,
        isPending,
      );

    if (checkIsString(selector)) {
      if (selector === '-') return;

      const value = make(<span className={className || 'text-x3'}>{titleProps.title}</span>);

      if (value)
        if (checkIsArray(prevSelectorOrBefore)) {
          (afterIdDict[convertCmBroadcastMonolineSlideOrdLineId(prevSelectorOrBefore)] ??= []).push(value);
          (afterIdDict[prevSelectorOrBefore[0]] ??= []).push(value);
        } else {
          (afterIdDict[prevSelectorOrBefore] ??= []).push(value);
        }

      return;
    }

    const value = make('');
    const slideId = convertCmBroadcastMonolineSlideOrdLineId(selector);

    if (value) (idDict[selector[0]] ??= []).push(value);

    if (checkIsNotNil(timeSlideDict[time]) || slideIds.has(slideId)) {
      if (value) (idDict[slideId] ??= []).push(value);
    } else if (checkIsArray(prevSelectorOrBefore)) {
      const value = make('', true);
      if (value) {
        const prevSlideId = convertCmBroadcastMonolineSlideOrdLineId(prevSelectorOrBefore);
        (afterIdDict[prevSlideId] ??= []).push(value);
      }
    }

    prevSelectorOrBefore = selector;
  });

  if (checkIsArray(comMarks[CmComAudioMarkPackTimeZero])) delete afterIdDict.before;

  return result;
};
