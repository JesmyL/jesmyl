import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { cmShowChordedSlideModeAtom } from '$cm/shared/state';
import { useEffect, useState } from 'react';
import { CmBroadcastSchWgtLiveDataValue } from '../model/model';
import { CmBroadcastLiveList } from './List';
import { CmBroadcastLiveSlide } from './Slide';

export const CmBroadcastLiveScreen = (
  props: CmBroadcastSchWgtLiveDataValue & {
    isForceSlideMode?: boolean;
  },
) => {
  const [subUpdates, setSubUpdates] = useState(0);

  useEffect(() => {
    cmShowChordedSlideModeAtom.set(props.chordedMode);
  }, [props.chordedMode]);

  useEffect(() => {
    let i = 0;

    return hookEffectPipe()
      .pipe(addEventListenerPipe(window, 'resize', () => setSubUpdates(++i)))
      .effect();
  }, []);

  return props.isForceSlideMode || window.innerWidth > window.innerHeight ? (
    <CmBroadcastLiveSlide
      {...props}
      subUpdates={subUpdates}
    />
  ) : (
    <CmBroadcastLiveList {...props} />
  );
};
