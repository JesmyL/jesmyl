import { RefObject, useEffect, useState } from 'react';
import { addEventListenerPipe, hookEffectPipe } from './hookEffectPipe';

export const usePinchValue = (
  ref: RefObject<HTMLElement | null>,
  initial: number,
  onCommit: (val: number) => void,
  factor = 0.2,
) => {
  const [value, setValue] = useState(initial);

  useEffect(() => {
    const elem = ref.current;
    if (!elem) return;

    let startDist = 0;
    let startVal = initial;
    let currentVal = initial;

    const getDist = (t: TouchList) => {
      const dx = t[0].clientX - t[1].clientX;
      const dy = t[0].clientY - t[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(elem, 'touchstart', (e: TouchEvent) => {
          if (e.touches.length === 2) {
            startDist = getDist(e.touches);
            startVal = currentVal;
          }
        }),
        addEventListenerPipe(
          elem,
          'touchmove',
          e => {
            if (e.touches.length === 2 && startDist > 0) {
              const ratio = getDist(e.touches) / startDist;
              currentVal = startVal * (1 + (ratio - 1) * factor);
              setValue(currentVal);
            }
          },
          { passive: true },
        ),
        addEventListenerPipe(elem, 'touchend', () => {
          if (startDist > 0) {
            startDist = 0;
            onCommit?.(currentVal);
          }
        }),
      )
      .effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, factor, initial]);

  return value;
};
