import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { complectIDB } from '$index/state/complectIDB';
import { useEffect } from 'react';
import { isNIs } from 'shared/utils';

const classList = document.querySelector('html')?.classList;
const minTouches = 3;
const maxTouches = 3;

export const useFingersActions = () => {
  const isDarkMode = complectIDB.useValue.isDarkMode();

  useEffect(() => {
    if (isDarkMode) classList?.add('dark');
    else classList?.remove('dark');
  }, [isDarkMode]);

  useEffect(() => {
    let timeout: TimeOut;

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(document.body, 'touchstart', event => {
          if (event.touches.length === 4) {
            timeout = setTimeout(() => window.navigator.clipboard.writeText(window.location.href), 500);
          } else if (event.touches.length >= minTouches && event.touches.length <= maxTouches) {
            timeout = setTimeout(complectIDB.set.isDarkMode, 500, isNIs);
          } else {
            clearTimeout(timeout);
          }
        }),
        addEventListenerPipe(document.body, 'touchend', event => {
          if (event.touches.length < minTouches || event.touches.length > maxTouches) clearTimeout(timeout);
        }),
        addEventListenerPipe(document.body, 'keyup', event => {
          if (event.code === 'Space' && event.ctrlKey && event.altKey && event.shiftKey)
            complectIDB.set.isDarkMode(isNIs);
        }),
      )
      .effect();
  }, []);
};
