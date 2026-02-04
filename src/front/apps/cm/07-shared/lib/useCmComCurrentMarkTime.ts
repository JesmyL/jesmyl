import { hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { cmComAudioPlayerAddEventListenerPipe } from '$cm/entities/com-audio-player';
import { useEffect, useState } from 'react';
import { CmComAudioMarkPackTime } from 'shared/api';
import { cmComTrackPreSwitchTimeAtom } from '../state';
import { takeCmComTrackCurrentTimeMark } from './takeCmComTrackCurrentTimeMark';

export const useCmComCurrentMarkTimei = (markTimes: CmComAudioMarkPackTime[]) => {
  const [currentMarkTimei, setCurrentMarkTimei] = useState(0);

  useEffect(() => {
    if (markTimes == null) return;

    return hookEffectPipe()
      .pipe(
        cmComAudioPlayerAddEventListenerPipe('timeupdate', () => {
          const currentMarkTimei = takeCmComTrackCurrentTimeMark(
            markTimes,
            undefined,
            cmComTrackPreSwitchTimeAtom.get(),
          );

          setCurrentMarkTimei(currentMarkTimei);
        }),
      )
      .effect();
  }, [markTimes]);

  return currentMarkTimei;
};
