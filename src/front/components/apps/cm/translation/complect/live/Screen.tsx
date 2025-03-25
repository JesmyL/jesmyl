import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { useEffect, useState } from 'react';
import { CmLiveTranslationList } from './List';
import { CmSchWTranslationLiveDataValue } from './model';
import { CmLiveTranslationSlide } from './Slide';

export const CmLiveTranslationScreen = (props: CmSchWTranslationLiveDataValue) => {
  const [subUpdates, setSubUpdates] = useState(0);

  useEffect(() => {
    let i = 0;

    return hookEffectPipe()
      .pipe(addEventListenerPipe(window, 'resize', () => setSubUpdates(++i)))
      .effect();
  }, []);

  return window.innerWidth > window.innerHeight ? (
    <CmLiveTranslationSlide
      {...props}
      subUpdates={subUpdates}
    />
  ) : (
    <CmLiveTranslationList {...props} />
  );
};
