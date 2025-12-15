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
} from './makeCmComAudioMarkTitleBySelector';
import { takeCmComTrackCurrentTimeMark } from './takeCmComTrackCurrentTimeMark';

const chordedTextPrefix = '##@@';

export const useCmComCurrentMarkValues = (com: CmCom | und) => {
  const link = useAtomValue(cmPlayerBroadcastAudioSrcAtom);
  const marks = cmIDB.useAudioTrackMarks(link);
  const [currentMarkTime, setCurrentTime] = useState(0);
  const markTimes = useMemo(() => mylib.keys(marks?.marks).map(Number), [marks?.marks]);

  const markTextDict = useMemo(() => {
    const trackMarks = marks?.marks;
    const markTextDict: PRecord<number, string> = {};

    if (trackMarks == null) return markTextDict;
    const ordwTextDict: PRecord<CmComOrderWid, string[]> = {};
    const times = mylib.keys(trackMarks);
    let prevLinei = 0;
    let currentLines: string[] = [];

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
                text += `\n${currentOrd.repeatedText().replace(makeRegExp('/([/\\\\]|&nbsp;)+/g'), ' ')}`;
                currentOrd = currentOrd.me.next;
                if (currentOrd == null || !currentOrd.isHeaderNoneForce) break;
              }

              ordwTextDict[ordw] = text.trim().split(makeRegExp('/\\s*\\n+\\s*/'));
            } else {
              const text = `${chordedTextPrefix}${ord.ord.me.header()}`;
              ordwTextDict[ordw] = [text];
              markTextDict[times[timei]] = text;
            }
          }

          currentLines = ordwTextDict[ordw];
          prevLinei = 0;
        }
      }

      if (checkIsCmComAudioMarkTitleIsLineSelector(nextSelector)) {
        const linei = makeCmComAudioMarkLineiFromSelector(nextSelector);

        if (!mylib.isNaN(linei)) {
          markTextDict[times[timei]] = currentLines.slice(prevLinei, linei).join('\n');
          prevLinei = linei;
        }
      } else markTextDict[times[timei]] = currentLines.slice(prevLinei).join('\n');
    }

    return markTextDict;
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

  const isChordedBlock = markTextDict[currentMarkTime]?.startsWith(chordedTextPrefix);
  const nextText = markTextDict[markTimes[markTimes.indexOf(currentMarkTime) + 1]];
  const isNextChordedBlock = nextText?.startsWith(chordedTextPrefix);

  return {
    isChordedBlock,
    isNextChordedBlock,
    html: isChordedBlock
      ? markTextDict[currentMarkTime]?.slice(chordedTextPrefix.length)
      : markTextDict[currentMarkTime],
    nextHtml: isNextChordedBlock ? nextText?.slice(chordedTextPrefix.length) : nextText,
  };
};
