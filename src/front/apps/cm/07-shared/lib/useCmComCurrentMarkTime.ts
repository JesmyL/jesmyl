import { hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { HorizontalDirection } from '#shared/model/Direction';
import { cmBroadcastSwitchBlockDirectionAtom } from '$cm/entities/broadcast';
import { cmComAudioPlayerAddEventListenerPipe } from '$cm/entities/com-audio-player';
import { useAtomValue } from 'atomaric';
import { useEffect, useState } from 'react';
import { CmAudioSlide, CmComAudioMarkPackTime } from 'shared/api';
import { objectLength } from 'shared/utils/object.utils';
import { cmComTrackPreSwitchTimeAtom } from '../state';
import { takeCmComTrackCurrentTimeMark } from './takeCmComTrackCurrentTimeMark';

export const useCmComCurrentMarkTimei = (markTimes: CmComAudioMarkPackTime[], audioSlides: CmAudioSlide[]) => {
  const [currentMarkTimei, setCurrentMarkTimei] = useState(0);
  const extraTime = useAtomValue(cmComTrackPreSwitchTimeAtom);

  useEffect(() => {
    if (objectLength(audioSlides) !== objectLength(markTimes)) throw 'lengths not eq';

    const minusedTimes = audioSlides.map((slide, slidei) => markTimes[slidei] - (slide.isChorded ? 0 : extraTime));

    let prev = -1;

    return hookEffectPipe()
      .pipe(
        cmComAudioPlayerAddEventListenerPipe('timeupdate', () => {
          const currentMarkTimei = takeCmComTrackCurrentTimeMark(minusedTimes);

          if (prev !== currentMarkTimei) {
            setCurrentMarkTimei(currentMarkTimei);

            cmBroadcastSwitchBlockDirectionAtom.set(
              prev > currentMarkTimei ? HorizontalDirection.RightToLeft : HorizontalDirection.LeftToRight,
            );

            prev = currentMarkTimei;
          }
        }),
      )
      .effect();
  }, [audioSlides, extraTime, markTimes]);

  return currentMarkTimei;
};
