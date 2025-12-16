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

const chordedTextPrefix = '##@@';

export const useCmComCurrentMarkValues = (com: CmCom | und) => {
  const link = useAtomValue(cmPlayerBroadcastAudioSrcAtom);
  const marks = cmIDB.useAudioTrackMarks(link);
  const [currentTimeMark, setCurrentTime] = useState(0);
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
              const chordedText = `${chordedTextPrefix}${ord.ord.me.header()}`;
              ordwTextDict[ordw] = [chordedText];
              markTextDict[times[timei]] = chordedText;
            }
          }

          currentLines = ordwTextDict[ordw];
          prevLinei = 0;
        }
      } else if (!selector) {
        markTextDict[times[timei]] =
          `${chordedTextPrefix}${makeCmComAudioMarkTitleEmptySelector(selector, marks?.marks, +times[timei])}`;

        continue;
      }

      if (checkIsCmComAudioMarkTitleIsLineSelector(nextSelector)) {
        const linei = makeCmComAudioMarkLineiFromSelector(nextSelector);

        if (mylib.isNaN(linei)) continue;

        markTextDict[times[timei]] = currentLines.slice(prevLinei, linei).join('\n');
        prevLinei = linei;
      } else markTextDict[times[timei]] = currentLines.slice(prevLinei).join('\n');

      const text = markTextDict[times[timei]];

      if (text) {
        if (prevTextForRepeats === text) {
          repeatTimeMark.r++;
        } else repeatTimeMark = { r: 1 };

        timeMarkTextRepeatDict[times[timei]] = repeatTimeMark;
        prevTextForRepeats = text;
      }
    }

    return result;
  }, [com, marks?.marks]);

  useEffect(() => {
    if (markTimes == null) return;
    const timePositions = { prev: 0, current: 0, next: 0 };

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(cmComAudioPlayerHTMLElement, 'timeupdate', () => {
          takeCmComTrackCurrentTimeMark(markTimes, timePositions, cmComTrackPreSwitchTimeAtom.get());

          setCurrentTime(timePositions.current);
        }),
      )
      .effect();
  }, [markTimes]);

  const isChordedBlock = markTextDict[currentTimeMark]?.startsWith(chordedTextPrefix);
  const nextTimeMark = markTimes[markTimes.indexOf(currentTimeMark) + 1];
  const nextText = markTextDict[nextTimeMark];
  const isNextChordedBlock = nextText?.startsWith(chordedTextPrefix);

  const makeRepeatedText = <Text extends string | nil>(text: Text, timeMark: number) => {
    if (!text || timeMarkTextRepeatDict[timeMark] == null || timeMarkTextRepeatDict[timeMark].r < 2) return text;

    return `${'/'.repeat(timeMarkTextRepeatDict[timeMark].r)}&nbsp;${text}&nbsp;${'\\'.repeat(timeMarkTextRepeatDict[timeMark].r)}`;
  };

  return {
    isChordedBlock,
    isNextChordedBlock,
    html: makeRepeatedText(
      isChordedBlock ? markTextDict[currentTimeMark]?.slice(chordedTextPrefix.length) : markTextDict[currentTimeMark],
      currentTimeMark,
    ),
    nextHtml: makeRepeatedText(isNextChordedBlock ? nextText?.slice(chordedTextPrefix.length) : nextText, nextTimeMark),
  };
};
