import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { mylib } from '#shared/lib/my-lib';
import { FontSizeContain } from '#shared/ui/font-size-contain/FontSizeContain';
import { useCmCom } from '$cm/entities/com';
import { checkIsCmComAudioMarkTitleIsLineSelector, cmComAudioPlayerHTMLElement, CmComOrder, cmIDB } from '$cm/ext';
import { makeCmComAudioMarkLineiFromSelector } from '$cm/shared/lib/makeCmComAudioMarkTitleBySelector';
import { takeCmComTrackCurrentTimeMark } from '$cm/shared/lib/takeCmComTrackCurrentTimeMark';
import { cmComTrackPreSwitchTimeAtom } from '$cm/shared/state';
import { useAtomValue } from 'atomaric';
import { useEffect, useMemo, useState } from 'react';
import { makeRegExp } from 'regexpert';
import { CmComOrderWid } from 'shared/api';
import styled from 'styled-components';
import { cmPlayerBroadcastAudioSrcAtom, cmPlayerBroadcastComwAtom } from '../state/atoms';

const chordedTextPrefix = '##@@';

export const CmPlayerBroadcast = () => {
  const comw = useAtomValue(cmPlayerBroadcastComwAtom);
  const link = useAtomValue(cmPlayerBroadcastAudioSrcAtom);
  const com = useCmCom(comw);
  const marks = cmIDB.useAudioTrackMarks(link);
  const [currentTime, setCurrentTime] = useState(0);

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
                if (currentOrd == null || !currentOrd.me.isInherit) break;
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
    const markTimes = mylib.keys(marks?.marks).map(Number);
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
  }, [marks?.marks]);

  const isChordedBlock = markTextDict[currentTime]?.startsWith(chordedTextPrefix);

  return (
    <>
      <StyledBroadcast className="flex justify-center">
        <StyledFontSizeContain
          className="flex center"
          html={isChordedBlock ? markTextDict[currentTime]?.slice(chordedTextPrefix.length) : markTextDict[currentTime]}
          style={{
            width: '90vw',
            height: '90vh',
            opacity: isChordedBlock ? '.3' : undefined,
          }}
        />
      </StyledBroadcast>
    </>
  );
};

const StyledFontSizeContain = styled(FontSizeContain)`
  color: white;
  font-weight: bold;
  background-color: black;
  text-align: center;
  white-space: pre;
`;

const StyledBroadcast = styled.div`
  background-color: black;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  justify-content: center;

  &,
  * {
    color: white;
  }
`;
