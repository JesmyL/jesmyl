import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { scrollIntoViewOfContainer } from '#shared/lib/utils';
import { cmIDB } from '$cm/ext';
import { takeCmComTrackCurrentTimeMark } from '$cm/shared/lib/takeCmComTrackCurrentTimeMark';
import { useCmComAudioMarkSlides } from '$cm/shared/lib/useCmComAudioMarkSlides';
import { useAtomValue } from 'atomaric';
import { useEffect, useRef } from 'react';
import { CmAudioSrc, CmComAudioMarkPackTime, parseCmAudioSrc } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { makeCmComAudioMarkTitleBySelector } from 'shared/const/cm/order/makeCmComAudioMarkTitleBySelector';
import { CmComOrder } from 'shared/const/cm/order/Order';
import { TextCase } from 'shared/model/common';
import { emptyFunc } from 'shared/utils';
import { checkIsArray, checkIsNil } from 'shared/utils/checkIs';
import {
  cmComAudioPlayerAddEventListenerPipe,
  cmComAudioPlayerPlaySrcAtom,
  cmComAudioPlayerSetSrc,
  cmComAudioPlayerSwitchIsPlay,
  cmComAudioPlayerUpdateCurrentTime,
  takeCmComAudioPlayerCurrentTime,
} from '../state/current-play-com';
import { cmComAudioPlayerIsFromPlayerPageAtom } from '../state/atoms';

const currentButtonElemAccentClassName = 'text-x7';
const windowDocument = window.document;

/** A mark jump is a player-page-independent restart: an ended track must not walk on to the next com. */
const playFromMarks = () => {
  cmComAudioPlayerIsFromPlayerPageAtom.set(false);
  cmComAudioPlayerSwitchIsPlay(true);
};

const enum MarkTimePosition {
  PrePrev,
  Prev,
  Current,
  Next,
}

export const useCmComAudioPlayerMoversController = (
  src: CmAudioSrc,
  com: CmCom,
  preSwitchTime: number,
  win: Window | nil,
) => {
  const document = win?.document ?? windowDocument;
  const currentSrc = parseCmAudioSrc(useAtomValue(cmComAudioPlayerPlaySrcAtom) ?? src);
  const audioTrackMarks = cmIDB.useAudioTrackMarks(com.wid);
  const { markTimes } = useCmComAudioMarkSlides(com, currentSrc, TextCase.AsIs);

  const titleRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const repeatRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (checkIsNil(titleRef.current) || checkIsNil(audioTrackMarks?.marks)) return;
    const audioMarkPack = currentSrc ? audioTrackMarks.marks[currentSrc] : null;

    const titleNode = titleRef.current;
    const selectorToTitlePropsDict: PRecord<number, { title: string; ord?: CmComOrder | nil }> = {};
    const timePositions$ = [0, 0, 0, 0] as never as Record<MarkTimePosition, CmComAudioMarkPackTime>;

    let lastMarkTime = 0;
    let prevButtonElem: Element | nil = null;
    let isInitialButtonClassNameNeedSet = true;

    const updateMarkBlockView =
      audioMarkPack == null || preSwitchTime < 0
        ? emptyFunc
        : () => {
            const actualMarkTime =
              preSwitchTime !== 0 &&
              takeCmComAudioPlayerCurrentTime() < timePositions$[MarkTimePosition.Next] &&
              takeCmComAudioPlayerCurrentTime() > timePositions$[MarkTimePosition.Next] - preSwitchTime
                ? timePositions$[MarkTimePosition.Next]
                : timePositions$[MarkTimePosition.Current];

            if (isInitialButtonClassNameNeedSet || lastMarkTime !== actualMarkTime) {
              isInitialButtonClassNameNeedSet = false;
              const selector = audioMarkPack[actualMarkTime];

              const titleProps = (selectorToTitlePropsDict[actualMarkTime] ??= makeCmComAudioMarkTitleBySelector(
                actualMarkTime,
                com,
                selector,
                audioMarkPack,
              ));

              titleNode.innerHTML = titleProps.title;

              const buttonElem = document?.querySelector(`[com-audio-mark-time-selector="${actualMarkTime}"]`);

              if (preSwitchTime >= 0) {
                const ordSelector = `[solid-ord-selector="${titleProps.ord?.wid}"]` as const;
                const lineElem = checkIsArray(selector)
                  ? document.querySelector(`${ordSelector} [solid-ord-linei="${selector[1] ?? 0}"]`)
                  : null;

                const elem = lineElem ?? buttonElem ?? document.querySelector(ordSelector);

                if (elem) scrollIntoViewOfContainer(elem, 'smooth');
              }

              prevButtonElem?.classList.remove(currentButtonElemAccentClassName);
              buttonElem?.classList.add(currentButtonElemAccentClassName);
              prevButtonElem = buttonElem;
            }

            lastMarkTime = actualMarkTime;
          };

    const updatePoints = () => {
      const currentMarkTimei = takeCmComTrackCurrentTimeMark(markTimes);

      if (checkIsNil(timePositions$)) return currentMarkTimei;

      timePositions$[MarkTimePosition.PrePrev] = (markTimes[currentMarkTimei - 2] ?? 0) as CmComAudioMarkPackTime;
      timePositions$[MarkTimePosition.Prev] = (markTimes[currentMarkTimei - 1] ?? 0) as CmComAudioMarkPackTime;
      timePositions$[MarkTimePosition.Current] = (markTimes[currentMarkTimei] ?? 0) as CmComAudioMarkPackTime;
      timePositions$[MarkTimePosition.Next] = (markTimes[currentMarkTimei + 1] ?? 0) as CmComAudioMarkPackTime;

      if (nextRef.current !== null) {
        nextRef.current.disabled = currentMarkTimei === markTimes.length - 1;
      }

      if (prevRef.current !== null) {
        prevRef.current.disabled = currentMarkTimei === 0;
      }

      updateMarkBlockView();
    };

    updatePoints();
    cmComAudioPlayerSetSrc(src);

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(prevRef.current, 'click', () => {
          playFromMarks();

          cmComAudioPlayerUpdateCurrentTime(
            Math.abs(timePositions$[MarkTimePosition.Current] - timePositions$[MarkTimePosition.Prev]) < 1
              ? timePositions$[MarkTimePosition.PrePrev]
              : timePositions$[MarkTimePosition.Prev],
          );
        }),
        addEventListenerPipe(repeatRef.current, 'click', () => {
          playFromMarks();
          cmComAudioPlayerUpdateCurrentTime(timePositions$[MarkTimePosition.Current]);
        }),
        addEventListenerPipe(nextRef.current, 'click', () => {
          playFromMarks();
          cmComAudioPlayerUpdateCurrentTime(timePositions$[MarkTimePosition.Next]);
        }),
        cmComAudioPlayerAddEventListenerPipe('timeupdate', updatePoints),
        cmComAudioPlayerAddEventListenerPipe('ended', () => {
          cmComAudioPlayerUpdateCurrentTime(0);
          updatePoints();
        }),
      )
      .effect(() => prevButtonElem?.classList.remove(currentButtonElemAccentClassName));
  }, [audioTrackMarks?.marks, com, currentSrc, document, markTimes, preSwitchTime, src]);

  return {
    titleRef,
    prevRef,
    repeatRef,
    nextRef,
    audioTrackMarks,
  };
};
