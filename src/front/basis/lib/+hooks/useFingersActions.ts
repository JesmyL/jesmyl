import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { complectIDB } from 'front/basis/idb';
import { useEffect } from 'react';
import { isNIs } from 'shared/utils';

const classList = document.body.classList;
const minTouches = 3;
const maxTouches = 3;
const className = 'reverse-theme';

export const useFingersActions = () => {
  const isThemeReverse = complectIDB.useValue.isReverseTheme();

  useEffect(() => {
    if (isThemeReverse) classList.add(className);
    else classList.remove(className);

    let timeout: TimeOut;

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(document.body, 'touchstart', event => {
          if (event.touches.length === 4) {
            timeout = setTimeout(() => window.navigator.clipboard.writeText(window.location.href), 500);
          } else if (event.touches.length >= minTouches && event.touches.length <= maxTouches) {
            timeout = setTimeout(complectIDB.set.isReverseTheme, 500, isNIs);
          } else {
            clearTimeout(timeout);
          }
        }),
        addEventListenerPipe(document.body, 'touchend', event => {
          if (event.touches.length < minTouches || event.touches.length > maxTouches) clearTimeout(timeout);
        }),
        addEventListenerPipe(document.body, 'keyup', event => {
          if (event.code === 'Space' && event.ctrlKey && event.altKey && event.shiftKey)
            complectIDB.set.isReverseTheme(isNIs);
        }),
      )
      .effect();
  }, [isThemeReverse]);
};
