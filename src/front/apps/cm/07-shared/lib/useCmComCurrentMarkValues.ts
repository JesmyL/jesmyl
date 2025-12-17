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

const technicalTextPrefix = '##@@';

export const useCmComCurrentMarkValues = (com: CmCom | und) => {
  const link = useAtomValue(cmPlayerBroadcastAudioSrcAtom);
  const marks = cmIDB.useAudioTrackMarks(link);
  const [currentMarkTimei, setCurrentMarkTimei] = useState(0);
  const markTimes = useMemo(() => mylib.keys(marks?.marks).map(Number), [marks?.marks]);

  const { markTextDict, timeMarkTextRepeatDict } = useMemo(() => {
    const trackMarks = marks?.marks;
    const markTextDict: PRecord<number, string> = {};
    const timeMarkTextRepeatDict: PRecord<number, { r: number }> = {};
    const result = { markTextDict, timeMarkTextRepeatDict };

    if (trackMarks == null) return result;

    const ordwTextDict: PRecord<CmComOrderWid, string[]> = {};
    const times = mylib.keys(trackMarks);
    let prevLinei = 0;
    let currentLines: string[] = [];
    let prevTextForRepeats = '&&&';
    let repeatTimeMark: { r: number } = { r: 1 };

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
          `${technicalTextPrefix}${makeCmComAudioMarkTitleEmptySelector(selector, marks?.marks, +times[timei])}`;

        continue;
      }

      let blockText;

      if (checkIsCmComAudioMarkTitleIsLineSelector(nextSelector)) {
        const linei = makeCmComAudioMarkLineiFromSelector(nextSelector);

        if (mylib.isNaN(linei)) continue;

        blockText = currentLines.slice(prevLinei, linei).join('\n');
        prevLinei = linei;
      } else if (!checkIsCmComAudioMarkTitleIsLineSelector(selector) && mylib.isStr(selector)) {
        const selectorText = selector.trim();

        blockText = selectorText.includes('\n') ? selectorText : `${technicalTextPrefix}${selectorText}`;
      } else blockText = currentLines.slice(prevLinei).join('\n');

      markTextDict[times[timei]] = blockText;

      if (!blockText) continue;

      if (prevTextForRepeats === blockText) {
        repeatTimeMark.r++;
      } else repeatTimeMark = { r: 1 };

      timeMarkTextRepeatDict[times[timei]] = repeatTimeMark;
      prevTextForRepeats = blockText;
    }

    return result;
  }, [com, marks?.marks]);

  useEffect(() => {
    if (markTimes == null) return;
    const timePositions$ = { prev: 0, current: 0, next: 0 };

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
  }, [markTimes]);

  const currentTimeMark = markTimes[currentMarkTimei];
  const isTechnicalText = markTextDict[currentTimeMark]?.startsWith(technicalTextPrefix);
  const currentText = isTechnicalText
    ? markTextDict[currentTimeMark]?.slice(technicalTextPrefix.length)
    : markTextDict[currentTimeMark];

  const nextTimeMark =
    markTimes
      .slice(currentMarkTimei + 1)
      .find(time => markTextDict[currentTimeMark] != null && markTextDict[time] !== markTextDict[currentTimeMark]) ??
    markTimes[currentMarkTimei + 1];

  const nextText = markTextDict[nextTimeMark];
  const isNextTechnicalText = nextText?.startsWith(technicalTextPrefix);

  const makeRepeatedText = <Text extends string | nil>(text: Text, timeMark: number) => {
    if (!text || timeMarkTextRepeatDict[timeMark] == null || timeMarkTextRepeatDict[timeMark].r < 2) return text;

    return `${'/'.repeat(timeMarkTextRepeatDict[timeMark].r)}&nbsp;${text}&nbsp;${'\\'.repeat(timeMarkTextRepeatDict[timeMark].r)}`;
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
