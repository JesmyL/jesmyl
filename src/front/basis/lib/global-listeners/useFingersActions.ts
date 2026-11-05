import { isLangiPickerOpenAtom } from '#basis/state/locale';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { darkMediaQuery, indexIsDarkModeAtom } from '$index/shared/state';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';

const classList = document.querySelector('html')?.classList;
const darkMedia = window.matchMedia(darkMediaQuery);

const holds = [
  { min: 3, max: 3, ms: 500, action: () => indexIsDarkModeAtom.do.toggle() },
  { min: 4, max: 4, ms: 500, action: () => window.navigator.clipboard.writeText(window.location.href) },
  { min: 10, max: Infinity, ms: 10_000, action: () => isLangiPickerOpenAtom.set(true) },
];

export const useFingersActions = () => {
  const isDarkMode = useAtomValue(indexIsDarkModeAtom);

  useEffect(() => {
    if (isDarkMode) classList?.add('dark');
    else classList?.remove('dark');
  }, [isDarkMode]);

  useEffect(() => {
    return hookEffectPipe()
      .pipe(addEventListenerPipe(darkMedia, 'change', ({ matches }) => indexIsDarkModeAtom.set(matches)))
      .effect();
  }, []);

  useEffect(() => {
    const holdTimeouts: TimeOut[] = [];
    const wholeMin = Math.min(...holds.map(it => it.min));

    const updateHolds = ({ touches }: TouchEvent) => {
      if (touches.length < wholeMin) return;

      holds.forEach(({ min, max, ms, action }, holdi) => {
        if (touches.length < min || touches.length > max) {
          clearTimeout(holdTimeouts[holdi]);
          holdTimeouts[holdi] = undefined;
          return;
        }

        holdTimeouts[holdi] ??= setTimeout(action, ms);
      });
    };

    const body = document.body;

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(body, 'touchstart', updateHolds),
        addEventListenerPipe(body, 'touchend', updateHolds),
        addEventListenerPipe(body, 'touchcancel', updateHolds),
        addEventListenerPipe(body, 'keyup', event => {
          if (!event.ctrlKey || !event.altKey || !event.shiftKey) return;

          if (event.code === 'Space') indexIsDarkModeAtom.do.toggle();
          else if (event.code === 'KeyL') isLangiPickerOpenAtom.set(true);
        }),
      )
      .effect(() => holdTimeouts.forEach(timeout => clearTimeout(timeout)));
  }, []);
};
