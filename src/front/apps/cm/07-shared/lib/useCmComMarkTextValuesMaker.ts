import { MyLib, mylib } from '#shared/lib/my-lib';
import { CmCom, CmComOrder, cmIDB } from '$cm/ext';
import { useMemo } from 'react';
import { makeRegExp } from 'regexpert';
import { CmComAudioMarkPackTime, CmComOrderWid, HttpLink } from 'shared/api';
import {
  checkIsCmComAudioMarkTitleIsLineSelector,
  makeCmComAudioMarkLineiFromSelector,
  makeCmComAudioMarkTitleEmptySelector,
} from './makeCmComAudioMarkTitleBySelector';

const technicalTextPrefix = `##${Date.now()}@@`;
type TotalRepeatsCount = { r: number };

export const useCmComMarkTextValuesMaker = (com: CmCom | und, link: HttpLink | nil) => {
  const marks = cmIDB.useAudioTrackMarks(link);
  const trackMarks = com && marks?.cMarks?.[com.wid];
  const markTimes: CmComAudioMarkPackTime[] = useMemo(() => MyLib.keys(trackMarks).map(Number), [trackMarks]);

  const { markTextDict, timeMarkTextRepeatDict } = useMemo(() => {
    const markTextDict: PRecord<CmComAudioMarkPackTime, string> = {};
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
          `${technicalTextPrefix}${makeCmComAudioMarkTitleEmptySelector(selector, trackMarks, +times[timei])}`;

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
  }, [com, trackMarks]);

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
    markTextDict,
    technicalTextPrefix,
    makeRepeatedText,
    markTimes,
    makeText: (timei: number) => {
      const timeMark = markTimes[timei];
      const isTechnicalText = markTextDict[timeMark]?.startsWith(technicalTextPrefix);
      const text = isTechnicalText ? markTextDict[timeMark]?.slice(technicalTextPrefix.length) : markTextDict[timeMark];

      return { isTechnicalText, text: makeRepeatedText(text, timeMark) };
    },
  };
};

const nbsp = '&nbsp;';

const makeFadeRepeats = (slash: '\\' | '/', total: number, current: number) => {
  const invisibleSlash = `<span class="opacity-40">${slash.repeat(total - current)}</span>`;

  return slash === '/'
    ? `${invisibleSlash}${slash.repeat(current)}${nbsp}`
    : `${nbsp}${slash.repeat(current)}${invisibleSlash}`;
};
