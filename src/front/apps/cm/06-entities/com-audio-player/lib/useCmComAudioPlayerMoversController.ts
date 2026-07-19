import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { cmIDB } from '$cm/ext';
import { takeCmComTrackCurrentTimeMark } from '$cm/shared/lib/takeCmComTrackCurrentTimeMark';
import { useAtomValue } from 'atomaric';
import { useEffect, useRef } from 'react';
import { CmComAudioMarkPackTime, HttpNumLeadLink } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { makeCmComAudioMarkTitleBySelector } from 'shared/const/cm/order/makeCmComAudioMarkTitleBySelector';
import { CmComOrder } from 'shared/const/cm/order/Order';
import { emptyFunc, extractNumber } from 'shared/utils';
import { checkIsArray, checkIsNil } from 'shared/utils/checkIs';
import { objectKeys } from 'shared/utils/object.utils';
import {
  cmComAudioPlayerAddEventListenerPipe,
  cmComAudioPlayerPlaySrcAtom,
  cmComAudioPlayerSetSrc,
  cmComAudioPlayerSwitchIsPlay,
  cmComAudioPlayerUpdateCurrentTime,
  takeCmComAudioPlayerCurrentTime,
} from '../state/current-play-com';

const currentAccentClassName = 'text-x7';
const windowDocument = window.document;

export const useCmComAudioPlayerMoversController = (
  src: HttpNumLeadLink,
  com: CmCom,
  preSwitchTime: number,
  win: Window | nil,
) => {
  const document = win?.document ?? windowDocument;
  const currentSrc = useAtomValue(cmComAudioPlayerPlaySrcAtom) ?? src;
  const audioTrackMarks = cmIDB.useAudioTrackMarks(com.wid);

  const titleRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const repeatRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (checkIsNil(titleRef.current) || checkIsNil(audioTrackMarks?.marks)) return;
    const audioMarkPack = audioTrackMarks.marks[currentSrc];

    const titleNode = titleRef.current;
    const markTimeList = objectKeys(audioMarkPack).map(extractNumber);
    const selectorToTitlePropsDict: PRecord<number, { title: string; ord: CmComOrder | nil }> = {};
    const timePositions$ = { prev: 0, current: 0, next: 0, preprev: 0 } as never as Record<
      'prev' | 'current' | 'next' | 'preprev',
      CmComAudioMarkPackTime
    >;

    let lastMarkTime = 0;
    let prevButton: Element | nil = null;
    let isInitialButtonClassNameNeedSet = true;

    const updateMarkBlockView =
      audioMarkPack == null || preSwitchTime < 0
        ? emptyFunc
        : () => {
            const actualMarkTime =
              preSwitchTime !== 0 &&
              takeCmComAudioPlayerCurrentTime() < timePositions$.next &&
              takeCmComAudioPlayerCurrentTime() > timePositions$.next - preSwitchTime
                ? timePositions$.next
                : timePositions$.current;

            if (isInitialButtonClassNameNeedSet || lastMarkTime !== actualMarkTime) {
              isInitialButtonClassNameNeedSet = false;
              const selector = audioMarkPack[actualMarkTime];

              const titleProps = (selectorToTitlePropsDict[actualMarkTime] ??= makeCmComAudioMarkTitleBySelector(
                actualMarkTime,
                com,
                selector,
                audioMarkPack,
              ));

              titleNode.innerText = titleProps.title;

              const htmlButtonSelector = `[com-audio-mark-time-selector="${actualMarkTime}"]` as const;
              const block = document.querySelector(`.composition-block:has(${htmlButtonSelector})`);

              const button = (block ?? document)?.querySelector(htmlButtonSelector);

              if (+preSwitchTime >= 0) {
                const ordSelector = `[solid-ord-selector="${titleProps.ord?.wid}"]` as const;
                const lineNode = checkIsArray(selector)
                  ? document.querySelector(`${ordSelector} [solid-ord-linei="${selector[1]}"]`)
                  : null;

                (lineNode ?? block ?? button ?? document.querySelector(ordSelector))?.scrollIntoView({
                  block: 'center',
                  behavior: 'smooth',
                });
              }

              prevButton?.classList.remove(currentAccentClassName);
              button?.classList.add(currentAccentClassName);
              prevButton = button;
            }

            lastMarkTime = actualMarkTime;
          };

    const updatePoints = () => {
      const currentMarkTimei = takeCmComTrackCurrentTimeMark(markTimeList, timePositions$);

      if (nextRef.current !== null) {
        nextRef.current.disabled = currentMarkTimei === markTimeList.length - 1;
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
          cmComAudioPlayerSwitchIsPlay(true);

          cmComAudioPlayerUpdateCurrentTime(
            Math.abs(timePositions$.current - timePositions$.prev) < 1 ? timePositions$.preprev : timePositions$.prev,
          );
        }),
        addEventListenerPipe(repeatRef.current, 'click', () => {
          cmComAudioPlayerSwitchIsPlay(true);
          cmComAudioPlayerUpdateCurrentTime(timePositions$.current);
        }),
        addEventListenerPipe(nextRef.current, 'click', () => {
          cmComAudioPlayerSwitchIsPlay(true);
          cmComAudioPlayerUpdateCurrentTime(timePositions$.next);
        }),
        cmComAudioPlayerAddEventListenerPipe('timeupdate', updatePoints),
        cmComAudioPlayerAddEventListenerPipe('ended', () => {
          cmComAudioPlayerUpdateCurrentTime(0);
          updatePoints();
        }),
      )
      .effect(() => prevButton?.classList.remove(currentAccentClassName));
  }, [audioTrackMarks?.marks, com, currentSrc, document, preSwitchTime, src]);

  return {
    titleRef,
    prevRef,
    repeatRef,
    nextRef,
    audioTrackMarks,
  };
};
