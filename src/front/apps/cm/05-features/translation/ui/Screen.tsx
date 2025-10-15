import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { useEffect, useState } from 'react';
import { CmTranslationSchWgtLiveDataValue } from '../model/model';
import { CmTranslationLiveList } from './List';
import { CmTranslationLiveSlide } from './Slide';

export const CmTranslationLiveScreen = (props: CmTranslationSchWgtLiveDataValue) => {
  const [subUpdates, setSubUpdates] = useState(0);

  useEffect(() => {
    let i = 0;

    return hookEffectPipe()
      .pipe(addEventListenerPipe(window, 'resize', () => setSubUpdates(++i)))
      .effect();
  }, []);

  return window.innerWidth > window.innerHeight ? (
    <CmTranslationLiveSlide
      {...props}
      subUpdates={subUpdates}
    />
  ) : (
    <CmTranslationLiveList {...props} />
  );
};
