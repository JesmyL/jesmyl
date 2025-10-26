import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { mylib } from '#shared/lib/my-lib';
import {
  CmCom,
  CmComOrder,
  checkIsCmComAudioMarkTitleIsLineSelector,
  cmComAudioPlayerHTMLElement,
  cmIDB,
  makeCmComAudioMarkTitleBySelector,
} from '$cm/ext';
import { makeCmComAudioMarkLineiFromSelector } from '$cm/shared/lib/makeCmComAudioMarkTitleBySelector';
import { useAtomValue } from 'atomaric';
import { useEffect, useRef } from 'react';
import { HttpLink } from 'shared/api';
import { emptyFunc } from 'shared/utils';
import { cmComAudioPlayerPlaySrcAtom } from '../state/current-play-com';

const currentAccentClassName = 'text-x7';
const windowDocument = window.document;

export const useCmComAudioPlayerMoversController = (
  src: HttpLink,
  com: CmCom,
  preSwitchTime: number,
  win: Window | nil,
) => {
  const document = win?.document ?? windowDocument;
  const playSrc = useAtomValue(cmComAudioPlayerPlaySrcAtom);
  const audioTrackMarks = cmIDB.useAudioTrackMarks(playSrc ?? src);

  const titleRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const repeatRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (titleRef.current === null || audioTrackMarks == null) return;
    const audioMarkPack = audioTrackMarks.marks;

    const titleNode = titleRef.current;
    const marks = mylib.keys(audioMarkPack).map(Number);
    const selectorToTitlePropsDict: PRecord<number, { title: string; ord: CmComOrder | nil }> = {};

    let prevMarkTime = 0;
    let currentMarkTime = 0;
    let nextMarkTime = 0;

    let lastMarkTime = 0;
    let prevButton: Element | nil = null;
    let isInitialButtonClassNameNeedSet = true;

    const findNextMarkTime = (num: number) => num > cmComAudioPlayerHTMLElement.currentTime;
    const findCurrentMarkTime = (num: number) => num <= cmComAudioPlayerHTMLElement.currentTime;

    const updateMarkBlockView =
      audioMarkPack == null || preSwitchTime < 0
        ? emptyFunc
        : () => {
            const actualMarkTime =
              preSwitchTime !== 0 &&
              cmComAudioPlayerHTMLElement.currentTime < nextMarkTime &&
              cmComAudioPlayerHTMLElement.currentTime > nextMarkTime - preSwitchTime
                ? nextMarkTime
                : currentMarkTime;

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

              const htmlButtonSelector = `[com-audio-mark-time-selector="${actualMarkTime}"]`;
              const block = document.querySelector(`.composition-block:has(${htmlButtonSelector})`);

              const button = (block ?? document)?.querySelector(htmlButtonSelector);

              if (+preSwitchTime >= 0) {
                const lineNode = checkIsCmComAudioMarkTitleIsLineSelector(selector)
                  ? document.querySelector(
                      `[solid-com-order-selector="${titleProps.ord?.wid}"] [solid-order-text-linei="${makeCmComAudioMarkLineiFromSelector(selector)}"]`,
                    )
                  : null;

                (lineNode ?? block ?? button)?.scrollIntoView({ block: 'center', behavior: 'smooth' });
              }

              prevButton?.classList.remove(currentAccentClassName);
              button?.classList.add(currentAccentClassName);
              prevButton = button;
            }

            lastMarkTime = actualMarkTime;
          };

    const updatePoints = () => {
      const currentMarkTimei = marks.findLastIndex(findCurrentMarkTime);

      prevMarkTime = marks[currentMarkTimei - 1] ?? 0;
      currentMarkTime = marks[currentMarkTimei] ?? 0;
      nextMarkTime = marks.find(findNextMarkTime) ?? 0;

      if (nextRef.current !== null) {
        nextRef.current.disabled = currentMarkTimei === marks.length - 1;
      }

      if (prevRef.current !== null) {
        prevRef.current.disabled = currentMarkTimei === 0;
      }

      updateMarkBlockView();
    };

    updatePoints();
    cmComAudioPlayerPlaySrcAtom.set(src);

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(prevRef.current, 'click', () => {
          cmComAudioPlayerHTMLElement.play();
          cmComAudioPlayerHTMLElement.currentTime = prevMarkTime;
        }),
        addEventListenerPipe(repeatRef.current, 'click', () => {
          cmComAudioPlayerHTMLElement.play();
          cmComAudioPlayerHTMLElement.currentTime = currentMarkTime;
        }),
        addEventListenerPipe(nextRef.current, 'click', () => {
          cmComAudioPlayerHTMLElement.play();
          cmComAudioPlayerHTMLElement.currentTime = nextMarkTime;
        }),
        addEventListenerPipe(cmComAudioPlayerHTMLElement, 'timeupdate', updatePoints),
        addEventListenerPipe(cmComAudioPlayerHTMLElement, 'ended', () => {
          cmComAudioPlayerHTMLElement.currentTime = 0;
          updatePoints();
        }),
      )
      .effect(() => prevButton?.classList.remove(currentAccentClassName));
  }, [audioTrackMarks, com, document, preSwitchTime, src]);

  return {
    titleRef,
    prevRef,
    repeatRef,
    nextRef,
  };
};
