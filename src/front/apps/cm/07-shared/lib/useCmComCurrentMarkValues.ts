import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { mylib } from '#shared/lib/my-lib';
import { CmCom, CmComOrder, cmComAudioPlayerHTMLElement, cmIDB } from '$cm/ext';
import { useAtomValue } from 'atomaric';
import { useEffect, useMemo, useState } from 'react';
import { makeRegExp } from 'regexpert';
import { CmComOrderWid } from 'shared/api';
import { cmComTrackPreSwitchTimeAtom } from '../state';
import { cmPlayerBroadcastAudioSrcAtom } from '../state/broadcast.atoms';
import {
  checkIsCmComAudioMarkTitleIsLineSelector,
  makeCmComAudioMarkLineiFromSelector,
  makeCmComAudioMarkTitleEmptySelector,
} from './makeCmComAudioMarkTitleBySelector';
import { takeCmComTrackCurrentTimeMark } from './takeCmComTrackCurrentTimeMark';

const technicalTextPrefix = `##${Date.now()}@@`;
type TotalRepeatsCount = { r: number };

export const useCmComCurrentMarkValues = (com: CmCom | und) => {
  const link = useAtomValue(cmPlayerBroadcastAudioSrcAtom);
  const marks = cmIDB.useAudioTrackMarks(link);
  const [currentMarkTimei, setCurrentMarkTimei] = useState(0);

  const { markTextDict, timeMarkTextRepeatDict } = useMemo(() => {
    const trackMarks = com && marks?.cMarks?.[com.wid];
    const markTextDict: PRecord<number, string> = {};
    const timeMarkTextRepeatDict: PRecord<number, { index: number; total: TotalRepeatsCount }> = {};
    const result = { markTextDict, timeMarkTextRepeatDict };

    if (trackMarks == null) return result;

    const ordwTextDict: PRecord<CmComOrderWid, string[]> = {};
    const times = mylib.keys(trackMarks);
    let prevLinei = 0;
    let currentLines: string[] = [];
    let prevTextForRepeats = technicalTextPrefix;
    let repeatTimeMark: TotalRepeatsCount = { r: 1 };

    for (let timei = 0; timei < times.length; timei++) {
      const selector = trackMarks[times[timei]];
      const nextSelector = trackMarks[times[timei + 1]];

      if (mylib.isArr(selector)) {
        const ord = com?.getOrderBySelector(selector[0]);

        if (ord?.ord) {
          const ordw = ord.ord.wid;

          if (ordwTextDict[ordw] == null) {
            if (ord.ord.isRealText()) {
              let currentOrd = ord.ord as CmComOrder | nil;
              let text = '';

              while (currentOrd) {
                text += `\n${currentOrd.transformedText()}`;
                currentOrd = currentOrd.me.next;
                if (currentOrd == null || !currentOrd.isHeaderNoneForce) break;
              }

              ordwTextDict[ordw] = text.trim().split(makeRegExp('/\\s*\\n+\\s*/'));
            } else {
              const chordedText = `${technicalTextPrefix}${ord.ord.me.header()}`;
              ordwTextDict[ordw] = [chordedText];
              markTextDict[times[timei]] = chordedText;
            }
          }

          currentLines = ordwTextDict[ordw];
          prevLinei = 0;
        }
      } else if (!selector) {
        markTextDict[times[timei]] =
          `${technicalTextPrefix}${makeCmComAudioMarkTitleEmptySelector(selector, com && marks?.cMarks?.[com.wid], +times[timei])}`;

        continue;
      }

      let blockText;

      if (checkIsCmComAudioMarkTitleIsLineSelector(selector)) {
        const linei = makeCmComAudioMarkLineiFromSelector(selector);

        if (mylib.isNaN(linei)) continue;

        let nextLinei = checkIsCmComAudioMarkTitleIsLineSelector(nextSelector)
          ? makeCmComAudioMarkLineiFromSelector(nextSelector)
          : undefined;

        if (linei === nextLinei) nextLinei = undefined;

        blockText = currentLines.slice(linei, nextLinei).join('\n');
      } else if (!checkIsCmComAudioMarkTitleIsLineSelector(selector) && mylib.isStr(selector)) {
        const selectorText = selector.trim();

        if (selectorText === '-') continue;

        blockText = selectorText.startsWith('+')
          ? selectorText.slice(1).trim()
          : `${technicalTextPrefix}${selectorText}`;
      } else if (checkIsCmComAudioMarkTitleIsLineSelector(nextSelector)) {
        const linei = makeCmComAudioMarkLineiFromSelector(nextSelector);

        if (mylib.isNaN(linei)) continue;

        blockText = currentLines.slice(prevLinei, linei).join('\n');
        prevLinei = linei;
      } else blockText = currentLines.slice(prevLinei).join('\n');

      markTextDict[times[timei]] = blockText;

      if (!blockText) continue;

      if (prevTextForRepeats === blockText) {
        repeatTimeMark.r++;
      } else repeatTimeMark = { r: 1 };

      timeMarkTextRepeatDict[times[timei]] = { index: repeatTimeMark.r - 1, total: repeatTimeMark };
      prevTextForRepeats = blockText;
    }

    return result;
  }, [com, marks?.cMarks]);

  useEffect(() => {
    if (marks?.cMarks == null) return;

    const markPack = marks.cMarks;
    const markTimes = mylib.keys(markPack).map(Number);
    const timePositions$ = { prev: 0, current: 0, next: 0, preprev: 0 };

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(cmComAudioPlayerHTMLElement, 'timeupdate', () => {
          const currentMarkTimei = takeCmComTrackCurrentTimeMark(
            markTimes,
            timePositions$,
            cmComTrackPreSwitchTimeAtom.get(),
          );

          setCurrentMarkTimei(currentMarkTimei);
        }),
      )
      .effect();
  }, [marks?.cMarks]);

  const markTimes = mylib.keys(marks?.cMarks).map(Number);
  const currentTimeMark = markTimes[currentMarkTimei];
  const isTechnicalText = markTextDict[currentTimeMark]?.startsWith(technicalTextPrefix);
  const currentText = isTechnicalText
    ? markTextDict[currentTimeMark]?.slice(technicalTextPrefix.length)
    : markTextDict[currentTimeMark];

  const nextTimeMark =
    markTimes
      .slice(currentMarkTimei + 1)
      .find(
        (time, timei, timea) =>
          markTextDict[currentTimeMark] != null &&
          markTextDict[time] !== markTextDict[currentTimeMark] &&
          Math.abs(time - timea[timei + 1]) > 1,
      ) ?? markTimes[currentMarkTimei + 1];

  const nextText = markTextDict[nextTimeMark];
  const isNextTechnicalText = nextText?.startsWith(technicalTextPrefix);

  const makeRepeatedText = <Text extends string | nil>(text: Text, timeMark: number) => {
    if (!text || timeMarkTextRepeatDict[timeMark] == null) return text;
    const markTotalRepeatsCount = timeMarkTextRepeatDict[timeMark].total.r;
    if (markTotalRepeatsCount < 2) return text;

    if (markTotalRepeatsCount < 4) {
      return `${'/'.repeat(markTotalRepeatsCount)}${nbsp}${text}${nbsp}${'\\'.repeat(markTotalRepeatsCount)}`;
    }

    const repeatsCount = markTotalRepeatsCount - timeMarkTextRepeatDict[timeMark].index;

    return `${makeFadeRepeats('/', markTotalRepeatsCount, repeatsCount)}${text}${makeFadeRepeats('\\', markTotalRepeatsCount, repeatsCount)}`;
  };

  return {
    isTechnicalText,
    isNextTechnicalText,
    html: makeRepeatedText(currentText, currentTimeMark),
    nextHtml: makeRepeatedText(
      isNextTechnicalText ? nextText?.slice(technicalTextPrefix.length) : nextText,
      nextTimeMark,
    ),
  };
};

const nbsp = '&nbsp;';

const makeFadeRepeats = (slash: '\\' | '/', total: number, current: number) => {
  const invisibleSlash = `<span class="opacity-40">${slash.repeat(total - current)}</span>`;

  return slash === '/'
    ? `${invisibleSlash}${slash.repeat(current)}${nbsp}`
    : `${nbsp}${slash.repeat(current)}${invisibleSlash}`;
};
