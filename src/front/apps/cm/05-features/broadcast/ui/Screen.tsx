import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { useEffect, useState } from 'react';
import { CmBroadcastSchWgtLiveDataValue } from '../model/model';
import { CmBroadcastLiveList } from './List';
import { CmBroadcastLiveSlide } from './Slide';

export const CmBroadcastLiveScreen = (props: CmBroadcastSchWgtLiveDataValue) => {
  const [subUpdates, setSubUpdates] = useState(0);

  useEffect(() => {
    let i = 0;

    return hookEffectPipe()
      .pipe(addEventListenerPipe(window, 'resize', () => setSubUpdates(++i)))
      .effect();
  }, []);

  return window.innerWidth > window.innerHeight ? (
    <CmBroadcastLiveSlide
      {...props}
      subUpdates={subUpdates}
    />
  ) : (
    <CmBroadcastLiveList {...props} />
  );
};
