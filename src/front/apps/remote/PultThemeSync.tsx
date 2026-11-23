import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { darkMediaQuery, indexIsDarkModeAtom } from '$index/shared/state';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';

const classList = document.querySelector('html')?.classList;
const darkMedia = window.matchMedia(darkMediaQuery);

export const PultThemeSync = () => {
  const isDarkMode = useAtomValue(indexIsDarkModeAtom);

  useEffect(() => {
    if (isDarkMode) classList?.add('dark');
    else classList?.remove('dark');
  }, [isDarkMode]);

  useEffect(
    () =>
      hookEffectPipe()
        .pipe(addEventListenerPipe(darkMedia, 'change', ({ matches }) => indexIsDarkModeAtom.set(matches)))
        .effect(),
    [],
  );

  return null;
};
