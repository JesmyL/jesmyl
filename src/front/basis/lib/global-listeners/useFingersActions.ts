import { translateBase } from '#basis/locale';
import { isLangiPickerOpenAtom } from '#basis/state/locale';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { makeToastKOMoodConfig, makeToastOKMoodConfig } from '#shared/ui/modal';
import { darkMediaQuery, indexIsDarkModeAtom } from '$index/shared/state';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { toast } from 'sonner';

const classList = document.querySelector('html')?.classList;
const darkMedia = window.matchMedia(darkMediaQuery);

const copyHref = () => {
  const write = window.navigator.clipboard?.writeText(window.location.href);
  if (!write) return toast(translateBase(BaseLocaleKey.CopyTextFailed), makeToastKOMoodConfig());

  write.then(
    () => toast(translateBase(BaseLocaleKey.ConfigTextCopied), makeToastOKMoodConfig()),
    () => toast(translateBase(BaseLocaleKey.CopyTextFailed), makeToastKOMoodConfig()),
  );
};

const holds = [
  { fingers: 3, ms: 500, action: () => indexIsDarkModeAtom.do.toggle() },
  { fingers: 4, ms: 500, action: copyHref },
  { fingers: 5, ms: 10000, action: () => isLangiPickerOpenAtom.set(true) },
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

    const updateHolds = ({ touches }: TouchEvent) => {
      holds.forEach(({ fingers, ms, action }, holdi) => {
        if (touches.length !== fingers) {
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
